import React, { Component } from "react";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(this.state.email, this.state.password)
      .then((response) => {
        if (!response.user) throw new Error(response);
        else return response;
      })
      .then(() => {
        toast.success("Correct data");
        setTimeout(
          () => {
            this.props.history.push("/my-profile");
            window.location.reload()
          },
          2000
        );

      })
      .catch((error) => {
        toast.error(error);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center my-4">
          <div className="col-md-6">
            <div className="card my-3 form-card">
              <div className="card-header">Sign in</div>
              <div className="card-body">
                <form onSubmit={this.handleLogin}>
                  <div className="form-group row required">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label control-label text-md-right"
                    >
                      Email
                    </label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label control-label text-md-right"
                    >
                      Password
                    </label>
                    <div className="col-md-6">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="remember"
                      className="col-form-label control-label mx-auto"
                    >
                      <input type="checkbox" id="remember" className="mr-2" />
                      <strong>Remember me</strong>
                    </label>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Sign in!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
