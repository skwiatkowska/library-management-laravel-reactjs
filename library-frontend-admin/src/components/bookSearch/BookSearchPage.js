import React, { Component } from "react";
import BookSearchTable from "./BookSearchTable";
import BookSearchForm from "./BookSearchForm";
import UserService from "../../services/UserService";

class BookSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  fetchBooks(searchIn = null, phrase = null) {
    UserService.getBooks(searchIn, phrase)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          books: result,
        });
      });

  }



  componentDidMount() {
    this.fetchBooks();
  }

  handle = (e) => {
    this.fetchBooks(e.searchIn, e.phrase);
  };

  render() {
    const { books } = this.state;

    return (
      <div className="container my-5 form-card">
        <div className="row pt-5">
          <BookSearchForm handle={this.handle} />
        </div>
        <BookSearchTable books={books} />
      </div>
    );
  }
}

export default BookSearchPage;
