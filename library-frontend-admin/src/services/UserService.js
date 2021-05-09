import { API_BASE_URL } from '../config';
import AuthParams from './AuthParams';


class UserService {

  getUsers(searchIn, phrase) {
    if (searchIn && phrase)
      return fetch(API_BASE_URL + '/users?' + searchIn + '=' + phrase + '&' + AuthParams());
    else
      return fetch(API_BASE_URL + '/users?' + AuthParams());
  }

  getUser(id) {
    return fetch(API_BASE_URL + '/users/' + id + '?' + AuthParams());
  }

  getAuthors() {
    return fetch(API_BASE_URL + '/authors?' + AuthParams());
  }

  getPublishers() {
    return fetch(API_BASE_URL + '/publishers?' + AuthParams());
  }

  getCategories() {
    return fetch(API_BASE_URL + '/categories?' + AuthParams());
  }

  getReservations() {
    return fetch(API_BASE_URL + '/reservations?' + AuthParams());
  }

  getBorrowings() {
    return fetch(API_BASE_URL + '/borrowings?' + AuthParams());
  }

  getBooks(searchIn, phrase) {
    if (searchIn && phrase)
      return fetch(API_BASE_URL + '/books?' + searchIn + '=' + phrase + '&' + AuthParams());
    else
      return fetch(API_BASE_URL + '/books?' + AuthParams());
  }

  getBook(id) {
    return fetch(API_BASE_URL + '/books/' + id + '?' + AuthParams());
  }

  addCategory(name) {
    let data = new FormData();
    data.append('name', name);
    const options = {
      method: 'POST',

      body: data
    }
    return fetch(API_BASE_URL + '/categories?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        // console.log('data: ' + JSON.stringify(data))
        return data
      });
  }

  deleteCategory(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/categories/ ' + id + '?' + AuthParams(), options);
  }


  addPublisher(name) {
    let data = new FormData();
    data.append('name', name);
    const options = {
      method: 'POST',

      body: data
    }
    return fetch(API_BASE_URL + '/publishers?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        // console.log('data: ' + JSON.stringify(data))
        return data
      });
  }


  deletePublisher(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/publishers/ ' + id + '?' + AuthParams(), options);
  }


  addAuthor(first_names, last_name) {
    let data = new FormData();
    data.append('first_names', first_names);
    data.append('last_name', last_name);

    const options = {
      method: 'POST',

      body: data
    }
    return fetch(API_BASE_URL + '/authors?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        console.log('data: ' + JSON.stringify(data))
        return data
      });
  }


  deleteAuthor(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/authors/ ' + id + '?' + AuthParams(), options);
  }



  addBook(title, isbn, authors, publisher, year, numberOfItems, category) {
    let data = new FormData();
    data.append('title', title);
    data.append('isbn', isbn);
    data.append('authors', [authors]);
    data.append('publisher', publisher);
    data.append('publication_year', year);
    data.append('number_of_items', numberOfItems);
    data.append('categories', [category]);

    const options = {
      method: 'POST',
      body: data
    }
    return fetch(API_BASE_URL + '/books?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        // console.log('data: ' + JSON.stringify(data))
        return data
      });
  }

  updateBook(id, title, isbn, authors, publisher, year, numberOfItems, category) {
    let data = new FormData();
    data.append('title', title);
    data.append('isbn', isbn);
    data.append('authors', [authors]);
    data.append('publisher', publisher);
    data.append('publication_year', year);
    data.append('number_of_items', numberOfItems);
    data.append('categories', [category]);

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }
    return fetch(API_BASE_URL + '/books/ ' + id + '?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        // console.log('data: ' + JSON.stringify(data))
        return data
      });
  }

  updateUserProfile(id, first_name, last_name, pesel, email) {
    let data = new FormData();
    data.append('email', email);
    data.append('first_name', first_name);
    data.append('pesel', pesel);
    data.append('last_name', last_name);

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }
    return fetch(API_BASE_URL + '/users/' + id + '?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        console.log("data: " + JSON.stringify(data))
        return data
      });
  }


  deleteUserProfile(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/users/ ' + id + '?' + AuthParams(), options);
  }


  borrowBook(book_item_id, user_id, reservation_id) {
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('reservation_id', reservation_id);

    const options = {
      method: 'POST',
      body: data
    }
    return fetch(API_BASE_URL + '/book-items/' + book_item_id + '/borrow?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        console.log('data: ' + JSON.stringify(data))
        return data
      });
  }

  returnBook(book_item_id) {
    return fetch(API_BASE_URL + '/book-items/' + book_item_id + '/return?' + AuthParams(), {
      method: 'POST',
    }).then(
      response =>
        response.json())
      .then(data => {
        // console.log('data: ' + JSON.stringify(data))
        return data
      });
  }
}

export default new UserService();