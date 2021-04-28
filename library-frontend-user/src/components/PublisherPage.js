import React, { Component } from "react";
import { API_BASE_URL } from "../config";

class PublisherPage extends Component {
  state = {
    publisher: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(API_BASE_URL + "/publishers/" + id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          publisher: result,
        });
      });
  }

  render() {
    const { publisher } = this.state;

    return (
      <div className="container col-lg-8 my-5">
        <div className="card my-1">
          <div className="h5 card-header">
            <div className="row px-2">Publisher details</div>
          </div>
          <div className="card-body">
            <div className="card-text">
              <ul className="list-unstyled">
                <li>
                  <strong>Publisher name: </strong>
                  {publisher.name}
                </li>
                <li>
                  <strong>Books: </strong>
                  <ul className="list-group mt-2">
                    {publisher.books &&
                      publisher.books.map((book) => (
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

export default PublisherPage;
