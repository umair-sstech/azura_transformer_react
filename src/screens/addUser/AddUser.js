import { Formik } from 'formik';
import React from 'react';
import PageHeader from '../../components/PageHeader';
import axios from 'axios';
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const AddUser = () => {

    const Schema = Yup.object().shape({
        firstName: Yup.string().required("Company Name is Require"),
        lastName: Yup.string().email().required("Company Email is Require"),
        role: Yup.string().required("Company Contact No. is Require"),
        email: Yup.string().required("Company Owner is Require"),
        password: Yup.string().required("Company Owner is Require"),
        company: Yup.string().required("Company Owner is Require"),
        permission: Yup.string().required("Company Owner is Require")
    });

    return (
        <div
            style={{ flex: 1 }}
            onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}
        >
            <div>
                <div className="container-fluid">
                    <PageHeader
                        HeaderText="Add user"
                        Breadcrumb={[
                            { name: "Managet", navigate: "" },
                            { name: "Retailer List", navigate: "" }
                        ]}
                    />
                    <div className="row clearfix d-flex justify-content-center">
                        <div className='col-4'>
                            <div className='card'>
                                <div className='body'>

                                    <Formik
                                        initialValues={{
                                            firstName: "",
                                            lastName: "",
                                            role: "",
                                            email: "",
                                            password: "",
                                            company: "",
                                            permission: []
                                        }}
                                        validationSchema={Schema}
                                        onSubmit={(data, { resetForm }) => {
                                            const { companyName, companyOwner, contactNo, email } = data;
                                            axios.post(`${process.env.REACT_APP_API_URL}/company/add-company`, {
                                                compnay_owner: companyOwner,
                                                name: companyName,
                                                email,
                                                phone: contactNo
                                            }).then(res => {
                                                toast.success(res.data.message)
                                                resetForm({ values: '' })
                                            }).catch(e => {
                                                toast.error("Something went wrong")
                                            })
                                        }}
                                    >
                                        {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                                            return (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="companyName"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.companyName}
                                                            placeholder="Enter Company Name"
                                                        />
                                                        {errors.companyName && touched.companyName ? (<span className="error" style={{ color: "red" }}>{errors.companyName}</span>) : null}
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            name="email"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.email}
                                                            placeholder="Enter Company Email"
                                                        />
                                                        {errors.email && touched.email ? (<span className="error" style={{ color: "red" }}>{errors.email}</span>) : null}
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="contactNo"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.contactNo}
                                                            placeholder="Enter Company Contact No."
                                                        />
                                                        {errors.contactNo && touched.contactNo ? (<span className="error" style={{ color: "red" }}>{errors.contactNo}</span>) : null}
                                                    </div>

                                                    <div className="form-group">
                                                        <select name='companyOwner' className="form-control" value={values.companyOwner} onBlur={handleBlur} onChange={handleChange}>
                                                            <option value="">-- Select Owner --</option>
                                                        </select>
                                                        {errors.companyOwner && touched.companyOwner ? (<span className="error" style={{ color: "red" }}>{errors.companyOwner}</span>) : null}

                                                    </div>

                                                    <button className="btn btn-primary btn-lg btn-block" type="submit" >
                                                        Add
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

export default AddUser;
