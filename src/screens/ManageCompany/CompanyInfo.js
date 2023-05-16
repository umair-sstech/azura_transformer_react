import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify'
import countryList from '../../Data/countryList';
import { FormContext } from './ManageCompany';
import Select from 'react-select';
import { connect } from 'react-redux';
import { onLoading } from '../../actions';
import { Spinner } from 'react-bootstrap';



const CompanyInfo = (props) =>
{
    const { setIsCompanyAdded,
        isCompanyAdded,
        formData,
        setFormData,
        processCancel } = useContext(FormContext)

    const formdata = new FormData();

    const [initFormData, setInitFormData] = useState(
        {
            name: "",
            description: "",
            country: "",
            building_name: "",
            street_address: "",
            state_or_city: "",
            pincode: "",
            contact_no: "",
            email: "",
            custom_domain_name: "",
            site_url: "",
            cost_center_name: "",
            suburb: ""
        });

    useEffect(() => {
        if (formData) {
            formData.country = {
                value: formData.country,
                label: formData.country
            }
            setInitFormData(formData)
        }
    }, [formData]);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const Schema = Yup.object().shape({
        name: Yup.string().required("This field is required").max(50, "Maximum 50 character"),
        description: Yup.string().max(250, "Maximum 250 character"),
        country: Yup.object().required("This field is required"),
        building_name: Yup.string().max(100, "Maximum 100 character").required("This field is required"),
        street_address: Yup.string().max(100, "Maximum 100 character").required("This field is required"),
        state_or_city: Yup.string().required("This field is required").max(100, "Maximum 100 character"),
        pincode: Yup.string().max(30, "Maximum 30 character"),
        contact_no: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(15, "Maximum 15 character"),
        email: Yup.string().email("Insert Vaid Email"),
        custom_domain_name: Yup.string().max(200, "URL must be less than 200 character"),
        site_url: Yup.string().max(200, "URL must be less than 200 character"),
        cost_center_name: Yup.string().max(50, "Cost Centre Name must be less than 50 character"),
        suburb: Yup.string().max(100, "Suburb must be less than 100 character").required("This field is required")
    });
    return (
        <Formik
            initialValues={initFormData}
            enableReinitialize
            validationSchema={Schema}
            onSubmit={(data) => {
                formdata.append("name", data.name || "")
                formdata.append("email", data.email || "")
                formdata.append("description", data.description || "")
                formdata.append("building_name", data.building_name || "")
                formdata.append("street_address", data.street_address || "")
                formdata.append("state_or_city", data.state_or_city || "")
                formdata.append("country", data.country.value || "")
                formdata.append("pincode", data.pincode || "")
                formdata.append("suburb", data.suburb || "")
                formdata.append("contact_no", data.contact_no || "")
                formdata.append("custom_domain_name", data.custom_domain_name || "")
                formdata.append("site_url", data.site_url || "")
                formdata.append("cost_center_name", data.cost_center_name || "")

                if (isCompanyAdded.length) {

                    formdata.append("facebook_url", formData.hasOwnProperty('facebook_url') ? formData.facebook_url : "")
                    formdata.append("twitter_url", formData.hasOwnProperty('twitter_url') ? formData.twitter_url : "")
                    formdata.append("googlePluse_url", formData.hasOwnProperty('goooglePluse_url') ? formData.goooglePluse_url : "")
                    formdata.append("instagram_url", formData.hasOwnProperty('instagram_url') ? formData.instagram_url : "")
                    formdata.append("youtube_url", formData.hasOwnProperty('youtube_url') ? formData.youtube_url : "")
                    formdata.append("snapchat_url", formData.hasOwnProperty('snapchat_url') ? formData.snapchat_url : "")
                    formdata.append("tiktok_url", formData.hasOwnProperty('tiktok_url') ? formData.tiktok_url : "")
                    formdata.append("footer_copyright", formData.hasOwnProperty('footer_copyright') ? formData.footer_copyright : "")
                    props.onLoading(true)
                    axios.post(`${process.env.REACT_APP_COMPANY_SERVICE}/update-company/${isCompanyAdded}`, formdata)
                        .then(res => {
                            localStorage.setItem("newlyAddedCompany", res.data.company._id)
                            setIsCompanyAdded(res.data.company._id)
                            toast.success(res.data.message)
                            props.onLoading(false)
                        })
                        .catch(e => {
                            toast.error(e.response.data.message || "Something went wrong")
                            props.onLoading(false)
                        })
                }
                else {
                    props.onLoading(true)
                    axios.post(`${process.env.REACT_APP_COMPANY_SERVICE}/add-company`, formdata)
                        .then(res => {
                            localStorage.setItem("newlyAddedCompany", res.data.company._id)
                            setIsCompanyAdded(res.data.company._id)
                            toast.success(res.data.message)
                            setFormData(res.data.company)
                            props.onLoading(false)
                        })
                        .catch(e => {
                            toast.error(e.response.data.message || "Something went wrong")
                            props.onLoading(false)
                        })
                }

            }}
        >
            {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                return (

                    <form onSubmit={handleSubmit}>
                        <div >
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Company Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            placeholder="Enter Company Name"
                                        />
                                        {errors.name && touched.name ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.name}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Company Description (optional)</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.description}
                                            placeholder="Enter Company Descripion"
                                        />
                                        {errors.description && touched.description ?
                                            (
                                                <span className="error" style={{ color: "red" }}>
                                                    {errors.description}
                                                </span>
                                            ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Building Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="building_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.building_name}
                                            placeholder="Building Name (Address 1)"
                                        />
                                        {errors.building_name && touched.building_name ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.building_name}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Street Address <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="street_address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.street_address}
                                            placeholder="Street Address (Address 2)"
                                        />
                                        {errors.street_address && touched.street_address ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.street_address}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Suburb <span style={{ color: "red" }}>*</span></label>

                                <input
                                    className="form-control"
                                    type="text"
                                    name="suburb"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.suburb}
                                    placeholder="Enter Suburb"
                                />
                                {errors.suburb && touched.suburb ? (
                                    <span className="error" style={{ color: "red" }}>
                                        {errors.suburb}
                                    </span>
                                ) : null}
                            </div>

                            <div className='row'>
                                <div className='col-4'>
                                    <div className="form-group">
                                        <label>City / State <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="state_or_city"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.state_or_city}
                                            placeholder="State or City"
                                        />
                                        {errors.state_or_city && touched.state_or_city ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.state_or_city}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="form-group">
                                        <label>
                                            Country <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <Select
                                            options={countryList?.map((data) => (
                                                {
                                                    value: data.name,
                                                    label: data.name,
                                                }
                                            )
                                            )}
                                            placeholder="Select Country"
                                            value={values.country}
                                            onBlur={(e) => handleBlur(e)}
                                            onChange={(data) => {
                                                if (data) {
                                                    let event = {
                                                        target: { name: "country", value: data },
                                                    };
                                                    handleChange(event);
                                                }
                                            }}
                                        />
                                        {errors.country && touched.country ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.country}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="form-group">
                                        <label>Pincode (optional)</label>

                                        <input
                                            className="form-control"
                                            type="text"
                                            name="pincode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.pincode}
                                            placeholder="Enter Pincode"
                                        />
                                        {errors.pincode && touched.pincode ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.pincode}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contact No. (optional)</label>

                                <input
                                    className="form-control"
                                    type="text"
                                    name="contact_no"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.contact_no}
                                    placeholder="Enter Contact No."
                                />
                                {errors.contact_no && touched.contact_no ? (
                                    <span className="error" style={{ color: "red" }}>
                                        {errors.contact_no}
                                    </span>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label>Email Address (optional)</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder="Enter Email Address"
                                />
                                {errors.email && touched.email ? (
                                    <span className="error" style={{ color: "red" }}>
                                        {errors.email}
                                    </span>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label>Custom Domain Name (optional)</label>

                                <input
                                    className="form-control"
                                    type="text"
                                    name="custom_domain_name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.custom_domain_name}
                                    placeholder="Enter Custom Domain Name"
                                />
                                {errors.custom_domain_name && touched.custom_domain_name ? (
                                    <span className="error" style={{ color: "red" }}>
                                        {errors.custom_domain_name}
                                    </span>
                                ) : null}
                            </div>


                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Site URL (optional)</label>

                                        <input
                                            className="form-control"
                                            type="text"
                                            name="site_url"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.site_url}
                                            placeholder="Enter Site URL"
                                        />
                                        {errors.site_url && touched.site_url ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.site_url}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Cost Center Name (optional)</label>

                                        <input
                                            className="form-control"
                                            type="text"
                                            name="cost_center_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.cost_center_name}
                                            placeholder="Enter Cost Center Name"
                                        />
                                        {errors.cost_center_name && touched.cost_center_name ? (
                                            <span className="error" style={{ color: "red" }}>
                                                {errors.cost_center_name}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-12'>
                                    <div className='d-flex'>
                                        <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" disabled={props.isLoading} >

                                            {props.isLoading ? (<>
                                                <Spinner animation="border" size="sm" /> Please wait...
                                            </>) : isCompanyAdded ? 'Update' : 'Save'}
                                        </button>
                                        {isCompanyAdded ? <button className="btn btn-secondary w-auto btn-lg" onClick={processCancel} disabled={props.isLoading}>
                                            Cancel
                                        </button> : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
}
const mapStateToProps = ({ LoadingReducer }) => ({
    isLoading: LoadingReducer.isLoading
});
export default connect(mapStateToProps, { onLoading })(CompanyInfo);
