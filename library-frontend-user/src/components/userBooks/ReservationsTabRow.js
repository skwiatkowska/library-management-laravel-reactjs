import React, { Component } from "react";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from 'react-toastify';

class ReservationsTabRow extends Component {

    
  handleSumbit = (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value;
   
      UserService.cancelReservation(id)
        .then((response) => {
          if (!response) throw new Error(response);
          else return response;
      })
      .then(() => {
          toast.success("Reservation has been cancelled");
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
        const { reservation } = this.props;
        const { book } = reservation.bookItem;
        return (
            <tr>
                <td> <a href={"/books/" + book.id}>
                    <strong className="a-link-navy">{book.title}</strong>
                </a>
                </td>
                <td>{reservation.bookItem.book_item_id}
                </td>
                <td>
                    {(() => {
                        const authors = book.authors;
                        if (authors && authors.length > 0) {
                            return (
                                <div>
                                    {authors.map((author) => (
                                        <a
                                            className="a-link-navy"
                                            href={"/authors/" + author.id}
                                            key={author.id}
                                        >
                                            {author.last_name + " " + author.first_names + " "}
                                        </a>
                                    ))}
                                </div>
                            );
                        } else {
                            return "none";
                        }
                    })()}
                </td>
                <td>{new Date(reservation.created_at).toLocaleDateString()}
                </td>
                <td>{new Date(reservation.due_date).toLocaleDateString()}
                </td>
                <td>
                    <form onSubmit={this.handleSumbit}>
                        <button type="submit" title="Cancel reservation" className="btn btn-sm btn-secondary mb-2">Cancel
                </button>
                        <input type="hidden" name="id" value={reservation.id} />
                    </form>
                    <ToastContainer />

                </td>

            </tr>

        );
    }
}

export default ReservationsTabRow;
