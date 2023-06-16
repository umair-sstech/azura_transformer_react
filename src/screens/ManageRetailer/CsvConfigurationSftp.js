import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { FormContext } from "./ManageRetailerSetting";
import { validateSftpFtp } from "../Validations/Validation";

function CsvConfigurationSftp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [accountSyncFrequency, setAccountSyncFrequency] = useState("");
  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName");
  const [initFormData, setInitFormData] = useState({
    hostName: "",
    userName: "",
    password: "",
    port: "",
    protocol: "",
    accountSyncFrequency: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { processCancel, formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  const options = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];

  const handleSyncFrequency = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    setInitFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));

    const updatedSyncFrequency = accountSyncFrequency?.split(" ");
    switch (name) {
      case "minute":
        if (trimmedValue !== "*" && !/^\d*$/.test(trimmedValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            minute: "Minute must contain only digits or '*'",
          }));
        } else if (trimmedValue.length > 100) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            minute: "Please Enter Minute between 100 character",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            minute: "",
          }));
        }
        updatedSyncFrequency[0] = trimmedValue;
        break;

      case "hour":
        if (trimmedValue !== "*" && !/^\d*$/.test(trimmedValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            hour: "Hour must contain only digits or '*'",
          }));
        } else if (trimmedValue.length > 100) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            hour: "Please Enter Hour between 100 character",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            hour: "",
          }));
        }
        updatedSyncFrequency[1] = trimmedValue;
        break;
      case "day":
        if (trimmedValue !== "*" && !/^\d*$/.test(trimmedValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            day: "Day(Month) must contain only digits or '*'",
          }));
        } else if (trimmedValue.length > 100) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            day: "Please Enter Day between 100 character",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            day: "",
          }));
        }
        updatedSyncFrequency[2] = trimmedValue;
        break;
      case "month":
        if (trimmedValue !== "*" && !/^\d*$/.test(trimmedValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            month: "Month must contain only digits or '*'",
          }));
        } else if (trimmedValue.length > 100) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            month: "Please Enter Month between 100 character",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            month: "",
          }));
        }
        updatedSyncFrequency[3] = trimmedValue;
        break;
      case "week":
        if (trimmedValue !== "*" && !/^\d*$/.test(trimmedValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            week: "Day(Week) must contain only digits or '*'",
          }));
        } else if (trimmedValue.length > 100) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            week: "Please Enter Day(Week) between 100 character",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            week: "",
          }));
        }
        updatedSyncFrequency[4] = trimmedValue;
        break;
      default:
        break;
    }

    setAccountSyncFrequency(updatedSyncFrequency.join(" "));
  };

  const handleChange = (key, val) => {
    const formData = new FormData(document.forms.sftpftpForm);
    formData.set(key, val);
    const errors = validateSftpFtp(formData);
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

  const handleProtocolChange = (selectedOption) => {
    const protocol = selectedOption.value;
    setInitFormData({ ...initFormData, protocol });
    handleChange("protocol", protocol);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateSftpFtp(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {

      const accountSyncFrequency = `${formData.get("minute")} ${formData.get(
        "hour"
      )} ${formData.get("day")} ${formData.get("month")} ${formData.get(
        "week"
      )}`;

      const payload = {
        ...initFormData,
        accountSyncFrequency
      };

      console.log("payload--", payload);
    }
  };

  return (
    <div>
      <form name="sftpftpForm" onSubmit={handleSubmit}>
        <div>
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
          <div className="col mt-3 mt-sm-0">
            <div>
              <label style={{ color: "#49c5b6" }}>
                Selected Account: {marketPlaceSettingName}
              </label>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Host Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="hostName"
                    onChange={handleInputChange}
                    placeholder="Enter Host Name"
                    defaultValue={
                      initFormData && initFormData.hostName ? initFormData.hostName : ""
                    }
                  />
                  {formErrors.hostName && (
                    <span className="text-danger">{formErrors.hostName}</span>
                  )}
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label>
                    User Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="userName"
                    onChange={handleInputChange}
                    placeholder="Enter User Name"
                    defaultValue={
                      initFormData && initFormData.userName ? initFormData.userName : ""
                    }
                  />
                  {formErrors.userName && (
                    <span className="text-danger">{formErrors.userName}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>
                    Password <span style={{ color: "red" }}>*</span>
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

              <div className="col-sm-6">
                <div className="form-group">
                  <label>
                    Port <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="port"
                    placeholder="Enter Port"
                    onChange={handleInputChange}
                    defaultValue={
                      initFormData && initFormData.port ? initFormData.port : ""
                    }
                  />
                  {formErrors.port && (
                    <span className="text-danger">{formErrors.port}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>
                    Protocol <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    placeholder="Select Protocol"
                    name="protocol"
                    options={options}
                    onChange={handleProtocolChange}
                    value={options.find(
                      (option) => option.value === initFormData.protocol
                    )}
                  />
                  {formErrors.protocol && (
                    <span className="text-danger">{formErrors.protocol}</span>
                  )}
                </div>
              </div>

              <div className="col-12">
                <label>
                  Sync Frequency <span style={{ color: "red" }}>*</span>
                </label>
                <div className="row">
                  <div className="col-sm-4 col-lg-2">
                    <div className="form-group">
                      <input
                        className="form-control placeholder-color"
                        type="text"
                        placeholder="*"
                        name="minute"
                        value={accountSyncFrequency.split(" ")[0] || ""}
                        onChange={handleSyncFrequency}
                      />
                      <label>
                        Minute <span style={{ color: "red" }}>*</span>
                      </label>
                      {formErrors.minute && (
                        <p className="text-danger mt-n2">{formErrors.minute}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 col-lg-2">
                    <div className="form-group">
                      <input
                        className="form-control placeholder-color"
                        type="text"
                        placeholder="*"
                        name="hour"
                        value={accountSyncFrequency.split(" ")[1] || ""}
                        onChange={handleSyncFrequency}
                      />
                      <label>
                        Hour <span style={{ color: "red" }}>*</span>
                      </label>
                      {formErrors.hour && (
                        <p className="text-danger mt-n2">{formErrors.hour}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 col-lg-2">
                    <div className="form-group">
                      <input
                        className="form-control placeholder-color"
                        type="text"
                        placeholder="*"
                        name="day"
                        value={accountSyncFrequency.split(" ")[2] || ""}
                        onChange={handleSyncFrequency}
                      />
                      <label>
                        Day(Month) <span style={{ color: "red" }}>*</span>
                      </label>
                      {formErrors.day && (
                        <p className="text-danger mt-n2">{formErrors.day}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 col-lg-3">
                    <div className="form-group">
                      <input
                        className="form-control placeholder-color"
                        type="text"
                        placeholder="*"
                        name="month"
                        value={accountSyncFrequency.split(" ")[3] || ""}
                        onChange={handleSyncFrequency}
                      />
                      <label>
                        Month <span style={{ color: "red" }}>*</span>
                      </label>
                      {formErrors.month && (
                        <p className="text-danger mt-n2">{formErrors.month}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 col-lg-3">
                    <div className="form-group">
                      <input
                        className="form-control placeholder-color"
                        type="text"
                        placeholder="*"
                        name="week"
                        value={accountSyncFrequency.split(" ")[4] || ""}
                        onChange={handleSyncFrequency}
                      />
                      <label>
                        Day(Week) <span style={{ color: "red" }}>*</span>
                      </label>
                      {formErrors.week && (
                        <p className="text-danger mt-n2">{formErrors.week}</p>
                      )}
                    </div>
                  </div>
                </div>
                <small
                  className="form-text text-muted csv-text"
                  style={{
                    marginTop: "-20px",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  Learn more about Cronjob. &nbsp;{" "}
                  <a
                    href="https://crontab.guru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="csv-text"
                    style={{ position: "relative", zIndex: "2" }}
                  >
                    https://crontab.guru
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CsvConfigurationSftp;
