import React, { Component } from 'react';
import UserService from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

class BorrowingsPage extends Component {
    state = {
        borrowings: []
    }

    componentDidMount() {
        UserService.getBorrowings()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    borrowings: result,
                });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const book_item_id = e.target.elements.book_item_id.value;
   
        UserService.returnBook(book_item_id)
            .then((response) => {
                if (!response) throw new Error(response);
                else return response;
            })
            .then(() => {
                toast.success("A book has been returned");
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
        const { borrowings } = this.state;
        return (
            <div className="container">
                {/* {JSON.stringify(borrowings)} */}
                <div className="row mt-3">
                    <div className="col-10 mx-auto">
                        <table id="dynatable-borrow" className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Book</th>
                                    <th>Info</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="item-table">
                                {borrowings.map((b) => (
                                    <tr key={b.id}>
                                        <td>
                                            <a href={"/admin/users/" + b.user.id}
                                                className="a-link-navy">{b.user.first_name + " " + b.user.last_name}
                                            </a>
                                        </td>
                                        <td>
                                            <a href={"/admin/books/" + b.book_item.book.id}
                                                className="a-link-navy">
                                                {b.book_item.book.title}
                                            </a>
                                            book item: {b.book_item.book_item_id}
                                        </td>
                                        <td>
                                            Borrowed: {new Date(b.borrow_date).toLocaleDateString()}
                                            <br />
                                        Due date: {new Date(b.due_date).toLocaleDateString()}

                                        </td>
                                        <td>
                                            <button type="button" title="Return" className="btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#returnBookItemModal-1">Return</button>

                                            <div className="modal fade" id="returnBookItemModal-1" tabIndex={-1} role="dialog" aria-labelledby="returnBookItemModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="returnBookItemModalLabel">Confirm return
                                                                </h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                </button>
                                                            </div>
                                                            <div className="modal-body pt-0">
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>Book:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        "{b.book_item.book.title}" ,
                                                                        <br /> book item: {b.book_item.book_item_id}
                                                                    </label>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>User:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        {b.user.first_name + " " + b.user.last_name}
                                                                        <br />
                                                                    PESEL: {b.user.pesel}
                                                                    </label>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-md-4 col-form-label control-label text-md-right"><strong>Borrowing:</strong></label>
                                                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                                                        Borrowing date:<br /> {new Date(b.borrow_date).toLocaleDateString()}
                                                                        <br />
                                                                        Due date: <br />{new Date(b.due_date).toLocaleDateString()}
                                                                        <br />
                                                                        Charge: <br />
                                                                        {(() => {
                                                                            if (new Date(b.due_date) < new Date()) {
                                                                                return (
                                                                                    <div>
                                                                                        10
                                                                                    </div>
                                                                                );
                                                                            } else {
                                                                                return "-";
                                                                            }
                                                                        })()}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer p-3">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary return-book">Confirm</button>
                                                                <input type="hidden" name="book_item_id" defaultValue={b.book_item.id} />
                                                            </div>
                                                            <ToastContainer />

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

export default BorrowingsPage