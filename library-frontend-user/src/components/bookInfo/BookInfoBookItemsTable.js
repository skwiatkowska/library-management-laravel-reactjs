import React, { Component } from "react";
import BookInfoBookItemsTableRow from "./BookInfoBookItemsTableRow";

class BookInfoBookItemsTable extends Component {
  render() {
    const book = this.props.book;
    if (book.book_items && book.book_items.length > 0) {
      return (
        <div className="card-text">
          <strong>Book items:</strong>
          <table
            className="table table-bordered text-center"
            id="bookItemsTable"
          >
            <thead>
              <tr>
                <th>Book item ID</th>
                <th>Status</th>
                <th>Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {book.book_items &&
                book.book_items.map((item) => (
                  <BookInfoBookItemsTableRow item={item} key={item.id} />
                ))}
            </tbody>
          </table>
        </div>
      );
    }
    else{
      return(
        <p>No book items</p>
      );
    }
  }
}

export default BookInfoBookItemsTable;
