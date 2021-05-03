import React, { Component } from 'react';
import UserService from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

class CategoriesPage extends Component {
    state = {
        categories: [],
        newCatName: ""
    }

    componentDidMount() {
        UserService.getCategories()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    categories: result,
                });
            });
    }

    onChangeInput = (e) => {
        this.setState({
            newCatName: e.target.value,
        });
    };

    handleAddCategory = (e) => {
        e.preventDefault();

        UserService.addCategory(this.state.newCatName)
            .then(() => {
                toast.success("A category has been added");
                window.location.reload();

            })
            .catch((error) => {
                toast.error(error);
            });
    };

    handleDelete = (e) => {
        e.preventDefault();
        var id = e.target.elements.id.value;
        UserService.deleteCategory(id)
            .then(() => {
                toast.success("A category has been deleted");
                window.location.reload();

            })
            .catch((error) => {
                toast.error(error);
            });
    };



    render() {
        const { categories } = this.state;
        return <div className="container col-lg-10 offset-lg-1">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form name="newCategoryForm" onSubmit={this.handleAddCategory}>
                        <div className="input-group col-12 px-0">

                            <input className="form-control my-0 py-1 listSearch" type="text"
                                placeholder="Add..." aria-label="Search" name="name"
                                value={this.state.newCatName}
                                onChange={this.onChangeInput}
                                required />
                            <div className="input-group-prepend">
                                <button type="submit" className="btn btn-primary btn-submit">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>


                    <br />
                    <table className="table table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th>Categories</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody className="item-table">
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}
                                    </td>
                                    <td>
                                        <form onSubmit={this.handleDelete}>
                                            <button type="submit" className="btn-primary">
                                                Delete
                                        </button>
                                            <input type="hidden" id="id" name="id" value={category.id} required />
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

export default CategoriesPage