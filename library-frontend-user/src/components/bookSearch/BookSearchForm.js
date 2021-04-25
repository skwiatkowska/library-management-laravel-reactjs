import React, { Component } from "react";

class BookSearchForm extends Component {
  state = {
    searchIn: null,
    phrase: null,
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      searchIn: e.target.searchin.value,
      phrase: e.target.phrase.value,
    });
    this.props.handle(this.state);
  };

  render() {
    return (
      <form
        className="form-inline col-12 justify-content-center"
        onSubmit={this.handleSubmit}
      >
        <div className="input-group mb-2 col-sm-12 col-lg-4 px-1">
          <div className="input-group-prepend">
            <div className="input-group-text">Search in: </div>
          </div>
          <select className="form-control search-in-select" name="searchin">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
            <option value="publisher">Publisher</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="input-group mb-2 col-sm-12 col-lg-6 px-1">
          <div className="input-group-prepend">
            <div className="input-group-text">Search phrase:</div>
          </div>
          <input
            type="text"
            className="form-control search-phrase"
            name="phrase"
            id="search-phrase-input"
          />
          <button
            type="submit"
            id="find-book-submit-btn"
            className="btn btn-primary ml-4 px-lg-4"
          >
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default BookSearchForm;
