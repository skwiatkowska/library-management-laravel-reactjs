import { API_BASE_URL } from "../config";
import AuthParams from './AuthParams';


class UserService {

  getUserProfile() {
    return fetch(API_BASE_URL + '/my-account?' + AuthParams());
  }

  
}

export default new UserService();