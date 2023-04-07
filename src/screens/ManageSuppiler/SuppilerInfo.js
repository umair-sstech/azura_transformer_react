import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import countryList from "../../Data/countryList";
import { FormContext } from "./ManageSuppiler";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";


function SuppilerInfo(props) {
  console.log("props", props);
  const {
    setIsSuppilerAdded,
    isSuppilerAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);
  const history = useHistory();

  const formdata = new FormData();

  const [initFormData, setInitFormData] = useState({
    name: "",
    logo: "",
  });
  const [prefixName, setPrefixName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  const generatePrefixName = (name) => {
    let prefix = "";
    const words = name.split(" ");
    for (let i = 0; i < words.length && i < 3; i++) {
      prefix += words[i].charAt(0);
    }
    prefix = prefix.toUpperCase();
    if (prefix.length < 3) {
      const remainingChars = 3 - prefix.length;
      prefix += name.substring(0, remainingChars).toUpperCase();
    }
    return prefix;
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const prefix = generatePrefixName(name);
    setPrefixName(prefix);

    const formData = new FormData(document.forms.myForm);
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogoChange = (e) => {
    const formData = new FormData(document.forms.myForm);
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.get("name")) {
      errors.name = "Supplier name is required";
    }

    const logo = formData.get("logo");
    if (logo && !logo.type.startsWith("image/")) {
      errors.logo = "Please select file";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormData(formData);
      setIsSuppilerAdded(false);
      props.onButtonClick();
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault(); 
    const form = e.currentTarget.closest('form'); 
    if (!form) {
      return;
    }
  
    const formData = new FormData(form);
    const errors = validateForm(formData);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      history.push("/supplier");
    }
  };
  const handleCancle=()=>{
    history.push("/supplier")
  }

  return (
    <>
    <hr/>
    
      <form onSubmit={handleSubmit} name="myForm">
        <div style={{ marginTop: "35px" }}>
        <div className="row">
    <div className="col-lg-12 col-md-12 col-12 button-class">
      <div className="d-flex">
        <button
          className="btn btn-primary w-auto btn-lg mr-2"
          type="submit"
        >
          {props.isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Please wait...
            </>
          ) : isSuppilerAdded ? (
            "Update"
          ) : (
            "Save & Next"
          )}
        </button>

        <button
          className="btn btn-primary w-auto btn-lg mr-2"
          type="submit"
          onClick={handleOnClick}
        >
          Save & Exit
        </button>

        <button
          className="btn btn-secondary w-auto btn-lg"
          type="submit"
          onClick={handleCancle}
        >
          Exit
        </button>
        
      </div>
    </div>
  </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>
                  Suppiler Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Suppiler Name"
                  onChange={handleNameChange}
                />
                {formErrors.name && (
                  <span className="text-danger">{formErrors.name}</span>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>
                  {" "}
                  Logo <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="logo"
                  onChange={handleLogoChange}
                />
                {formErrors.logo && (
                  <span className="text-danger">{formErrors.logo}</span>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>
                  Prefix Name 
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Prefix name"
                  disabled
                  value={prefixName}
                />
              </div>
            </div>
          </div>
        
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerInfo);
