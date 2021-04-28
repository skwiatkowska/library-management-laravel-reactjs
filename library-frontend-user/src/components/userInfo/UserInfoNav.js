import React, { Component } from "react";

class UserInfoNav extends Component {
  render() {
    return (
      <nav>
        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-personal-tab"
            data-toggle="tab"
            href="#nav-personal"
            role="tab"
            aria-controls="nav-personal"
            aria-selected="true"
          >
            Personal info
          </a>
          <a
            className="nav-item nav-link"
            id="nav-account-tab"
            data-toggle="tab"
            href="#nav-account"
            role="tab"
            aria-controls="nav-account"
            aria-selected="false"
          >
            Account settings
          </a>
        </div>
      </nav>
    );
  }
}

export default UserInfoNav;
