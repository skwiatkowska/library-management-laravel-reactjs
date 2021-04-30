import React, { Component } from "react";
import UserService from "../../services/UserService";
import BorrowingsTabRow from "./BorrowingsTabRow";

class BorrowingsTab extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    UserService.getUserBorrowings().then(
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
    const {books} = this.state;
    return (
      <div className="tab-pane fade" id="nav-borrowing" role="tabpanel" aria-labelledby="nav-borrowing-tab">
        <div className=" col-md-12 mx-auto mt-5">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Book title</th>
                <th>Book item</th>
                <th>Authors</th>
                <th>Borrowing date</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody className="item-table">
            {books &&
                books.map((book) => (
                  <BorrowingsTabRow borrowing={book} key={book.id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>


    );
  }
}

export default BorrowingsTab;
