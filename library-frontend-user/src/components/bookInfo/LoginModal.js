import React, { Component } from "react";
import AuthService from "./../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';



class LoginModal extends Component {
    state = {
        email: "",
        password: "",
    }


    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
        });

        AuthService.login(this.state.email, this.state.password)
            .then((response) => {
                if (!response.user) throw new Error(response);
                else return response;
            })
            .then(() => {
                toast.success("Correct data");
                setTimeout(
                    () => {
                        window.location.reload()
                    },
                    2000
                );

            })
            .catch((error) => {
                toast.error(error);
            });
    }



render() {
    return (
        <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form name="newBookingConfirmForm" onSubmit={this.handleLogin}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">To reserve a book you must be logged in</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row required">
                                <label htmlFor="email" className="col-md-4 col-form-label control-label text-md-right">Email</label>
                                <div className="col-md-6">
                                    <input type="text" id="email" className="form-control" name="email" value={this.state.email}
                                        onChange={this.onChangeEmail} required />
                                </div>
                            </div>
                            <div className="form-group row required">
                                <label htmlFor="password" className="col-md-4 col-form-label control-label text-md-right">Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="password" className="form-control" name="password" value={this.state.password}
                                        onChange={this.onChangePassword} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="remember" className="col-form-label control-label mx-auto"><input type="checkbox" id="remember" className="mr-2" /><strong>Remember me</strong></label>
                            </div>
                        </div>
                        <div className="modal-footer p-3">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" id="confirm-booking-btn-submit" className="btn btn-primary">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}
}

export default LoginModal;
