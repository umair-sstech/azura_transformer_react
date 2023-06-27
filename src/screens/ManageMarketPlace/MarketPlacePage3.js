import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageMarketPlace";
import { useHistory } from "react-router-dom";
import { validateMarketPlaceProductSync } from "../Validations/Validation";
import { Spinner } from "react-bootstrap";

function MarketPlacePage3(props) {
  const { setPage } = props;
  const { processCancel, formData, setFormData } = useContext(FormContext);

  const history = useHistory();

  const dropdownOptions = [
    { value: "SFTP", label: "SFTP / FTP" }
  ];

  const [initFormData, setInitFormData] = useState({
    supplierId: "",
    supplierName: "",
    settingType: "",
    password: "",
    hostName: "",
    userName: "",
    port: "",
    protocol: "",
    urlPath: "",
    syncFrequency: "",
    // productTimeZone: "",
    // type: "product",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState("");
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);


  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

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
  
    const updatedSyncFrequency = syncFrequency.split(" ");
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
  
    setSyncFrequency(updatedSyncFrequency.join(" "));
  };
  const handleChange = (key, value) => {
    const formData = new FormData(document.forms.form);
    formData.set(key, value);
    // const errors = validateMarketPlaceProductSync(formData);
    // setFormErrors(errors);
    // setIsFormValid(Object.keys(errors).length === 0);
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
    // setFormErrors({ ...formErrors, protocol: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // const errors = validateMarketPlaceProductSync(formData);
    // setFormErrors(errors);

    // if (Object.keys(errors).length === 0) {
      const supplierId = localStorage.getItem("marketPlaceId");
      const supplierName = localStorage.getItem("marketPlaceName");

      const syncFrequencyValues = ["minute", "hour", "day", "month", "week"].map((name) => {
        const value = formData.get(name);
        const formattedValue = /^[1-9]$/.test(value) ? `0${value}` : value;
        return formattedValue;
      });
      const syncFrequency = syncFrequencyValues.join(" ");

      const payload = {
        ...initFormData,
        syncFrequency,
        settingType:"SFTP",
        supplierId,
        supplierName,
      };
      console.log("payload",payload)
      setIsLoading(true);
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
            setFormData({});
            setPage(3);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    // }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const errors = validateMarketPlaceProductSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {

      const supplierId = localStorage.getItem("marketPlaceId");
      const supplierName = localStorage.getItem("marketPlaceName");

      const syncFrequencyValues = ["minute", "hour", "day", "month", "week"].map((name) => {
        const value = formData.get(name);
        const formattedValue = /^[1-9]$/.test(value) ? `0${value}` : value;
        return formattedValue;
      });
      const syncFrequency = syncFrequencyValues.join(" ");

      const payload = {
        ...initFormData,
        syncFrequency,
        settingType:"SFTP",
        supplierId,
        supplierName,
      };
      setIsLoadingExit(true);
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
            setFormData({});
            history.push("/market-place");
            localStorage.removeItem("marketPlaceId");
            localStorage.removeItem("marketPLaceName");
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoadingExit(false));
    }
  };

  // const getProductData = () => {
  //   const integrationId = localStorage.getItem("marketPlaceId");

  //   axios
  //     .get(`${API_PATH.GET_SYNC_SETTING}?integrationId=${integrationId}`)
  //     .then((response) => {
  //       const { success, message, data } = response.data;
  //       if (success) {
  //         let productTimeZone = timeZoneData.find(
  //           (tz) => tz.abbr == data.productTimeZone
  //         );
  //         setFormData({
  //           // productTimeZone: {
  //           //   value: productTimeZone.abbr,
  //           //   label: productTimeZone.text,
  //           // },
  //           type: "product",
  //         });
  //         const { productSyncFrequency } = data;

  //         setProductSyncFrequency(productSyncFrequency);
  //       } else {
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  const getProductData=(e)=>{
    const supplierId = localStorage.getItem("marketPlaceId");

    if (supplierId) {
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          setFormData({
            ...supplierData,
            protocol: supplierData.protocol,
          });
          const { syncFrequency } = supplierData;
          setSyncFrequency(syncFrequency);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }
  useEffect(() => {
    getProductData();
  }, []);

  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];



  return (
    <form onSubmit={handleSubmit} name="marketPlace3">
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
                  "Save & Next"
                )}
                </button>
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={handleOnClick}
              >
                {isLoadingExit ? (
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
                  name="userName"
                  placeholder="Enter User Name"
                  onChange={handleInputChange}
                  defaultValue={
                    initFormData && initFormData.userName
                      ? initFormData.userName
                      : ""
                  }
                />
                {formErrors && formErrors.userName && (
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
                      value={syncFrequency.split(" ")[0] || ""}
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
                      value={syncFrequency.split(" ")[1] || ""}
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
                      value={syncFrequency.split(" ")[2] || ""}
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
                      value={syncFrequency.split(" ")[3] || ""}
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
                      value={syncFrequency.split(" ")[4] || ""}
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

export default MarketPlacePage3;
