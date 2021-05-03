import React, { Component } from 'react';
import UserService from '../services/UserService';
import { toast } from 'react-toastify';

class ReservationsPage extends Component {
    state = {
        reservations: []
    }

    componentDidMount() {
        UserService.getReservations()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    reservations: result,
                });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const book_item_id = e.target.elements.book_item_id.value;
        const user_id = e.target.elements.user_id.value;
        const reservation_id = e.target.elements.reservation_id.value;

        UserService.borrowBook(book_item_id, user_id, reservation_id)
            .then((response) => {
                if (!response) throw new Error(response);
                else return response;
            })
            .then(() => {
                toast.success("A book has been borrowed");
                setTimeout(
                    () => {
                        window.location.reload()
                    },
                    2000
                )
            })
            .catch((error) => {
                toast.error(error);
            });
    };


    render() {
        const { reservations } = this.state;
        return (
            <div className="container">
                {/* {JSON.stringify(reservations)} */}
                <div className="row mt-3">
                    <div className="col-10 mx-auto">
                        <table id="dynatable-reserved" className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Book</th>
                                    <th>Info</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="item-table">
                                {reservations.map((r) => (
                                    <tr key={r.id}>
                                        <td>
                                            <a href={"/admin/users/" + r.user.id}
                                                className="a-link-navy">{r.user.first_name + " " + r.user.last_name}
                                            </a>

                                        </td>
                                        <td>
                                            <a href={"/admin/books/" + r.book_item.book.id}
                                                className="a-link-navy">
                                                {r.book_item.book.title}
                                            </a>
                                            book item: {r.book_item.book_item_id}
                                        </td>
                                        <td>
                                            Valid till: {new Date(r.due_date).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <button type="button" title="Borrow" className="btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#borrowBookItemModal-1">Borrow</button>

                                            <div className="modal fade" id="borrowBookItemModal-1" tabIndex={-1} role="dialog" aria-labelledby="borrowBookItemModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="borrowBookItemModalLabel">Confirm borrowing
                                                                </h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                </button>
                                                            </div>
                                                            <div className="modal-body pt-0">
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>Book:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        "{r.book_item.book.title}" ,
                                                                        <br /> book item: {r.book_item.book_item_id}
                                                                    </label>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>User:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        {r.user.first_name + " " + r.user.last_name}
                                                                        <br />
                                                                    PESEL: {r.user.pesel}
                                                                    </label>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>Borrowing:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        Borrowing date: <br />
                                                                        <p>{new Date().toLocaleDateString()}</p>
                                                                            Due date: <br />
                                                                        {(() => {
                                                                            var dueDate = new Date();
                                                                            dueDate.setDate(new Date().getDate() + 30);
                                                                            return <p>{dueDate.toLocaleDateString()}</p>
                                                                        })()}

                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer p-3">
                                                                {/* user_id - request, reservation_id - request, id - book item id - path params */}
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary return-book">Confirm</button>
                                                                <input type="hidden" name="book_item_id" defaultValue={r.book_item.id} />
                                                                <input type="hidden" name="user_id" defaultValue={r.user.id} />
                                                                <input type="hidden" name="reservation_id" defaultValue={r.id} />
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        )
    }
}

export default ReservationsPage