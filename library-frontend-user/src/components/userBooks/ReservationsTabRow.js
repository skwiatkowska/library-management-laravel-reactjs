import React, { Component } from "react";
import UserService from "../../services/UserService";

class ReservationsTabRow extends Component {

    
  handleSumbit = (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value;
   

      UserService.cancelReservation(id).then(
        () => {
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
          });
        }
      );

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
                </td>
            </tr>

        );
    }
}

export default ReservationsTabRow;
