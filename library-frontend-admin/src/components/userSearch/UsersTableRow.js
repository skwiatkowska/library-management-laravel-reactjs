import React from 'react';

function UsersTableRow(props) {
    const { user } = props;
    return (
        <tr>
            <td>{user.first_name}
            </td>
            <td>{user.last_name}
            </td>
            <td>{user.pesel}
            </td>
            <td>{user.email}
            </td>
            <td>
                <a href={"/admin/users/" + user.id} type="button" className="btn btn-primary btn-sm btn-rounded">
                    Profile
                </a>
            </td>
        </tr>
    )

}

export default UsersTableRow