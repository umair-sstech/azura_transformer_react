import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from './ManageRetailer';
import * as Yup from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { onLoading } from '../../actions';


const RetailerSocialInfo = (props) =>
{
    const {
        processCancel,
        setFormData,
        formData, setLogoData, logoData, isRetailerAdded, setIsRetailerAdded } = useContext(FormContext)

    const [initFormData, setInitFormData] = useState({
        facebook_url: "",
        twitter_url: "",
        googlePluse_url: "",
        instagram_url: "",
        youtube_url: "",
        snapchat_url: "",
        tiktok_url: "",
        footer_copyright: "",
    });

    const Schema = Yup.object().shape({
        facebook_url: Yup.string().max(250, "Maximum 250 character"),
        twitter_url: Yup.string().max(250, "Maximum 250 character"),
        googlePluse_url: Yup.string().max(250, "Maximum 250 character"),
        instagram_url: Yup.string().max(250, "Maximum 250 character"),
        youtube_url: Yup.string().max(250, "Maximum 250 character"),
        snapchat_url: Yup.string().max(250, "Maximum 250 character"),
        tiktok_url: Yup.string().max(250, "Maximum 250 character"),
        footer_copyright: Yup.string().max(250, "Maximum 250 character"),
    });


    useEffect(() => {
        if (formData) {
            setInitFormData({
                facebook_url: formData.facebook_url || "",
                twitter_url: formData.twitter_url || "",
                googlePluse_url: formData.googlePluse_url || "",
                instagram_url: formData.instagram_url || "",
                youtube_url: formData.youtube_url || "",
                snapchat_url: formData.snapchat_url || "",
                tiktok_url: formData.tiktok_url || "",
                footer_copyright: formData.footer_copyright || "",
            })
        }
    }, [formData]);

    const formdata = new FormData();

    return (
        <Formik
            initialValues={initFormData}
            enableReinitialize
            validationSchema={Schema}
            onSubmit={(data) => {
                formdata.append("name", formData.name || "")
                formdata.append("email", formData.email)
                formdata.append("description", formData.description || "")
                formdata.append("building_name", formData.building_name || "")
                formdata.append("street_address", formData.street_address || "")
                formdata.append("state_or_city", formData.state_or_city || "")
                formdata.append("country", formData.country.value || "")
                formdata.append("pincode", formData.pincode || "")
                formdata.append("suburb", formData.suburb || "")
                formdata.append("contact_no", formData.contact_no || "")
                formdata.append("custom_domain_name", formData.custom_domain_name || "")
                formdata.append("site_url", formData.site_url || "")
                formdata.append("cost_center_name", formData.costCentreName || "")
                formdata.append("logo", logoData)
                formdata.append("facebook_url", data.facebook_url || "")
                formdata.append("twitter_url", data.twitter_url || "")
                formdata.append("googlePluse_url", data.googlePluse_url || "")
                formdata.append("instagram_url", data.instagram_url || "")
                formdata.append("youtube_url", data.youtube_url || "")
                formdata.append("snapchat_url", data.snapchat_url || "")
                formdata.append("tiktok_url", data.tiktok_url || "")
                formdata.append("footer_copyright", data.footer_copyright || "")
                props.onLoading(true)
                axios.post(`${process.env.REACT_APP_RETAILER_SERVICE}/update-retailer/${isRetailerAdded}`, formdata)
                    .then(res => {
                        localStorage.setItem("newlyAddedRetailer", res.data.retailer._id)
                        setIsRetailerAdded(res.data.retailer._id)
                        toast.success(res.data.message)
                        props.onLoading(false)
                    })
                    .catch(e => {
                        toast.error(e.response.data.message || "Something went wrong")
                        props.onLoading(false)
                    })
            }}
        >
            {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className="form-group ">
                                    <label>Logo (optional)</label>
                                    <input
                                        className="form-control"
                                        accept='image/png, image/jpeg'
                                        type="file"
                                        name="logo"
                                        onBlur={handleBlur}
                                        onChange={(e) => { setLogoData(e.target.files[0]) }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Facebook URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="facebook_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.facebook_url}
                                        placeholder="Enter Facebook URL"
                                    />
                                    {errors.facebook_url && touched.facebook_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.facebook_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Twitter URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="twitter_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.twitter_url}
                                        placeholder="Enter Twitter URL"
                                    />
                                    {errors.twitter_url && touched.twitter_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.twitter_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Gooogle Pluse URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="googlePluse_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.googlePluse_url}
                                        placeholder="Enter Gooogle Pluse URL"
                                    />
                                    {errors.googlePluse_url && touched.googlePluse_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.googlePluse_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Instagram URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="instagram_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.instagram_url}
                                        placeholder="Enter Instagram URL"
                                    />
                                    {errors.instagram_url && touched.instagram_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.instagram_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Youtube URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="youtube_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.youtube_url}
                                        placeholder="Enter Youtube URL"
                                    />
                                    {errors.youtube_url && touched.youtube_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.youtube_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Snapchat URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="snapchat_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.snapchat_url}
                                        placeholder="Enter Snapchat URL"
                                    />
                                    {errors.snapchat_url && touched.snapchat_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.snapchat_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Tiktok URL (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tiktok_url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tiktok_url}
                                        placeholder="Enter Tiktok URL"
                                    />
                                    {errors.tiktok_url && touched.tiktok_url ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.tiktok_url}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label>Footer Copyright (optional)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="footer_copyright"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.footer_copyright}
                                        placeholder="Enter Footer Copyright"
                                    />
                                    {errors.footer_copyright && touched.footer_copyright ? (
                                        <span className="error" style={{ color: "red" }}>
                                            {errors.footer_copyright}
                                        </span>
                                    ) : null}
                                </div>

                            </div>

                            <div className='col-lg-12 col-md-12 col-12'>
                                <div className='d-flex'>
                                    <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" disabled={props.isLoading}>
                                        {props.isLoading ? (<>
                                            <Spinner animation="border" size="sm" /> Please wait...
                                        </>) : isRetailerAdded ? 'Update' : 'Save'}
                                    </button>
                                    {isRetailerAdded ? <button className="btn btn-secondary w-auto btn-lg" onClick={processCancel} disabled={props.isLoading}>
                                        Cancel
                                    </button> : ""}
                                </div>
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik >
    );
}
const mapStateToProps = ({ LoadingReducer }) => ({
    isLoading: LoadingReducer.isLoading
});
export default connect(mapStateToProps, { onLoading })(RetailerSocialInfo);
