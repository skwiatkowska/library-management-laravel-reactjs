import { API_BASE_URL } from "../config";

class AuthService {
  login(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    //     body: JSON.stringify({ username, password })
    // };

    let data = new FormData();
data.append('email','qrice@example.com');
data.append('password','password');

    return fetch(API_BASE_URL + "/login", {method: 'POST',
    body: data
    }).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(resp => {
      if (resp.data.access_token) {
            localStorage.setItem("user", JSON.stringify(resp.data));
          }
          console.log(resp.data);
          return resp.data;
    }));
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    };

    fetch(API_BASE_URL + "/register", requestOptions);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
