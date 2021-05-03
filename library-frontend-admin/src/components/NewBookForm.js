import React, { Component } from 'react';
import UserService from '../services/UserService';
import $ from 'jquery';

class NewBookForm extends Component {
    state = {
        categories: [],
        publishers: [],
        authors : []
    }

    componentDidMount() {
        var maxField = 6; 
        var addButton = $('.add_button'); //Add button selector
        var wrapper = $('.field_wrapper'); //Input field wrapper
        
        var fieldHTML = '<div class="input-group col-xs-3 mt-2 field_wrapper">'
        +'<select data-live-search="true" id="authors" name="authors[]" class="form-control">'
        +'<option value="" selected disabled>Choose</option>'
        +'<option value="dadad">sa\sa</option>'
        +'</select>'
        +'<a type="button" class=" remove_button ml-2 my-auto"><strong><i class="fas fa-trash-alt"></i></strong></a>';
       
        var x = 1; 
        
        $(addButton).click(function(){
            if(x < maxField){ 
                x++; 
                $(wrapper).append(fieldHTML); //Add field html
            }
        });
        
        $(wrapper).on('click', '.remove_button', function(e){
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

    render() {
        // const { categories, publishers, authors } = this.state;
        return (
            <div className="container-fluid px-0">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card mt-0">
                            <div className="card-header">Add a book</div>
                            <div className="card-body">
                                <form name="newBookForm">
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">Title</label>
                                        <div className="col-md-6">
                                            <input type="text" id="title" className="form-control" name="title" required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="title" className="col-md-4 col-form-label  control-label text-md-right">ISBN</label>
                                        <div className="col-md-6">
                                            <input type="text" id="isbn" className="form-control" name="isbn" required />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="author" className="col-md-4 col-form-label control-label text-md-right">Authors</label>
                                        <div className="col-md-6">
                                            <div className="control-group form-group mb-0">
                                                <div className="input-group col-xs-3 field_wrapper">
                                                    <select data-live-search="true" id="authors" name="authors[]" className="form-control">
                                                        <option value selected disabled>Choose</option>
                                                        <option value="ds">sdzdd
                                                         </option></select>
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
                                                    <select data-live-search="true" id="publisher" name="publisher" className="form-control">
                                                        <option value selected disabled>Choose</option>
                                                        <option value="sd">sad</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="year" className="col-md-4 col-form-label  control-label text-md-right">Publication year</label>
                                        <div className="col-md-6">
                                            <select id="year" name="year" className="form-control py-1 required">
                                                <option value selected disabled>Choose</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="numberOfItems" className="col-md-4 col-form-label  control-label text-md-right">Number of items</label>
                                        <div className="col-md-6">
                                            <input type="number" id="numberOfItems" className="form-control" name="numberOfItems" min={1} required />
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
                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary" id="new-book-btn-submit">
                                            Add
                                </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewBookForm