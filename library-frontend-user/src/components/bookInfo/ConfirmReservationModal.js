import React, { Component } from "react";
import UserService from "../../services/UserService";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class ConfirmReservationModal extends Component {
    state = {
        book: [],
        item: []
    }

    componentDidMount() {
        const { book, item } = this.props;
        this.setState({
            book: book,
            item: item

        });
    }

    handleSubmit = (e) => {
        var itemId = this.state.item.id;
        e.preventDefault();
        UserService.createReservation(itemId)
            .then(() => {
                toast.success("The book has been reserved");                
                setTimeout(
                    () => window.location.reload(),
                    3000
                );

            })
            .catch((error) => {
                toast.error(error);
            });
    }


    render() {
        const { book, item } = this.state;
        return (
            <div className="modal fade" id="newReservationModal" tabIndex={-1} role="dialog" aria-labelledby="newReservationModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form name="newBookingConfirmForm" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="newReservationModalLabel">Confirm reservation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body pt-0">
                                <div className="form-group row">
                                    <label className="col-md-6 col-form-label control-label text-md-right"><strong>Title:</strong>
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                        "<i>{book.title}</i> "
                                </label>
                                    <label className="col-md-6 col-form-label control-label text-md-right"><strong>Authors:</strong>
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                        {(() => {
                                            const authors = book.authors;
                                            if (authors && authors.length > 0) {
                                                return (
                                                    <div>
                                                        {authors.map((author) => (
                                                            <p key={author.id}>
                                                                {author.last_name + " " + author.first_names + " "}
                                                            </p>
                                                        ))}
                                                    </div>
                                                );
                                            } else {
                                                return "none";
                                            }
                                        })()}
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-right"><strong>Book item:</strong>
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                        {item.book_item_id}
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-right"><strong>Reservation valid till:</strong>
                                    </label>
                                    <label className="col-md-6 col-form-label control-label text-md-left">
                                        {(() => {
                                            var dueDate = new Date();
                                            dueDate.setDate(new Date().getDate() + 3);
                                            return <p>{dueDate.toLocaleDateString()}</p>
                                        })()}
                                    </label>
                                </div>
                            </div>
                            <input type="hidden" name="bookItemId" defaultValue={item.id} />
                            <div className="modal-footer p-3">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" id="confirm-booking-btn-submit" className="btn btn-primary">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />

            </div>
        );
    }
}

export default withRouter(ConfirmReservationModal);
