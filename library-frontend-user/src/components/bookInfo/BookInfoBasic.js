import React, { Component } from "react";

class BookInfoBasic extends Component {
  render() {
    const { book } = this.props;

    return (
      <div className="card-text">
          {/* {JSON.stringify(book.book_items)} */}
        <ul className="list-unstyled">
          <li>
            <strong>Title: </strong>"{book.title}"
          </li>
          <li>
            <strong>ISBN: </strong>
            {book.isbn}
          </li>
          <li>
            <strong>Authors: </strong>
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
          </li>
          <li>
            <strong>Publisher: </strong>
            {(() => {
              const publisher = book.publisher;
              if (publisher != null) {
                return (
                  <a
                    href={"/publishers/" + publisher.id}
                    className="a-link-navy"
                  >
                    {publisher.name}
                  </a>
                );
              } else {
                return "none";
              }
            })()}
          </li>
          <li>
            <strong>Publication year: </strong>
            {book.publication_year}
          </li>
          <li>
            <strong>Categories: </strong>
            {(() => {
              const categories = book.categories;
              if (categories && categories.length > 0) {
                return (
                  <div>
                    {categories.map((category) => (
                      <a
                        className="a-link-navy"
                        href={"/categories/" + category.id}
                        key={category.id}
                      >
                        {category.name + " "}
                      </a>
                    ))}
                  </div>
                );
              } else {
                return "none";
              }
            })()}
          </li>
        </ul>
      </div>
    );
  }
}

export default BookInfoBasic;
