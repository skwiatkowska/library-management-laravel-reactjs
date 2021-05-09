import { API_BASE_URL } from "../config";
import AuthParams from './AuthParams';


class UserService {

  getUserProfile() {
    return fetch(API_BASE_URL + '/my-account?' + AuthParams());
  }

  updateUserProfile(first_name, last_name, pesel, email) {

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
    return fetch(API_BASE_URL + '/my-account?' + AuthParams(), options).then(
      response =>
        response.json())
      .then(data => {
        console.log("data: " + JSON.stringify(data))
        return data
      });
  }

  deleteUserProfile() {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/my-account?' + AuthParams(), options);
  }


  getUserReservations() {
    return fetch(API_BASE_URL + '/my-reservations?' + AuthParams());
  }

  createReservation(id) {
    console.log(id);
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(API_BASE_URL + '/book-items/' + id + '/reserve?' + AuthParams(), options);
  }


  cancelReservation(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    return fetch(API_BASE_URL + '/my-reservations/' + id + '?' + AuthParams(), options);
  }

  getUserBorrowings() {
    return fetch(API_BASE_URL + '/my-books?' + AuthParams());
  }

  getUserHistory() {
    return fetch(API_BASE_URL + '/my-history?' + AuthParams());
  }




}

export default new UserService();