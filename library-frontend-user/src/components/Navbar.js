import React, { Component } from "react";
import AuthService from "./../services/AuthService";

class Navbar extends Component {
  logOut = () => {
    AuthService.logout();
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <a className="navbar-brand" href="/">
          Library
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainmenu"
          aria-controls="mainmenu"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainmenu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-2">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link font-weight-bold" href="/books">
                Books
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/working-hours">
                Working hours
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          {!user ? (
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item px-2">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/login">
                  Log in
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item px-2">
                <a className="nav-link" href="/my-profile">
                  My profile
               </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/my-books">
                  My books
                 </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/logout" onClick={this.logOut}>
                  Log out
                 </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
