import React, { Component } from "react";
import BookSearchTableRow from "./BookSearchTableRow";

class BookSearchTable extends Component {
  render() {
    const { books } = this.props;

    return (
      <div className="row justify-content-center">
    <div className="table-responsive col-10">
      <table className="table table-striped table-bordered mt-1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookSearchTableRow book={book} key={book.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BookSearchTable;
