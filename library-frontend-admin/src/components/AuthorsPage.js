import React, { Component } from 'react';
import UserService from '../services/UserService';

class PublishersPage extends Component {
    state = {
        authors: []
    }

    componentDidMount() {
        UserService.getAuthors()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    authors: result,
                });
            });
    }

    render() {
        const { authors } = this.state;
        return <div className="container col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="input-group col-12 px-0">
                        <input className="form-control my-0 py-1 tableSearch" type="text" placeholder="Search..." aria-label="Search" name="name" required />
                    </div>
                    <br />
                    <table className="table table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody className="item-table">
                            {authors.map((author) => (
                                <tr key={author.id}>
                                    <td>{author.first_names}
                                    </td>
                                    <td>{author.last_name}
                                    </td>
                                    <td>Delete
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    }
}

export default PublishersPage