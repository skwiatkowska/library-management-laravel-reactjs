import React from "react";

function PersonalInfoTab(props) {

  const { user } = props;

  return (
    <div className="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
      <div className=" col-md-8 mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <td>First name:</td>
              <td>{user.first_name}</td>
            </tr>
            <tr>
              <td>Last name:</td>
              <td>{user.last_name}</td>
            </tr>
            <tr>
              <td>PESEL:</td>
              <td>{user.pesel}</td>
            </tr>
            {/* <tr>
                <td>Phone:</td>
                <td>{user.phone}</td>
              </tr> */}
            <tr>
              <td>E-mail:</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  );

}

export default PersonalInfoTab;
