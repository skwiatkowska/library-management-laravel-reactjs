import { API_BASE_URL } from "../config";

class AuthService {
  login(email, password) {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    return fetch(API_BASE_URL + "/login", {
      method: 'POST',
      body: data
    }).then(
      response =>
        response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        return data
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
