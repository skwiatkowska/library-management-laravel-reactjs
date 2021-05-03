import React from "react";

function ReservationsTabRow(props) {

    const { reservation } = props;
    const { book } = reservation.book_item;
    
    return (
        <tr>
            <td> <a href={"/books/" + book.id}>
                <strong className="a-link-navy">{book.title}</strong>
            </a>
            </td>
            <td>{reservation.book_item.book_item_id}
            </td>
            <td>
                {(() => {
                    const authors = book.authors;
                    if (authors && authors.length > 0) {
                        return (
                            <div>
                                {authors.map((author) => (
                                    <a
                                        className="a-link-navy"
                                        href={"/authors/" + author.id}
                                        key={author.id}
                                    >
                                        {author.last_name + " " + author.first_names + " "}
                                    </a>
                                ))}
                            </div>
                        );
                    } else {
                        return "none";
                    }
                })()}
            </td>
            <td>{new Date(reservation.created_at).toLocaleDateString()}
            </td>
            <td>{new Date(reservation.due_date).toLocaleDateString()}
            </td>
        </tr>
    );
}

export default ReservationsTabRow;
