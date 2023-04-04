import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify'
import countryList from '../../Data/countryList';
import { FormContext } from './ManageSuppiler';
import { connect } from 'react-redux';
import { onLoading } from '../../actions';
import { Spinner } from 'react-bootstrap';

function SuppilerInfo(props) {
  const { setIsSuppilerAdded,
    isSuppilerAdded,
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
        setInitFormData(formData)
    }
}, [props]);


  return (
    <>

    <form>
    <div style={{marginTop:"30px"}}>
        <div className='row'>
            <div className='col-6'>
                <div className="form-group">
                    <label>Suppiler Name <span style={{ color: "red" }}>*</span></label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Company Name"
                    />
                    
                </div>
            </div>
            <div className='col-6'>
                <div className="form-group">
                    <label> Description (optional)</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        placeholder="Enter Company Descripion"
                    />
                    
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
                        placeholder="Building Name (Address 1)"
                    />
                    
                </div>
            </div>
            <div className='col-6'>
                <div className="form-group">
                    <label>Street Address <span style={{ color: "red" }}>*</span></label>
                    <input
                        className="form-control"
                        type="text"
                        name="street_address"
                        placeholder="Street Address (Address 2)"
                    />
                    
                </div>
            </div>
        </div>


        <div className="form-group">
            <label>Email Address</label>
            <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Enter Email Address"
            />
            
        </div>

    
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-12'>
                <div className='d-flex'>
                    <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" disabled={props.isLoading} >

                        {props.isLoading ? (<>
                            <Spinner animation="border" size="sm" /> Please wait...
                        </>) : isSuppilerAdded ? 'Update' : 'Save & Next'}
                    </button>
                    {isSuppilerAdded ? <button className="btn btn-secondary w-auto btn-lg" onClick={processCancel} disabled={props.isLoading}>
                        Cancel
                    </button> : ""}
                </div>
            </div>
        </div>
    </div>
</form>
    </>
  )
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading
});
export default connect(mapStateToProps, { onLoading })(SuppilerInfo);
