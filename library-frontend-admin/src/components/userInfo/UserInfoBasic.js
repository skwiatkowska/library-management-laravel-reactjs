import React from "react";

function UserInfoBasic(props) {
    const { user } = props;

    return (
        <div className="card-body">
            <ul className="list-unstyled row">
                <li className="list-item col-12 py-2"><strong>First name: </strong>{user.first_name}</li>
                <li className="list-item col-12 py-2"><strong>Last name: </strong>{user.last_name}</li>
                <li className="list-item col-12 border-top py-2"><strong>PESEL: </strong>{user.pesel}</li>
                <li className="list-item col-12 border-top py-2"><strong>E-mail: </strong>{user.email}</li>
            </ul>
        </div>

    );
}


export default UserInfoBasic;
