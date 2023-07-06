import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./ManageRetailerSetting";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { API_PATH } from "../ApiPath/Apipath";
import { validateSftpFtp } from "../Validations/Validation";
import Select from "react-select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NextCsvConfiguration(props) {
  const { processCancel, formData, setFormData } = useContext(FormContext);
  const dropdownOptions = [{ value: "SFTP", label: "SFTP / FTP" }];
  const [initFormData, setInitFormData] = useState({
    hostName: "",
    ftpUserName: "",
    password: "",
    port: "",
    urlPath: "",
    protocol: "",
    productSyncFrequency: "",
  });
  console.log("initformData----", initFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [productSyncFrequency, setProductSyncFrequency] = useState("");
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);

  const history = useHistory();
  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];

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

  useEffect(() => {
    getCronTimeData();
  }, []);
  const getCronTimeData = () => {
    try {
      axios
        .get(`${API_PATH.GET_CRON_TIME}`)
        .then((response) => {
          const options = response.data.data.map((item) => ({
            label: item.name,
            value: item.value,
          }));
          setSyncFrequencyOptions(options);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
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
  const handleSyncFrequency = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    let formattedValue = trimmedValue;

    if (/^[1-9]$/.test(trimmedValue)) {
      formattedValue = `0${trimmedValue}`;
    }

    setInitFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));

    let updatedSyncFrequency = productSyncFrequency
      ? productSyncFrequency.split(" ")
      : [];
    let error = "";

    switch (name) {
      case "minute":
        if (
          !/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(trimmedValue) ||
          trimmedValue.length > 100
        ) {
          error = "Minute must contain only digits or '*'";
        }
        updatedSyncFrequency[0] = trimmedValue;
        break;

      case "hour":
        if (
          !/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(trimmedValue) ||
          trimmedValue.length > 100
        ) {
          error = "Hour must contain only digits or '*'";
        }
        updatedSyncFrequency[1] = trimmedValue;
        break;

      case "day":
        if (
          !/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(trimmedValue) ||
          trimmedValue.length > 100
        ) {
          error = "Day(Month) must contain only digits or '*'";
        }
        updatedSyncFrequency[2] = trimmedValue;
        break;

      case "month":
        if (
          !/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(trimmedValue) ||
          trimmedValue.length > 100
        ) {
          error = "Month must contain only digits or '*'";
        }
        updatedSyncFrequency[3] = trimmedValue;
        break;

      case "week":
        if (
          !/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(trimmedValue) ||
          trimmedValue.length > 100
        ) {
          error = "Day(Week) must contain only digits or '*'";
        }
        updatedSyncFrequency[4] = trimmedValue;
        break;

      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setProductSyncFrequency(updatedSyncFrequency.join(" "));
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

      const syncFrequencyValues = [
        "minute",
        "hour",
        "day",
        "month",
        "week",
      ].map((name) => {
        const value = formData.get(name);
        const formattedValue = /^[1-9]$/.test(value) ? `0${value}` : value;
        return formattedValue;
      });

      const productSyncFrequency = syncFrequencyValues.join(" ");

      const payload = {
        id: retailerIntegrationId,
        marketPlaceId: marketPlaceSettingId,
        ...initFormData,
        settingType: "SFTP",
        productSyncFrequency,
      };
      setIsLoading(true);
      axios
        .post(`${API_PATH.CREATE_CSV_CONFIGURATION}`, payload)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            localStorage.removeItem("supplierSettingId");
            localStorage.removeItem("selectedSupplierName");
            localStorage.removeItem("retailerIntegrationId");
            localStorage.removeItem("marketPlaceSettingId");
            localStorage.removeItem("marketPlaceSettingName");
            localStorage.removeItem("currentPage");
            history.push("/setting-retailer-list");
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

  const getAccountConfigurationData = () => {
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
    const marketPlaceSettingId = localStorage.getItem("marketPlaceSettingId");

    const payload = {
      id: retailerIntegrationId,
    };

    axios
      .post(`${API_PATH.GET_ACCOUNT}`, payload)
      .then((response) => {
        const { success, data } = response.data;
        if (success && data.length > 0) {
          const retailerIntegration = data[0];
          console.log("integrationData----", retailerIntegration);

          const { productSyncFrequency } = retailerIntegration;

          setProductSyncFrequency(productSyncFrequency);

          setFormData({
            hostName: retailerIntegration.hostName,
            ftpUserName: retailerIntegration.ftpUserName,
            port: retailerIntegration.port,
            password: retailerIntegration.password,
            urlPath: retailerIntegration.urlPath,
            protocol: retailerIntegration.protocol,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit} name="sftpftpForm">
      <div style={{ marginTop: "30px" }}>
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
        <div className="row mt-1">
          <div className="col-12">
            <label htmlFor="combo-box-demo">Type of Integration</label>
            <Select
              defaultValue={selectedOption}
              value={selectedOption}
              options={dropdownOptions}
              name="type"
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="form-group">
              <label>
                Host Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="hostName"
                placeholder="Enter Host Name"
                onChange={handleInputChange}
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
                name="ftpUserName"
                placeholder="Enter User Name"
                onChange={handleInputChange}
                defaultValue={
                  initFormData && initFormData.ftpUserName
                    ? initFormData.ftpUserName
                    : ""
                }
              />
              {formErrors && formErrors.ftpUserName && (
                <span className="text-danger">{formErrors.ftpUserName}</span>
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
                placeholder="Enter Password"
                onChange={handleInputChange}
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
                options={option}
                onChange={handleProtocolChange}
                value={option.find(
                  (option) => option.value === initFormData.protocol
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
                name="urlPath"
                onChange={handleInputChange}
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
                /var/www/html/abc.csv
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
    </form>
  );
}

export default NextCsvConfiguration;
