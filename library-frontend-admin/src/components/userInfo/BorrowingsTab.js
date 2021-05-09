import React from "react";
import BorrowingsTabRow from "./BorrowingsTabRow";

function BorrowingsTab(props) {
  const { books } = props;


  return (books && books.length > 0) ? (
    <div className="tab-pane fade" id="nav-borrowing" role="tabpanel" aria-labelledby="nav-borrowing-tab">
      <div className="table-responsive mt-5">
        <table className="table table-striped table-bordered">
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


  ) : (
    <div className="tab-pane fade" id="nav-borrowing" role="tabpanel" aria-labelledby="nav-borrowing-tab">
      <p className="mt-5 text-center">No books to show</p>
    </div>
  );
}


export default BorrowingsTab;
