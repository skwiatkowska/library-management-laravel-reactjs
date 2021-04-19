import React from 'react';

const Navbar = ({children}) => (
        <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Admin dashboard</h3>
          </div>
          <ul className="list-unstyled components">
            <li className>
              <a href="/admin">
                <i className="fas fa-home" />
                Home
              </a>
            </li>
            <li>
              <a href="/admin/reservations">
                <i className="fas fa-bookmark" />
                Reservations
              </a>
            </li>
            <li>
              <a href="/admin/borrowings">
                <i className="fas fa-folder-open" />
                Borrowings
              </a>
            </li>
            <li>
              <a href="#membersSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                <i className="fas fa-user" />
                Members
              </a>
              <ul className="collapse list-unstyled" id="membersSubmenu">
                <li>
                  <a className="sidebar-submenu-item" href="/admin/users/new-user">Add a member</a>
                </li>
                <li>
                  <a className="sidebar-submenu-item" href="/admins/users">Find a member</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/admin/books">
                <i className="fas fa-book" />
                <strong>Books</strong>
              </a>
            </li>
            <li>
              <a href="/admin/books/new-book"><i className="fas fa-plus" />
                Add a book</a>
            </li>
            <li>
              <a href="#manageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                <i className="fas fa-database" />
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
              <a href="/admin/info">
                <i className="fas fa-info-circle" />
                Info
              </a>
            </li>
          </ul>
        </nav>
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button type="button" id="sidebarCollapse" className="btn btn-info mr-4">
                <i className="fas fa-align-left" />
              </button>
              <div className="title-nav">
                <p className="font-weight-bold"></p>
              </div>
              <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-align-right" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href><i className="fa fa-power-off" /> Log out</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </div>
   )

export default Navbar