import React from 'react';
import { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  logOut = () => {
    AuthService.logout();
    this.props.history.push("/admin/login");
  }
  render() {
    const {children} = this.props;
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Admin dashboard</h3>
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="/admin">
                Home
              </a>
            </li>
            <li>
              <a href="/admin/reservations">

                Reservations
              </a>
            </li>
            <li>
              <a href="/admin/borrowings">
                Borrowings
              </a>
            </li>
            <li>
              <a href="/admin/users">
                Members
              </a>
            </li>
            <li>
              <a href="/admin/books">
                <strong>Books</strong>
              </a>
            </li>
            <li>
              <a href="/admin/books/new-book">
                Add a book</a>
            </li>
            <li>
              <a href="#manageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                Collections
              </a>
              <ul className="collapse list-unstyled" id="manageSubmenu">
                <li>
                  <a className="sidebar-submenu-item" href="/admin/categories">Categories</a>
                </li>
                <li>
                  <a className="sidebar-submenu-item" href="/admin/authors">Authors</a>
                </li>
                <li>
                  <a className="sidebar-submenu-item" href="/admin/publishers">Publishers</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/admin/login" onClick={this.logOut}>
                <strong>Log out</strong>
              </a>
            </li>
          </ul>
        </nav>
        <div id="content">
          {children}
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar)