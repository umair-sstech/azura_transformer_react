import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageRetailerSetting";
import { validateHttpBucket } from "../Validations/Validation";

function CsvConfiguration(props) {
  
  const [isLoading, setIsLoading] = useState(false);
  const { processCancel, formData, setFormData } = useContext(FormContext);
  // const [formData, setFormData] = useState({});
  const [initFormData, setInitFormData] = useState({
    bucketName: "",
    secretKey: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName");

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  const handleChange = (key, val) => {
    const formData = new FormData(document.forms.httpBucketForm);
    formData.set(key, val);
    const errors = validateHttpBucket(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    setInitFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateHttpBucket(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {

      const payload = {
        ...initFormData,
      };

      console.log("payload--", payload);
    }
  }

  return (
    <div>
      <form name="httpBucketForm" onSubmit={handleSubmit}>
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

              <button
                className="btn btn-secondary w-auto btn-lg"
                type="button"
                onClick={processCancel}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="col-row mt-3 mt-sm-0">
          <div>
            <label style={{ color: "#49c5b6" }}>
              Selected Account: {marketPlaceSettingName}
            </label>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Bucket Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="bucketName"
                  onChange={handleInputChange}
                  placeholder="Bucket Name"
                  defaultValue={
                    initFormData && initFormData.bucketName ? initFormData.bucketName : ""
                  }
                />
                {formErrors.bucketName && (
                  <span className="text-danger">{formErrors.bucketName}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Secret Key / User Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="secretKey"
                  onChange={handleInputChange}
                  placeholder="Enter SecretKey / UserName"
                  defaultValue={
                    initFormData && initFormData.secretKey ? initFormData.secretKey : ""
                  }
                />
                {formErrors.secretKey && (
                  <span className="text-danger">{formErrors.secretKey}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
              <label>
                Secret Password / Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Enter Password"
                defaultValue={
                  initFormData && initFormData.password ? initFormData.password : ""
                }
              />
              {formErrors.password && (
                  <span className="text-danger">{formErrors.password}</span>
              )}
            </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CsvConfiguration;
