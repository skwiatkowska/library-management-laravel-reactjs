import React, { Component } from "react";

class BookInfoBookItemsTableRow extends Component {
  render() {
    const { item } = this.props;

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
              return <p>Reservation valid until: <br/>{date}</p>;
            } else if (item.is_blocked) {
              return "Blocked";
            }
          })()}
        </td>
        <td>
          {(() => {
            const status = item.status;
            if (status === "Available" && !item.is_blocked) {
              return (
                <button type=" button" className="btn btn-sm btn-primary">
                  Reserve
                </button>
              );
            }
          })()}
        </td>
      </tr>
    );
  }
}

export default BookInfoBookItemsTableRow;
