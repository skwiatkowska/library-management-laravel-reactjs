import { API_BASE_URL } from "../config";
import AuthParams from './AuthParams';


class UserService {

  getUserProfile() {
    return fetch(API_BASE_URL + '/my-account?' + AuthParams());
  }

  getUserReservations() {
    return fetch(API_BASE_URL + '/my-reservations?' + AuthParams());
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