import React, { Component } from 'react';
import UserService from '../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';

class EditBookPage extends Component {
    state = {
        book: [],
        categories: [],
        publishers: [],
        authors: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        UserService.getBook(id)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    book: result,
                });
            });

        var maxField = 6;
        var addButton = $('.add_button'); //Add button selector
        var wrapper = $('.field_wrapper'); //Input field wrapper

        var fieldHTML = '<div class="input-group col-xs-3 mt-2 field_wrapper">'
            + '<select data-live-search="true" id="authors" name="authors[]" class="form-control"defaultValue="Choose">'
            + '<option value="Choose" disabled>Choose</option>'
            + '{authors && authors.map((author) => ('
            + '<option value={author.id} key={author.id}>{author.first_names} {author.last_name}</option>'
            + '))}'
            + '</select>'
            + '<a type="button" class=" remove_button ml-2 my-auto"><strong><i class="fas fa-trash-alt"></i></strong></a>';

        var x = 1;

        $(addButton).click(function () {
            if (x < maxField) {
                x++;
                $(wrapper).append(fieldHTML); //Add field html
            }
        });

        $(wrapper).on('click', '.remove_button', function (e) {
            e.preventDefault();
            $(this).parent('div').remove();
            x--;
        });

        UserService.getCategories()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    categories: result,
                });
            });

        UserService.getPublishers()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    publishers: result,
                });
            });

        UserService.getAuthors()
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    authors: result,
                });
            });

    }

    handleSubmit = e => {
        e.preventDefault();
        var title = e.target.elements.title.value;
        var isbn = e.target.elements.isbn.value;
        var authors = e.target.elements.authors.value;
        var publisher = e.target.elements.publisher.value;
        var year = e.target.elements.year.value;
        var numberOfItems = e.target.elements.numberOfItems.value;
        var category = e.target.elements.categories.value;

        UserService.updateBook(
            this.state.book.id,
            title,
            isbn,
            authors,
            publisher,
            year,
            numberOfItems,
            category
        )
            .then(() => {
                toast.success("A book has been updated");
                setTimeout(
                    () => {
                        window.location.reload();
                    },
                    2000
                );

            })
            .catch((error) => {
                toast.error(error);
            });
    }

    render() {
        const { book, categories, publishers, authors } = this.state;
        return (
            <div className="container-fluid px-0" >
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card mt-0">
                            <div className="card-header">Add a book</div>
                            <div className="card-body">
                                <form name="newBookForm" onSubmit={this.handleSubmit}>
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">Title</label>
                                        <div className="col-md-6">
                                            <input type="text" id="title" className="form-control" defaultValue={book.title} name="title" required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">ISBN</label>
                                        <div className="col-md-6">
                                            <input type="text" id="isbn" className="form-control" defaultValue={book.isbn} name="isbn" required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="author" className="col-md-4 col-form-label control-label text-md-right">Authors</label>
                                        <div className="col-md-6">

                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3 field_wrapper">
                                                    <select data-live-search="true" id="authors" name="authors[]" className="form-control" defaultValue="">
                                                        <option value="Choose" disabled>Choose</option>
                                                        {authors && authors.map((author) => (
                                                            <option value={author.id} key={author.id}>{author.first_names} {author.last_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <fieldset className="pb-0 mb-0 mt-2">
                                                <div className="input-group col-xs-3">

                                                    <button type="button" className="btn add-one add_button btn-danger btn-sm mr-auto mb-2" data-toggle="modal">
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
                                                    <select data-live-search="true" id="publisher" name="publisher" className="form-control" defaultValue="Choose">
                                                        <option value="Choose" disabled>Choose</option>
                                                        {publishers && publishers.map((p) => (
                                                            <option value={p.id} key={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="year" className="col-md-4 col-form-label  control-label text-md-right">Publication year</label>
                                        <div className="col-md-6">
                                            <input type="number" id="year" className="form-control" defaultValue={book.publication_year}  name="year" min={1900} max={2021} required />

                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="numberOfItems" className="col-md-4 col-form-label  control-label text-md-right">Number of items</label>
                                        <div className="col-md-6">
                                            <input type="number" id="numberOfItems" className="form-control" name="numberOfItems" defaultValue={book.number_of_items} min={1} required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="publisher" className="col-md-4 col-form-label control-label text-md-right">Category</label>
                                        <div className="col-md-6">
                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3">
                                                    <select data-live-search="true" id="categories" name="categories[]" className="form-control" defaultValue="Choose">
                                                        <option value="Choose" disabled>Choose</option>
                                                        {categories && categories.map((c) => (
                                                            <option value={c.id} key={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary" id="new-book-btn-submit">
                                            Add
                                            </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />

                </div>
            </div>

        )
    }
}

export default withRouter(EditBookPage)