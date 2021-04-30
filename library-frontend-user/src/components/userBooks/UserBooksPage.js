import React, { Component } from "react";
import UserBooksNav from "../userBooks/UserBooksNav";
import BorrowingsTab from "./BorrowingsTab";
import HistoryTab from "./HistoryTab";
import ReservationsTab from "./ReservationsTab";

class UserBooksPage extends Component {

    
    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card my-3 form-card">
                            <div className="card-header">Moje książki</div>
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <UserBooksNav />
                                            <div className="tab-content" id="nav-tabContent">
                                                <ReservationsTab/>
                                                <BorrowingsTab/>
                                                <HistoryTab/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserBooksPage;
