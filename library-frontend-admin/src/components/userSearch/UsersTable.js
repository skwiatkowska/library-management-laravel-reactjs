import UsersTableRow from "./UsersTableRow";

function UsersTable(props) {
    const { users } = props;

    return (
        <div className="row justify-content-center mt-5">
            <div className="table-responsive col-10">
                <table className="table table-striped table-bordered mt-1">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>PESEL</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <UsersTableRow user={user} key={user.id} />
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default UsersTable