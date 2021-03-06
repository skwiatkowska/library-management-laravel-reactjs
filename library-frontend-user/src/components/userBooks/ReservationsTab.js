import React, { Component } from "react";
import UserService from "../../services/UserService";
import ReservationsTabRow from "./ReservationsTabRow";

class ReservationsTab extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    UserService.getUserReservations().then(
      (response) => {
        response.json().then((data) =>
          this.setState({
            books: data,
          })
        );
      },
      (error) => {
        this.setState({
          books:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { books } = this.state;
    return (books.length > 0) ? (
      <div className="tab-pane fade show active" id="nav-reservation" role="tabpanel" aria-labelledby="nav-reservation-tab">
        <div className="table-responsive mt-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Book title</th>
                <th>Book item</th>
                <th>Authors</th>
                <th>Reservation date</th>
                <th>Due date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="item-table">
              {books &&
                books.map((book) => (
                  <ReservationsTabRow reservation={book} key={book.id} />
                ))}

            </tbody>
          </table>
        </div>
      </div>


    ) : (
      <div className="tab-pane fade show active" id="nav-reservation" role="tabpanel" aria-labelledby="nav-reservation-tab">
        <p className="mt-5 text-center">No books to show</p>
      </div>
    );
  }
}

export default ReservationsTab;
