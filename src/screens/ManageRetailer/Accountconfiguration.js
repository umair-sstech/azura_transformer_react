import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageRetailerSetting";
import { validateRetailerAccount } from "../Validations/Validation";

function Accountconfiguration(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const { processCancel, formData, setFormData } = useContext(FormContext);

  const [initFormData, setInitFormData] = useState({
    channel: "",
    apiEndpoint: "",
    authorizationToken: "",
  });
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

  const handleChange = (key, value) => {
    const formData = new FormData(document.forms.accountForm);
    formData.set(key, value);
    const errors = validateRetailerAccount(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleInputChange = (e) => {
    const {name, value , type} = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    setInitFormData(prevState => ({
    ...prevState,
      [name]: trimmedValue,
    }));
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateRetailerAccount(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(initFormData)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} name="accountForm">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>

              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel}>
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="col-row mt-3 mt-sm-0">
            <div className="col-6"></div>
            <label style={{ color: "#49c5b6" }}>
              Selected Account: 
            </label>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Channel/Store <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="channel"
                  onChange={handleInputChange}
                  placeholder="Enter Channel"
                  defaultValue={initFormData && initFormData.channel ? initFormData.channel : ""}
                />
                {formErrors && formErrors.channel && (
                  <span className="text-danger">{formErrors.channel}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  API Endpoint <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="apiEndpoint"
                  onChange={handleInputChange}
                  placeholder="Enter API Endpoint"
                  defaultValue={initFormData && initFormData.apiEndpoint ? initFormData.apiEndpoint : ""}
                />
                {formErrors && formErrors.apiEndpoint && (
                  <span className="text-danger">{formErrors.apiEndpoint}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Authorization Token <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="authorizationToken"
                  onChange={handleInputChange}
                  placeholder="Enter token"
                  defaultValue={initFormData && initFormData.authorizationToken ? initFormData.authorizationToken : ""}
                />
                {formErrors && formErrors.authorizationToken && (
                  <span className="text-danger">{formErrors.authorizationToken}</span>
                )}
              </div>
            </div>
          </div>
        
      </form>
    </>
  );
}

export default Accountconfiguration;
