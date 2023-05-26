import React from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import azuralogo from "../../assets/images/azura-logo.png";

import axios from "axios";
import { Formik } from "formik";
import * as Yup from 'yup'
import { toast } from "react-toastify";
import { onLoading } from "../../actions";
import { Spinner } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props)
        let baseUrl = (window.location).href;
        this.state = {
            token: baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
        }
    }

    render() {
        const Schema = Yup.object().shape({
            password: Yup.string().required("This field is required"),
            confirmPassword: Yup.string().required("This field is required").when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                )
            })
        });

        return (
            <div className="theme-cyan">
                <div>
                    <div className="vertical-align-wrap">
                        <div className="">
                            <div className="auth-box">
                                <div className="top">
                                    <img src={azuralogo} alt="Lucid" style={{ height: "74px",margin: "19px",marginBottom: "8px" }} />
                                </div>
                                <div className="card">
                                    <div className="header">
                                        <p className="lead">Reset Password</p>
                                    </div>
                                    <div className="body">
                                        <p>Please enter your New Password below.</p>


                                        <Formik
                                            initialValues={{
                                                password: "",
                                                confirmPassword: ""
                                            }}
                                            validationSchema={Schema}
                                            onSubmit={(data, { resetForm }) => {
                                                this.props.onLoading(true)
                                                const { password, confirmPassword } = data;
                                                axios.post(`${process.env.REACT_APP_AUTH_SERVICE}/reset-password`, { password, confirmPassword, token: this.state.token })
                                                    .then(res =>
                                                    {
                                                        resetForm({ values: '' })
                                                        toast.success("Password has been reseted")
                                                        this.props.history.push('/login'); 
                                                        this.props.onLoading(false)
                                                    }).catch(e => {
                                                        toast.error(e.response.data.message || "Something went wrong")
                                                        this.props.onLoading(false)
                                                    })
                                            }}
                                        >
                                            {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                                                return (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                name="password"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.password}
                                                                placeholder="Enter Password"
                                                            />
                                                            <span className="error" style={{ color: "red" }}>
                                                                {errors.password}
                                                            </span>
                                                        </div>

                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                name="confirmPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.confirmPassword}
                                                                placeholder="Enter Confirm Password"
                                                            />
                                                            <span className="error" style={{ color: "red" }}>
                                                                {errors.confirmPassword}
                                                            </span>
                                                        </div>
                                                        <button className="btn btn-primary btn-lg btn-block" type="submit"  onSubmit={this.onSubmit}  disabled={this.props.isLoading}>
                                                            {this.props.isLoading ? (<>
                                                                <Spinner animation="border" size="sm" /> Please wait...
                                                            </>) : "Reset Password"}
                                                        </button>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
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

ResetPassword.propTypes = {
};

const mapStateToProps = ({ LoadingReducer }) => ({
    isLoading: LoadingReducer.isLoading
});

export default connect(mapStateToProps, {
    onLoading
})(ResetPassword);
