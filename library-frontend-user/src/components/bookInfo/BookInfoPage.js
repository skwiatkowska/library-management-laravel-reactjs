import React, { Component } from "react";

import { API_BASE_URL } from "../../config";
import BookInfoBasic from "./BookInfoBasic";
import BookInfoBookItemsTable from "./BookInfoBookItemsTable";

class BookInfoPage extends Component {
  state = {
    book: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(API_BASE_URL + "/books/" + id)
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
      <div className="container col-lg-8 my-5">
        <div className="card my-1">
          <div className="h5 card-header">
            <div className="row px-2">Book info</div>
          </div>
          <div className="card-body">
            <BookInfoBasic book={book}/>
            <BookInfoBookItemsTable book={book}/>
          </div>
        </div>
      </div>
      //   <div className="container my-5 form-card">
      //     {/* {JSON.stringify(book)} */}
      //   </div>
    );
  }
}

export default BookInfoPage;
