import React, { Component } from "react";

class AccountSettingsTab extends Component {
  render() {
    return (
<div className="tab-pane fade" id="nav-account" role="tabpanel" aria-labelledby="nav-account-tab">
  <div className=" col-md-8 mx-auto">
    <table className="table">
      <tbody>
        <tr>
          <td>Password:</td>
          <td><button type="button" className="btn btn-sm btn-secondary" data-toggle="modal" data-target="#changePwdModal">Change</button></td>
        </tr>
        <tr>
          <td>Data:</td>
          <td>
            <a href="/zmien-dane" type="button" className="btn btn-sm btn-secondary">Change</a></td>
        </tr>
        <tr>
          <td>Account:</td>
          <td>
            <form>
              <input type="hidden" name="_method" defaultValue="DELETE" />
              <button type="submit" className="btn btn-sm btn-danger"> Delete </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    );
  }
}

export default AccountSettingsTab;
