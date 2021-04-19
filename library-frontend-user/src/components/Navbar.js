import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return <nav className="navbar navbar-dark navbar-expand-lg">
        <a className="navbar-brand" href="/"> Library </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainmenu" aria-controls="mainmenu" aria-expanded="false">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainmenu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-2">
              <a className="nav-link" href="/"> Home </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link font-weight-bold" href="/books"> Books </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/working-hours"> Working hours </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/contact"> Contact </a>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item px-2">
              <a className="nav-link" href="/register"> Sign up</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/login"> Sign in </a>
            </li>
          </ul>
        </div>
      </nav>
      
    }
}

export default Navbar