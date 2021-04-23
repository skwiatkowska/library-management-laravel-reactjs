import React, { Component } from "react";

class BookSearchTableRow extends Component {
  render() {
    const { book } = this.props;

    return (
      <tr>
        {/* <li key={book.id}>{JSON.stringify(book)}</li> */}
        <td>
          <a href={"/books/" + book.id}>
            <strong className="a-link-navy">{book.title}</strong>
          </a>
        </td>
        <td>
          {(() => {
            const authors = book.authors;
            if (authors.length > 0) {
              return (
                <div>
                  {authors.map((author) => (
                    <a
                      className="a-link-navy"
                      href={"/authors/" + author.id}
                      key={author.id}
                    >
                      {author.last_name} {author.first_names}
                    </a>
                  ))}
                </div>
              );
            } else {
              return "none";
            }
          })()}
        </td>
        <td>
          {(() => {
            const publisher = book.publisher;
            if (publisher != null) {
              return (
                <a href={"/publishers/" + publisher.id} className="a-link-navy">
                  {publisher.name}
                </a>
              );
            } else {
              return "none";
            }
          })()}
        </td>
        <td>{book.isbn}</td>
        <td>
          <a
            href={"/books/" + book.id}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Choose
          </a>
        </td>
      </tr>
    );
  }
}

export default BookSearchTableRow;
