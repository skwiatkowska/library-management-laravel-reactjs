import React, { Component } from 'react';
import UserService from '../../services/UserService';
import UserInfoBasic from './UserInfoBasic';
import UserBooksNav from './UserBooksNav';
import ReservationsTab from './ReservationsTab';
import HistoryTab from './HistoryTab';
import BorrowingsTab from './BorrowingsTab';
import { toast } from 'react-toastify';

class UserInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
    }

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

    handleSubmitDelete = (e) => {
        e.preventDefault();
        UserService.deleteUserProfile(this.state.user.id).then(
            () => {
                toast.success("An account has been deleted");
                setTimeout(
                    () => {
                        this.props.history.push("/admin/users");
                        window.location.reload();
                    },
                    2000
                )
            }
        );
    };


    render() {
        const { user } = this.state;
        return (
            <div className="container col-lg-10">
                {/* {JSON.stringify(user.returned)} */}
                <div className="card my-1">
                    <div className="h5 card-header">
                        <div className="row px-2">
                            User info
                            <div className="ml-auto row">
                                <a href={user.id + "/edit"} className="btn px-2 my-auto" title="Edit">Edit</a>
                                <form onSubmit={this.handleSubmitDelete}>
                                    <button type="submit" className="btn delete-book" style={{ background: 'transparent' }}>Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <UserInfoBasic user={user} />
                    <div className="card my-1">
                        <div className="h5 card-header">
                            <div className="row px-2">
                                Books
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text">
                                <UserBooksNav />
                                <div className="tab-content" id="nav-tabContent">
                                    <ReservationsTab books={user.reservations} />
                                    <BorrowingsTab books={user.books} />
                                    <HistoryTab books={user.returned} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UserInfoPage