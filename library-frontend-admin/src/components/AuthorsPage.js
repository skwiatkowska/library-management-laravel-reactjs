import React, { Component } from 'react';
import UserService from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

class PublishersPage extends Component {
    state = {
        authors: [],
        newAuthor : ""
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

    onChangeInput = (e) => {
        this.setState({
            newAuthor: e.target.value,
        });
    };


    handleAdd = (e) => {
        e.preventDefault();
        var newAuthorList = this.state.newAuthor.split(" ");

        UserService.addAuthor(newAuthorList[0], newAuthorList[1])
            .then(() => {
                toast.success("An author has been added");
                window.location.reload();

            })
            .catch((error) => {
                toast.error(error);
            });
    };

    handleDelete = (e) => {
        e.preventDefault();
        var id = e.target.elements.id.value;
        UserService.deleteAuthor(id)
            .then(() => {
                toast.success("An author has been deleted");
                window.location.reload();

            })
            .catch((error) => {
                toast.error(error);
            });
    };

    render() {
        const { authors } = this.state;
        return <div className="container col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={this.handleAdd}>
                        <div className="input-group col-12 px-0">
                            <input className="form-control my-0 py-1 tableSearch" type="text"
                                value={this.state.newAuthor}
                                onChange={this.onChangeInput}
                                placeholder="Add..." name="name" required />
                        </div>
                    </form>
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
                                    <td>
                                    <form onSubmit={this.handleDelete}>
                                            <button type="submit" className="btn-primary">
                                                Delete
                                        </button>
                                            <input type="hidden" id="id" name="id" value={author.id} required />
                                        </form>
                                        <ToastContainer />

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