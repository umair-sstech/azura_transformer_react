import React from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import azuralogo from "../../assets/images/azura-logo.png";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { onLoading } from "../../actions";
class ForgotPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      notification: {
        show: false,
        type: 'success',
        text: ''
      }
    }
  }

  forgotMailHandler = (e) =>
  {
    e.preventDefault();
    this.props.onLoading(true)
    axios.post(`${process.env.REACT_APP_AUTH_SERVICE}/forgot-password`, { email: this.state.email })
      .then(res => {
        this.setState({ email: '' })
        toast.success(res.data.message)
        this.props.history.push("login")
        this.props.onLoading(false)
      }).catch(e =>
      {
        toast.error(e.response.data.message || "Something went wrong")
        this.props.onLoading(false)
      })

  }

  render()
  {
    return (
      <div className="theme-cyan">
        <div className="hide-border">
          <div className="vertical-align-wrap">
            <div className="">
              <div className="auth-box">
                <div className="top">
                  <img src={azuralogo} alt="Lucid" style={{ height: "74px",margin: "19px",marginBottom: "8px" }} />
                </div>
                <div className="card">
                  <div className="header">
                    <p className="lead">Recover my password</p>
                  </div>
                  <div className="body">
                    <p>Please enter your email address below to receive instructions for resetting password.</p>
                    <form className="form-auth-small ng-untouched ng-pristine ng-valid" onSubmit={this.forgotMailHandler}>
                      <div className="form-group">
                        <input className="form-control" value={this.state.email} placeholder="Enter Email" type="email" onChange={(e) => {
                          this.setState({ ...this.state, email: e.target.value })
                        }} />
                      </div>
                      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={!this.state.email || this.props.isLoading}>
                        {this.props.isLoading ? (<>
                          <Spinner animation="border" size="sm" /> Please wait...
                        </>) : "Send Reset Link"}
                      </button>
                      <div className="bottom">
                        <span className="helper-text">Know your password? <Link to="login">Login</Link></span>
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
  onLoading
})(ForgotPassword);
