import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";
import { validateHttpForm } from "../Validations/Validation";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageSuppiler";
import { Spinner } from "react-bootstrap";

function SupplierHttpForm(props) {
  const { onSubmit, settingType } = props;
  const { processCancel, formData, setFormData } = useContext(FormContext);

  const [initFormData, setInitFormData] = useState({
    urlPath: "",
    syncFrequency: "",
    settingType: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState("");
  const [formLoader, setFormLoader] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    getCronTimeData();
    getSupplierDataById();
  }, []);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

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

  // const handleSyncFrequency = (selectedOption) => {
  //   const syncFrequency = selectedOption.value;
  //   setInitFormData({ ...initFormData, syncFrequency: syncFrequency });
  //   // setFormErrors({ ...formErrors, syncFrequency: "" });
  //   const formData = new FormData(document.forms.httpForm);
  //   formData.set("syncFrequency", syncFrequency)
  //   const errors = validateHttpForm(formData);
  //   setFormErrors(errors);
  //   setIsFormValid(Object.keys(errors).length === 0);
  // };

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

    const updatedSyncFrequency = syncFrequency ? syncFrequency.split(" ") : [];
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


  const handleInputChange = (e) => {
    const urlPath = e.target.value.trim();
    setInitFormData((prevState) => ({
      ...prevState,
      urlPath,
    }));
    const formData = new FormData(document.forms.httpForm);
    formData.set("urlPath", urlPath);
    const errors = validateHttpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateHttpForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const supplierId = localStorage.getItem("supplierId");
      const supplierName = localStorage.getItem("supplierName");

      // const syncFrequency = `${formData.get("minute")} ${formData.get("hour")} ${formData.get("day")} ${formData.get("month")} ${formData.get("week")}`;

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

      const syncFrequency = syncFrequencyValues.join(" ");
      const payload = {
        ...initFormData,
        settingType,
        supplierId,
        supplierName,
        syncFrequency,
        password: "",
        hostName: "",
        userName: "",
        port: "",
        protocol: "",
        timeZone: "",
      };
      formData.set("httpData", payload);
      setIsLoading(true);
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            onSubmit();
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

  const handleOnClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const errors = validateHttpForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const supplierId = localStorage.getItem("supplierId");
      const supplierName = localStorage.getItem("supplierName");

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

      const syncFrequency = syncFrequencyValues.join(" ");
      const payload = {
        ...initFormData,
        settingType,
        supplierId,
        supplierName,
        syncFrequency,
      };
      setIsLoadingExit(true);
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            history.push("/supplier");
            toast.success(message);
            localStorage.removeItem("supplierId");
            localStorage.removeItem("supplierName");
            localStorage.removeItem("currentPage");
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoadingExit(false);
        });
    }
  };

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");

    if (supplierId) {
      setFormLoader(true);
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          setFormData({
            ...supplierData,
          });
          const { syncFrequency } = supplierData;

          setSyncFrequency(syncFrequency);
        })
        .catch((error) => {
          console.log("error", error);
        }).finally(() => {
          setFormLoader(false);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} name="httpForm">
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
          {formLoader && (
            <div className="loader-wrapper">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          )}
          <div className="row mt-3 mt-sm-0">
            <div className="col-12">
              <div className="form-group">
                <label>
                  URL/Path <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="urlPath"
                  placeholder="Enter URL"
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
                      value={syncFrequency?.split(" ")[0] || ""}
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
                      value={syncFrequency?.split(" ")[1] || ""}
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
                      value={syncFrequency?.split(" ")[2] || ""}
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
                      value={syncFrequency?.split(" ")[3] || ""}
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
                      value={syncFrequency?.split(" ")[4] || ""}
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
    </>
  );
}

export default SupplierHttpForm;
