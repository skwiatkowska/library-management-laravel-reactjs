import React, { Component } from "react";

import UserService from "../../services/UserService";
import BookInfoBasic from "./BookInfoBasic";
import BookInfoBookItemsTable from "./BookInfoBookItemsTable";

class BookInfoPage extends Component {
  state = {
    book: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    UserService.getBook(id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          book: result,
        });
      });
  }

  render() {
    const { book } = this.state;
    return (
      <div className="container col-lg-10">
        <div className="card my-1">
          <div className="h5 card-header">
            <div className="row px-2">
              Book info
              <div className="ml-auto row">
                <a href={book.id + "/edit"} className="btn px-2 my-auto" title="Edit">Edit</a>
                <form action="sdfs">
                  <button type="submit" className="btn delete-book" style={{ background: 'transparent' }}>Delete</button>
                  <input type="hidden" name="id" defaultValue="fds" />
                </form>
              </div>

            </div>
          </div>
          <div className="card-body">
            <BookInfoBasic book={book} />
            <BookInfoBookItemsTable book={book} />
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfoPage;
