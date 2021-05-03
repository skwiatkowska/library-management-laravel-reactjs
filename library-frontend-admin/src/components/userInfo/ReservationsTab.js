import React from "react";
import ReservationsTabRow from "./ReservationsTabRow";

function ReservationsTab(props) {

  const { books } = props;

  return (
    (books && books.length > 0) ? (
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
    ));

}

export default ReservationsTab;
