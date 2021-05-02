import React from "react";

function HistoryTabRow(props) {
    const { borrowing } = props;
    const { book } = borrowing.bookItem;
    return (
        <tr>
            <td> <a href={"/books/" + book.id}>
                <strong className="a-link-navy">{book.title}</strong>
            </a>
            </td>
            <td>{borrowing.bookItem.book_item_id}
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
                })()}</td>
            <td>
                {new Date(borrowing.borrow_date).toLocaleDateString()}

            </td>
            <td>
                {new Date(borrowing.actual_return_date).toLocaleDateString()}

            </td>
            <td>
                {(() => {
                    if (borrowing.overdue_fee !== undefined) {
                        return (
                            borrowing.overdue_fee
                        );
                    }
                    else {
                        return "-";
                    }
                })()}
            </td>
        </tr>
    );

}

export default HistoryTabRow;
