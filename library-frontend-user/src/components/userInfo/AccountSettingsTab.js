import React, { Component } from "react";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class AccountSettingsTab extends Component {


  handleSubmitDelete = (e) => {
    e.preventDefault();
    UserService.deleteUserProfile().then(
      () => {
        AuthService.logout();
        toast.success("Your account has been deleted");
        setTimeout(
          () => {
            this.props.history.push("/");
            window.location.reload();
          },
          2000
        )


      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
        });
      }
    );
  };


  render() {
    return (
      <div className="tab-pane fade" id="nav-account" role="tabpanel" aria-labelledby="nav-account-tab">
        <div className=" col-md-8 mx-auto">
          <table className="table">
            <tbody>
              <tr>
                <td>Password:</td>
                <td><button type="button" className="btn btn-sm btn-secondary" data-toggle="modal" data-target="#changePwdModal">Change
                </button>
                </td>
              </tr>
              <tr>
                <td>Data:</td>
                <td>
                  <a href="/my-profile/edit" type="button" className="btn btn-sm btn-secondary">Change</a>
                  </td>
              </tr>
              <tr>
                <td>Account:</td>
                <td>
                  <form onSubmit={this.handleSubmitDelete}>
                    <button type="submit" className="btn btn-sm btn-danger"> Delete </button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ToastContainer />
        
      </div>

    );
  }
}

export default withRouter(AccountSettingsTab);
