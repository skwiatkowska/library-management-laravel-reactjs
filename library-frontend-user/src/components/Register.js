import React, { Component } from 'react';

class Register extends Component {
    render() {
        return <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-3 form-card">
              <div className="card-header">Register your account</div>
              <div className="card-body">
                <form name="newUserForm" action="/register" method="POST">
                  <div className="form-group row required">
                    <label htmlFor="fname" className="col-md-4 col-form-label control-label text-md-right">First name</label>
                    <div className="col-md-6">
                      <input type="text" id="fname" className="form-control" name="fname" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="lname" className="col-md-4 col-form-label control-label text-md-right">Last name</label>
                    <div className="col-md-6">
                      <input type="text" id="lname" className="form-control" name="lname" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="pesel" className="col-md-4 col-form-label control-label text-md-right">PESEL</label>
                    <div className="col-md-6">
                      <input type="text" id="pesel" className="form-control" name="pesel" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="phone" className="col-md-4 col-form-label control-label text-md-right">Phone</label>
                    <div className="col-md-6">
                      <input type="text" id="phone" className="form-control" name="phone" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="email" className="col-md-4 col-form-label control-label text-md-right">Email</label>
                    <div className="col-md-6">
                      <input type="text" id="email" className="form-control" name="email" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="password" className="col-md-4 col-form-label control-label text-md-right">Password</label>
                    <div className="col-md-6">
                      <input type="text" id="password" className="form-control" name="password" required />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label htmlFor="password2" className="col-md-4 col-form-label control-label text-md-right">Confirm password</label>
                    <div className="col-md-6">
                      <input type="text" id="password2" className="form-control" name="password2" required />
                    </div>
                  </div>
                  <input type="hidden" name="isModal" defaultValue="false" />
                  <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Register now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    }
}

export default Register