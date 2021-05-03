import { Component } from "react";
import AuthService from "../services/AuthService";
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          message: "",
        };
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
    
        AuthService.login(this.state.email, this.state.password)
          .then((response) => {
            if (!response.user) throw new Error(response);
            else return response;
          })
          .then(() => {
            toast.success("Correct data");
            setTimeout(
              () => {
                this.props.history.push("/admin");
                window.location.reload()
              },
              2000
            );
    
          })
          .catch((error) => {
            toast.error(error);
          });
      };
    render() {
        return (
            <div className="login-page">
                <div className="form login-body">
                    <h2 className="mb-5">
                        <strong>Admin dashboard</strong>
                    </h2>
                    <form onSubmit={this.handleLogin}>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            placeholder="Email"
                        />
                        <input type="password" name="password" placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChangePassword} />
                        <button type="submit" className="mt-5">
                            Log in
          </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);