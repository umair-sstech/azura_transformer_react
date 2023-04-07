import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./SupplierPage.css";


function SupplierSftpForm() {
  const [formData, setFormData] = useState({
    hostname: "",
    username: "",
    password: "",
    port: "",
    protocol: "",
    url: "",
    syncFrequency: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const history=useHistory()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleProtocolChange = (selectedOption) => {
    setFormData({ ...formData, protocol: selectedOption.value });
    setFormErrors({ ...formErrors, protocol: "" });
  };

  function validateForm(formData) {
    const errors = {};
    if (!formData.hostname) {
      errors.hostname = "Host Name is required";
    }
    if (!formData.username) {
      errors.username = "User Name is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.port) {
      errors.port = "Port is required";
    }
    if (!formData.protocol) {
      errors.protocol = "Protocol is required";
    }
    if (!formData.url) {
      errors.url = "URL is required";
    }
    if (!formData.syncFrequency) {
      errors.syncFrequency = "Sync Frequency is required";
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    if (Object.keys(errors).length === 0) {
      history.push("/supplier");
    }
  };

  const handleCancle=()=>{
    history.push("/supplier")
  }
  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "35px" }}>
      <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                Save & Next
              </button>
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={handleOnClick}
              >
                Save & Exit
              </button>

              <button className="btn btn-secondary w-auto btn-lg" type="submit" onClick={handleCancle}>
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>
                Host Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="hostname"
                placeholder="Enter Host Name"
                onChange={handleInputChange}
                value={formData.hostname}
              />
              {formErrors.hostname && (
                <span className="text-danger">{formErrors.hostname}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>User Name </label>
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Enter User Name"
                onChange={handleInputChange}
                value={formData.username}
              />
              {formErrors.username && (
                <span className="text-danger">{formErrors.username}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>
                password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="password"
                placeholder="Enter Password"
                onChange={handleInputChange}
                value={formData.password}
              />
              {formErrors.password && (
                <span className="text-danger">{formErrors.password}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>
                port <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="port"
                placeholder="Enter port"
                onChange={handleInputChange}
                value={formData.port}
              />
              {formErrors.port && (
                <span className="text-danger">{formErrors.port}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>
                protocol <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                placeholder="Select Protocol"
                name="protocol"
                options={option}
                onChange={handleProtocolChange}
                value={option.find(
                  (option) => option.value === formData.protocol
                )}
              />
              {formErrors.protocol && (
                <span className="text-danger">{formErrors.protocol}</span>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label>
                URL/Path <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter URL"
                name="url"
                onChange={handleInputChange}
                value={formData.url}
              />
              {formErrors.url && (
                <span className="text-danger">{formErrors.url}</span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                Sync Frequency <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="syncFrequency"
                placeholder="Enter Sync Frequency"
                onChange={handleInputChange}
                value={formData.syncFrequency}
              />
              {formErrors.syncFrequency && (
                <span className="text-danger">{formErrors.syncFrequency}</span>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </form>
  );
}

export default SupplierSftpForm;
