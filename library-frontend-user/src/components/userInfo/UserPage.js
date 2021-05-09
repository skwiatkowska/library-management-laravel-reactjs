import React, { Component } from "react";
import UserService from "../../services/UserService";
import PersonalInfoTab from "./PersonalInfoTab";
import AccountSettingsTab from "./AccountSettingsTab";

import UserInfoNav from "./UserInfoNav";

class UserPage extends Component {
  state = {
    user: [],
  };


  componentDidMount() {
    UserService.getUserProfile().then(
      (response) => {
        response.json().then((data) =>
          this.setState({
            user: data.user,
          })
        );
      },
      (error) => {
        this.setState({
          user:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card my-3 form-card">
              <div className="card-header">Dane o koncie</div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <UserInfoNav />
                      <div className="tab-content" id="nav-tabContent">
                        <PersonalInfoTab user={user} />
                        <AccountSettingsTab />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
