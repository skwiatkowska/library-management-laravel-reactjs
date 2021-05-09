import React, { useState, useEffect } from "react";
import ConfirmReservationModal from "./ConfirmReservationModal";
import LoginModal from "./LoginModal";
import AuthService from "./../../services/AuthService";

function BookInfoBookItemsTableRow(props) {
  const { item, book } = props;
  const [user, setUser] = useState([]);


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setUser(user);
  }, []);


  return (
    <tr>
      <td>
        <strong>{item.book_item_id}</strong>
      </td>
      <td>
        {(() => {
          const status = item.status;
          var isBorrowed = false;
          if (status === "Borrowed") {
            item.borrowings.forEach((b) => {
              if (b.actual_return_date === undefined) {
                isBorrowed = true;
              }
            });
            return isBorrowed ? "Borrowed" : "Available";
          } else {
            return <p>{item.status}</p>;
          }
        })()}
      </td>
      <td>
        {(() => {
          const status = item.status;
          var date2 = null;
          if (status === "Borrowed") {
            item.borrowings.forEach((b) => {
              if (b.actual_return_date === undefined) {
                var d = new Date(b.due_date);
                date2 = d.toLocaleDateString();
              }
            });
            if (date2) {
              return <p>Return date: {date2}</p>;
            }
          } else if (status === "Reserved") {
            var d = new Date(item.reservations[0].due_date);
            var date = d.toLocaleDateString();
            return <p>Reservation valid until: <br />{date}</p>;
          } else if (item.is_blocked) {
            return "Blocked";
          }
        })()}
      </td>
      <td>
        {(() => {
          const status = item.status;
          if (status === "Available" && !item.is_blocked) {
            if (user) {
              return (
                <div>
                  <button type=" button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#newReservationModal">Reserve
                </button>
                  <ConfirmReservationModal book={book} item={item} />
                </div>
              );
            }
            else {
              return (
                <div><button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#loginModal">Reserve
                  </button>
                  <LoginModal />
                </div>
              );
            }
          }
        })()}

      </td></tr>


  );

}

export default BookInfoBookItemsTableRow;
