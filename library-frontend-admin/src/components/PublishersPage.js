import React, { Component } from 'react';
import UserService from '../services/UserService';
import { toast } from 'react-toastify';

class AuthorsPage extends Component {

    state = {
        publishers: [],
        newName: ""
    }

    componentDidMount() {
        UserService.getPublishers()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    publishers: result,
                });
            });
    }

    onChangeInput = (e) => {
        this.setState({
            newName: e.target.value,
        });
    };

    handleAdd = (e) => {
        e.preventDefault();

        UserService.addPublisher(this.state.newName)
            .then(() => {
                toast.success("A publisher has been added");
                window.location.reload();

            })
            .catch((error) => {
                toast.error(error);
            });
    };

    render() {
        const { publishers } = this.state;
        return <div className="container col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form name="newCategoryForm" onSubmit={this.handleAdd}>

                        <div className="input-group col-12 px-0">
                            <input className="form-control my-0 py-1 tableSearch" type="text"
                                value={this.state.newName}
                                onChange={this.onChangeInput}
                                placeholder="Add..." aria-label="Search" name="name" required />
                        </div>
                        <br />
                        <table className="table table-bordered table-striped text-center">
                            <thead>
                                <tr>
                                    <th>Publisher name</th>
                                    <th>Action </th>

                                </tr>
                            </thead>
                            <tbody className="item-table">
                                {publishers.map((publisher) => (
                                    <tr key={publisher.id}>
                                        <td>{publisher.name}
                                        </td>
                                        <td>Delete</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>

                </div>
            </div>
        </div>

    }
}

export default AuthorsPage