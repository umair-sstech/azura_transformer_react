import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./SupplierPage.css";
import timeZoneData from "../../Data/timeZone";
import axios from "axios";
import Swal from "sweetalert2";
import { validateHttpForm, validateSftpForm } from "../Validations/Validation";

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
  const history = useHistory();
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);

  useEffect(() => {
    getCronTimeData();
  }, []);

  const getCronTimeData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL_SUPPLIER}/general/getCronTime`)
        .then((response) => {
          const options = response.data.data.map((item) => ({
            label: item.name,
            value: item.value,
          }));
          console.log("item", options);
          setSyncFrequencyOptions(options);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleProtocolChange = (selectedOption) => {
    setFormData({ ...formData, protocol: selectedOption.value });
    setFormErrors({ ...formErrors, protocol: "" });
  };
  const handleSyncFrequency=(selectedOption)=>{
    setFormData({ ...formData, syncFrequency: selectedOption.value })
    setFormErrors({ ...formErrors, syncFrequency: "" });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateSftpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    const errors = validateSftpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    if (Object.keys(errors).length === 0) {
      history.push("/supplier");
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/supplier");
      }
    });
  };

  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];
  return (
    <>
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

                <button
                  className="btn btn-secondary w-auto btn-lg"
                  type="submit"
                  onClick={handleCancel}
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
                <label>
                  User Name <span style={{ color: "red" }}>*</span>
                </label>
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
                  Password <span style={{ color: "red" }}>*</span>
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
                  Port <span style={{ color: "red" }}>*</span>
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
                  Protocol <span style={{ color: "red" }}>*</span>
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
                <Select
                placeholder="Select Frequency"
                options={syncFrequencyOptions}
               onChange={handleSyncFrequency}
                  
              />
                {formErrors.syncFrequency && (
                  <span className="text-danger">
                    {formErrors.syncFrequency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SupplierSftpForm;
