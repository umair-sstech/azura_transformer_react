import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { FormContext } from "./ManageRetailerSetting";
import { validateSftpFtp } from "../Validations/Validation";
import { API_PATH } from "../ApiPath/Apipath";
import axios from "axios";
import { toast } from "react-toastify";

function CsvConfigurationSftp(props) {
  const { onSubmit, settingType } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [productSyncFrequency, setProductSyncFrequency] = useState("");
  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName");
  const [initFormData, setInitFormData] = useState({
    hostName: "",
    userName: "",
    password: "",
    port: "",
    urlPath: "",
    settingType: "",
    protocol: "",
    productSyncFrequency: "",
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

  useEffect(() => {
    getAccountConfigurationData();
  }, []);

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

    let updatedSyncFrequency = productSyncFrequency?.split(" ");
    if (!updatedSyncFrequency) {
      updatedSyncFrequency = [];
    }
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

    setProductSyncFrequency(updatedSyncFrequency.join(" "));
  };

  const handleChange = (key, val) => {
    const formData = new FormData(document.forms.sftpftpForm);
    formData.set(key, val);
    const errors = validateSftpFtp(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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

  const getAccountConfigurationData = () => {
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
    };

    axios
      .post(`${API_PATH.GET_ACCOUNT}`, payload)
      .then((response) => {
        const { success, data } = response.data;
        if (success && data.length > 0) {
          const retailerIntegration = data[0];
          console.log("retailerIntegrationInfo", retailerIntegration);
          
          const { productSyncFrequency } = retailerIntegration;

          setProductSyncFrequency(productSyncFrequency);

          setFormData({
            hostName: retailerIntegration.hostName,
            userName: retailerIntegration.userName,
            port: retailerIntegration.port,
            password:retailerIntegration.password,
            urlPath: retailerIntegration.urlPath,
            protocol: retailerIntegration.protocol
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateSftpFtp(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );
      const marketPlaceSettingId = localStorage.getItem("marketPlaceSettingId");

      const productSyncFrequency = `${formData.get("minute")} ${formData.get(
        "hour"
      )} ${formData.get("day")} ${formData.get("month")} ${formData.get(
        "week"
      )}`;

      const payload = {
        id: retailerIntegrationId,
        marketPlaceId: marketPlaceSettingId,
        ...initFormData,
        settingType,
        productSyncFrequency,
      };

      console.log("payload--->", payload);
      axios
        .post(`${API_PATH.CREATE_CSV_CONFIGURATION}`, payload)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            onSubmit();
            localStorage.removeItem("supplierId");
            localStorage.removeItem("supplierName");
            localStorage.removeItem("currentPage")
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
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
          <div className="col mt-3 mt-sm-0">
            <div>
              <label style={{ color: "#49c5b6" }}>
                Selected Account: {marketPlaceSettingName}
              </label>
            </div>
            <div className="row">
              <div className="col-sm-6">
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
                      initFormData && initFormData.hostName
                        ? initFormData.hostName
                        : ""
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
                      initFormData && initFormData.userName
                        ? initFormData.userName
                        : ""
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
                    type="text"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    defaultValue={
                      initFormData && initFormData.password
                        ? initFormData.password
                        : ""
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

              <div className="col-sm-6">
                <div className="form-group">
                  <label>
                    URL / Path <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="urlPath"
                    name="urlPath"
                    onChange={handleInputChange}
                    placeholder="Enter URL"
                    defaultValue={
                      initFormData && initFormData.urlPath
                        ? initFormData.urlPath
                        : ""
                    }
                  />
                  {formErrors.urlPath && (
                    <span className="text-danger">{formErrors.urlPath}</span>
                  )}
                  <small className="form-text text-muted csv-text">
                    Please Enter Full Name With File. &nbsp;&nbsp;&nbsp; Ex:
                    /var/www/html/abc.csv <br />
                    The file path must have write permission.
                  </small>
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
                        value={productSyncFrequency?.split(" ")[0] || ""}
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
                        value={productSyncFrequency?.split(" ")[1] || ""}
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
                        value={productSyncFrequency?.split(" ")[2] || ""}
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
                        value={productSyncFrequency?.split(" ")[3] || ""}
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
                        value={productSyncFrequency?.split(" ")[4] || ""}
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
