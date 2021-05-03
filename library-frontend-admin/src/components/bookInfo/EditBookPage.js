import React, { Component } from "react";

import UserService from "../../services/UserService";
class EditBookPage extends Component {
    state = {
        book: [],
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        UserService.getBook(id)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    book: result,
                });
            });
    }

    render() {
        const { book } = this.state;
        return (
            <div className="cotainer">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card mt-0">
                            <div className="card-header">Edit this book</div>
                            <div className="card-body">
                                <form name="editBookForm">
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">Tytuł</label>
                                        <div className="col-md-6">
                                            <input type="text" id="title" className="form-control" name="title" defaultValue={book.title} required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">ISBN</label>
                                        <div className="col-md-6">
                                            <input type="text" id="isbn" className="form-control" name="isbn" defaultValue={book.isbn} required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="author" className="col-md-4 col-form-label control-label text-md-right">Autor</label>
                                        <div className="col-md-6">
                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3 field_wrapper">
                                                    <select data-live-search="true" id="authors" name="authors[]" className="form-control select-author">
                                                        <option value selected disabled>Choose</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <fieldset className="pb-0 mb-0 mt-2">
                                                <div className="input-group col-xs-3">
                                                    <button type="button" className="btn add-one btn-sm btn-danger add_button mb-2 ">
                                                        add another author
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="publisher" className="col-md-4 col-form-label control-label text-md-right">Publisher</label>
                                        <div className="col-md-6">
                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3">
                                                    <select data-live-search="true" id="publisher" name="publisher" className="form-control">
                                                        <option value selected disabled>Choose</option>
                                                            dd
                                                            <option value="dsdfsf">dasd</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row required mt-2 mb-0">
                                        <label htmlFor="year" className="col-md-4 col-form-label control-label text-md-right">Publication year
                                     </label>
                                        <div className="col-md-6">
                                            <input id="year" name="year" defaultValue="dsd" className="form-control py-1 required" />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="publisher" className="col-md-4 col-form-label control-label text-md-right">Category</label>
                                        <div className="col-md-6">
                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3">
                                                    <select data-live-search="true" id="categories[]" name="categories[]" className="form-control">
                                                        <option value selected disabled>Choose</option>
                                                        <option value="sd">sad</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mt-3">
                                        <button type="submit" className="btn btn-primary mr-3" id="new-book-btn-submit">Confirm</button>
                                        <button className="btn btn-secondary">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditBookPage;
