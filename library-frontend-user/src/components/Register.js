import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../services/AuthService";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    pesel: "",
    email: "",
    password: ""
  };


  onChangeFirstName = (e) => {
    this.setState({
      first_name: e.target.value,
    });
  };

  onChangeLastName = (e) => {
    this.setState({
      last_name: e.target.value,
    });
  };

  onChangePesel = (e) => {
    this.setState({
      pesel: e.target.value,
    });
  };

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


  handleRegister = (e) => {
    e.preventDefault();

    AuthService.register(
      this.state.first_name,
      this.state.last_name,
      this.state.pesel,
      this.state.email,
      this.state.password
    )
      .then((response) => {
        if (!response.user) throw new Error(response);
        else return response;
      })
      .then(() => {
        toast.success("Succesfully registered");
        AuthService.login(this.state.email, this.state.password)
      })
      .then(
        setTimeout(
          () => {
            this.props.history.push("/my-profile");
            window.location.reload()
          },
          3000
        )

      )

      .catch((error) => {
        toast.error(error);
      });
  };

  render() {
    return <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card my-3 form-card">
            <div className="card-header">Register your account</div>
            <div className="card-body">
              <form name="newUserForm" onSubmit={this.handleRegister}>
                <div className="form-group row required">
                  <label htmlFor="fname" className="col-md-4 col-form-label control-label text-md-right">First name</label>
                  <div className="col-md-6">
                    <input type="text" id="fname" className="form-control" name="fname"
                      onChange={this.onChangeFirstName}
                      required />
                  </div>
                </div>
                <div className="form-group row required">
                  <label htmlFor="lname" className="col-md-4 col-form-label control-label text-md-right">Last name</label>
                  <div className="col-md-6">
                    <input type="text" id="lname" className="form-control" name="lname"
                      onChange={this.onChangeLastName}
                      required />
                  </div>
                </div>
                <div className="form-group row required">
                  <label htmlFor="pesel" className="col-md-4 col-form-label control-label text-md-right">PESEL</label>
                  <div className="col-md-6">
                    <input type="text" id="pesel" className="form-control" name="pesel"
                      onChange={this.onChangePesel}

                      required />
                  </div>
                </div>
                {/* <div className="form-group row required">
                    <label htmlFor="phone" className="col-md-4 col-form-label control-label text-md-right">Phone</label>
                    <div className="col-md-6">
                      <input type="text" id="phone" className="form-control" name="phone" required />
                    </div>
                  </div> */}
                <div className="form-group row required">
                  <label htmlFor="email" className="col-md-4 col-form-label control-label text-md-right">Email</label>
                  <div className="col-md-6">
                    <input type="text" id="email" className="form-control" name="email"
                      onChange={this.onChangeEmail}
                      required />
                  </div>
                </div>
                <div className="form-group row required">
                  <label htmlFor="password" className="col-md-4 col-form-label control-label text-md-right">Password</label>
                  <div className="col-md-6">
                    <input type="password" id="password" className="form-control" name="password"
                      onChange={this.onChangePassword}
                      required />
                  </div>
                </div>
                <div className="form-group row required">
                  <label htmlFor="password2" className="col-md-4 col-form-label control-label text-md-right">Confirm password</label>
                  <div className="col-md-6">
                    <input type="password" id="password2" className="form-control" name="password2" required />
                  </div>
                </div>
                <input type="hidden" name="isModal" defaultValue="false" />
                <div className="row d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Register now
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

    </div>

  }
}

export default Register