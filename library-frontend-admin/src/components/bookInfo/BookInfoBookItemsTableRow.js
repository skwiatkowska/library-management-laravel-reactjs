import React from "react";

function BookInfoBookItemsTableRow(props) {
  const { item } = props;

  return (
    <tr>
      <td>
        {/* {JSON.stringify(item)} */}
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
            return isBorrowed ? <p>Borrowed</p>:<p>Available</p>;
          } else {
            return <p>{item.status}</p>;
          }
        })()}
      </td>
      <td>
        {(() => {
          const status = item.status;
          var date2 = null;
          var usr = [];
          if (status === "Borrowed") {
            item.borrowings.forEach((b) => {
              if (b.actual_return_date === undefined) {
                var d = new Date(b.due_date);
                date2 = d.toLocaleDateString();
                usr = b.user;
              }
            });
            if (date2) {
              return <p>Return date: {date2}<br />
               User: <a href={"/admin/users/" + usr.id}
                  class="a-link-navy">{usr.first_name + " " + usr.last_name}
                </a></p>;
            }
          } else if (status === "Reserved") {
            var d = new Date(item.reservations[0].due_date);
            var date = d.toLocaleDateString();
            return <p>Reservation valid until: <br />{date}<br />
            User: <a href={"/admin/users/" + item.reservations[0].user.id}
                class="a-link-navy">{item.reservations[0].user.first_name + " " + item.reservations[0].user.last_name}
              </a></p>;
          } else if (item.is_blocked) {
            return "Blocked";
          }
        })()}
      </td>
    </tr>


  );

}

export default BookInfoBookItemsTableRow;
