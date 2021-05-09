import React from "react";

function UserBooksNav() {
  return (
    <nav>
      <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" id="nav-reservation-tab" data-toggle="tab" href="#nav-reservation" role="tab" aria-controls="nav-reservation" aria-selected="true">Reservations</a>
        <a className="nav-item nav-link" id="nav-borrowing-tab" data-toggle="tab" href="#nav-borrowing" role="tab" aria-controls="nav-borrowing" aria-selected="false">Borrowings</a>
        <a className="nav-item nav-link" id="nav-history-tab" data-toggle="tab" href="#nav-history" role="tab" aria-controls="nav-history" aria-selected="false">History</a>
      </div>
    </nav>

  );

}

export default UserBooksNav;
