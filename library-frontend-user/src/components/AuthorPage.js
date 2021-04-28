import React, { Component } from "react";
import { API_BASE_URL } from "../config";

class AuthorPage extends Component {
  state = {
    author: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(API_BASE_URL + "/authors/" + id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          author: result,
        });
      });
  }

  render() {
    const { author } = this.state;

    return (
      <div className="container col-lg-8 my-5">
        <div className="card my-1">
          <div className="h5 card-header">
            <div className="row px-2">Author details</div>
          </div>
          <div className="card-body">
            <div className="card-text">
              <ul className="list-unstyled">
                <li>
                  <strong>Surname: </strong>
                  {author.last_name}
                </li>
                <li>
                  <strong>First name: </strong>
                  {author.first_names}
                </li>
                <li>
                  <strong>Books: </strong>
                  <ul className="list-group mt-2">
                    {author.books &&
                      author.books.map((book) => (
                        <li className="list-group-item" key={book.id}>
                          <a href={"/books/" + book.id} className="a-link-navy">
                            {book.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorPage;
