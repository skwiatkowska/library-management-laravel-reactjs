import React from "react";
import BookInfoBookItemsTableRow from "./BookInfoBookItemsTableRow";

function BookInfoBookItemsTable(props) {
  const { book } = props;
  
  return (book.book_items && book.book_items.length > 0) ? (
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
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {book.book_items &&
            book.book_items.map((item) => (
              <BookInfoBookItemsTableRow item={item} book={book} key={item.id} />
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No book items</p>
  );
}
  


export default BookInfoBookItemsTable;
