import React, { Component } from "react";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from 'react-toastify';

class EditProfilePage extends Component {
    state = {
        user: [],
        first_name: "",
        last_name: "",
        pesel: "",
        email: ""
    };

    goBack = () => {
        window.history.back();
    };

    onChangeFirstName = (e) => {
        this.setState({
            first_name: e.target.value,
        });
    };

    onChangeLastName = (e) => {
        this.setState({
            last_name: e.target.value,
        });
    };

    onChangePesel = (e) => {
        this.setState({
            pesel: e.target.value,
        });
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        UserService.updateUserProfile(
            this.state.user.id,
            this.state.first_name,
            this.state.last_name,
            this.state.pesel,
            this.state.email)
            .then((response) => {
                if (!response) throw new Error(response);
                else return response;
            })
            .then(() => {
                toast.success("Data has been changed");
                setTimeout(
                    () => {
                        window.location.reload()
                    },
                    2000
                )
            })
            .catch((error) => {
                toast.error(error);
            });
    };


    componentDidMount() {
        const id = this.props.match.params.id;
        UserService.getUser(id)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    user: result,
                });
            });
    }


    render() {
        const { user } = this.state;
        console.log(user)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card my-3 form-card">
                            <div className="card-header">Change data</div>
                            <div className="card-body">
                                <form name="newUserForm" onSubmit={this.handleSubmit}>
                                    <div className="form-group row required">
                                        <label htmlFor="first_name" className="col-md-4 col-form-label control-label text-md-right">First name</label>
                                        <div className="col-md-6">
                                            <input type="text"
                                                id="first_name"
                                                className="form-control"
                                                name="first_name"
                                                defaultValue={user.first_name}
                                                onChange={this.onChangeFirstName}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="last_name" className="col-md-4 col-form-label control-label text-md-right">Last name</label>
                                        <div className="col-md-6">
                                            <input type="text"
                                                id="last_name"
                                                className="form-control"
                                                name="last_name"
                                                defaultValue={user.last_name}
                                                onChange={this.onChangeLastName}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row required">
                                        <label htmlFor="pesel" className="col-md-4 col-form-label control-label text-md-right">PESEL</label>
                                        <div className="col-md-6">
                                            <input type="text"
                                                id="pesel"
                                                className="form-control"
                                                name="pesel"
                                                defaultValue={user.pesel}
                                                onChange={this.onChangePesel}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row required">
                                        <label htmlFor="phone" className="col-md-4 col-form-label control-label text-md-right">Mobile</label>
                                        <div className="col-md-6">
                                            <input type="text" id="phone" className="form-control" name="phone" defaultValue={user.phone} required />
                                        </div>
                                    </div> */}

                                    <div className="form-group row required">
                                        <label htmlFor="email" className="col-md-4 col-form-label control-label text-md-right">Email</label>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                id="email"
                                                className="form-control"
                                                name="email"
                                                defaultValue={user.email}
                                                onChange={this.onChangeEmail}
                                                required />
                                        </div>
                                    </div>
                                    <input type="hidden" name="isModal" defaultValue="false" />
                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary mr-4">Save changes</button>
                                        <button type="button" className="btn btn-secondary" onClick={this.goBack}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default EditProfilePage;
