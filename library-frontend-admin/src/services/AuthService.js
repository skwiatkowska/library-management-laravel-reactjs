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

  // register(first_name, last_name, pesel, email, password) {
  //   let data = new FormData();
  //   data.append('email', email);
  //   data.append('password', password);
  //   data.append('first_name', first_name);
  //   data.append('pesel', pesel);
  //   data.append('last_name', last_name);

  //   return fetch(API_BASE_URL + "/register", {
  //     method: 'POST',
  //     body: data
  //   })
  //     .then(
  //       response =>
  //         response.json())
  //     .then(data => {
  //       console.log("data: " + JSON.stringify(data))
  //       return data
  //     });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
