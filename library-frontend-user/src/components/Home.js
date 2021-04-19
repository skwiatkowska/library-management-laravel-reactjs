import React, { Component } from 'react';
import { API_BASE_URL } from './../config'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          books: []
        };
      }
    
      componentDidMount() {
        fetch(API_BASE_URL + '/books')
          .then(res => res.json())
          .then(result => {
            this.setState({
              books: result
            });
          });
      }
    
      render() {
        const { books } = this.state;
    
          return (
            <ul>
              {books.map(book => (
                <li key={book.id}>
                  {JSON.stringify(book)}
                </li>
              ))}
            </ul>
          );
        
      }
}

export default Home