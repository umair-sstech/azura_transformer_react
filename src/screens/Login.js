import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../assets/images/logo-white.svg";
import { Redirect, Link } from 'react-router-dom'
import {
  updateEmail,
  updatePassword,
  onLoggedin,
  onLoginSubmit,
  onLoading,
  getUser
} from "../actions";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";


class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoad: true,
      email: "",
      password: ""
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoad: false
      })
    }, 500);
  }

  loginFormHandler = (event) => {
    event.preventDefault();
    this.props.onLoginSubmit(this.state)
      .then(res => {
        console.log("response",res.data.user)
        localStorage.setItem('_id',res.data.user._id)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name',res.data.user.name)
        localStorage.setItem('email',res.data.user.email)
        localStorage.setItem('company',res.data.user.company)
        localStorage.setItem('retailer',res.data.user.retailer)
        localStorage.setItem('role',res.data.user.role)
        this.props.onLoading(false)
        this.props.onLoggedin(true)
        this.props.getUser(res.data.token)
        this.props.history.push({ pathname: '/dashboard' })
      })
      .catch(e =>
      {
        console.log(e);
        toast.error(e.response.data.message || "Something went wrong")
        localStorage.removeItem('token')
        localStorage.removeItem('_id')
        localStorage.removeItem('token');
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('company')
        localStorage.removeItem('retailer')
        localStorage.removeItem('role')
        this.props.onLoading(false)
        this.props.onLoggedin(false)
      })
  }

  render()
  {
    return (
      <div className="theme-cyan">
        <div className="hide-border">
          <div className="vertical-align-wrap">
            <div className="vertical-align-middle auth-main">
              <div className="auth-box">
                <div className="top">
                  <img src={Logo} alt="Lucid" style={{ height: "40px", margin: "10px" }} />
                </div>
                <div className="card">
                  <div className="header">
                    <p className="lead">Login to your account</p>
                  </div>
                  <div className="body">
                    <form className="form-auth-small" onSubmit={this.loginFormHandler}>
                      <div className="form-group">
                        <label className="control-label sr-only">Email</label>
                        <input
                          className="form-control"
                          id="signin-email"
                          placeholder="Email"
                          type="email"
                          value={this.state.email}
                          onChange={event =>
                          {
                            this.setState({ ...this.state, 'email': event.target.value })
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label sr-only">
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="signin-password"
                          placeholder="Password"
                          type="password"
                          value={this.state.password}
                          name="password"
                          onChange={event =>
                          {
                            this.setState({ ...this.state, 'password': event.target.value })
                          }}
                        />
                      </div>
                      {/* <div className="form-group clearfix">
                        <label className="fancy-checkbox element-left">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                      </div> */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={this.props.isLoading}
                      >{this.props.isLoading ? (<>
                        <Spinner animation="border" size="sm" /> Please wait...
                      </>) : "Login"}</button>
                      <div className="bottom">
                        <span className="helper-text m-b-10">
                          <Link to='forgotpassword'>
                            Forgot password?
                          </Link>
                        </span>
                      </div>
                    </form>
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

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading
});

export default connect(mapStateToProps, {
  onLoggedin,
  onLoginSubmit,
  onLoading,
  getUser
})(Login);