import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageMarketPlace";
import { useHistory } from "react-router-dom";
import { validateMarketPlaceOrderSync } from "../Validations/Validation";
import { Spinner } from "react-bootstrap";

function MarketPlacePage4(props) {
  const { setPage } = props;
  const { processCancel, formData, setFormData } = useContext(FormContext);

  const [initFormData, setInitFormData] = useState({
    orderSyncFrequency: "",
    orderTimeZone: "",
    type: "order",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [orderSyncFrequency, setOrderSyncFrequency] = useState("");

  const history = useHistory();

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

    setInitFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));

    const updatedSyncFrequency = orderSyncFrequency.split(" ");
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

    setOrderSyncFrequency(updatedSyncFrequency.join(" "));
  };

  const handleChange = (key, value) => {
    const formData = new FormData(document.forms.marketPlace4);
    formData.set(key, value);
    const errors = validateMarketPlaceOrderSync(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleTimeZoneChange = (selectedOption) => {
    const orderTimeZone = selectedOption;
    setInitFormData({ ...initFormData, orderTimeZone });
    handleChange("orderTimeZone", orderTimeZone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateMarketPlaceOrderSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const integrationId = localStorage.getItem("marketPlaceId");
      const integrationName = localStorage.getItem("marketPlaceName");

      const { value, label } = initFormData.orderTimeZone;

      const orderSyncFrequency = `${formData.get("minute")} ${formData.get(
        "hour"
      )} ${formData.get("day")} ${formData.get("month")} ${formData.get(
        "week"
      )}`;

      const timeZoneString = `${value}`;

      const payload = {
        ...initFormData,
        orderSyncFrequency,
        orderTimeZone: timeZoneString,
        integrationId,
        integrationName,
      };
      setIsLoading(true);
      axios
        .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
            setFormData({});
            setPage(5);
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
    const errors = validateMarketPlaceOrderSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const integrationId = localStorage.getItem("marketPlaceId");
      const integrationName = localStorage.getItem("marketPlaceName");

      const { value, label } = initFormData.orderTimeZone;

      const timeZoneString = `${value}`;

      const orderSyncFrequency = `${formData.get("minute")} ${formData.get(
        "hour"
      )} ${formData.get("day")} ${formData.get("month")} ${formData.get(
        "week"
      )}`;

      const payload = {
        ...initFormData,
        orderSyncFrequency,
        orderTimeZone: timeZoneString,
        integrationId,
        integrationName,
      };
      setIsLoadingExit(true);
      axios
        .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
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
          setIsLoadingExit(false);
        });
    }
  };

  const getProductData = () => {
    const integrationId = localStorage.getItem("marketPlaceId");

    axios
      .get(`${API_PATH.GET_SYNC_SETTING}?integrationId=${integrationId}`)
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          let orderTimeZone = timeZoneData.find(
            (tz) => tz.abbr == data.orderTimeZone
          );
          setFormData({
            orderTimeZone: {
              value: orderTimeZone.abbr,
              label: orderTimeZone.text,
            },
            type: "order",
          });
          const { orderSyncFrequency } = data;
          setOrderSyncFrequency(orderSyncFrequency);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <form onSubmit={handleSubmit} name="marketPlace4">
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
                type="button"
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
        <div className="row mt-3 mt-sm-0">
          <div className="col-12">
            <label>
              Sync Frequency <span style={{ color: "red" }}>*</span>
            </label>
            <div className="row">
              <div className="col-sm-4 col-lg-2">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="*"
                    name="minute"
                    value={orderSyncFrequency?.split(" ")[0] || ""}
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
                    className="form-control"
                    type="text"
                    placeholder="*"
                    name="hour"
                    value={orderSyncFrequency?.split(" ")[1] || ""}
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
                    className="form-control"
                    type="text"
                    placeholder="*"
                    name="day"
                    value={orderSyncFrequency?.split(" ")[2] || ""}
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
                    className="form-control"
                    type="text"
                    placeholder="*"
                    name="month"
                    value={orderSyncFrequency?.split(" ")[3] || ""}
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
                    className="form-control"
                    type="text"
                    placeholder="*"
                    name="week"
                    value={orderSyncFrequency?.split(" ")[4] || ""}
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
              <small className="form-text text-muted csv-text px-3" style={{marginTop: "-20px", position: "relative", zIndex: "1"}}>
                Learn more about Cronjob: &nbsp;{" "}
                <a
                  href="https://crontab.guru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csv-text"
                  style={{position: "relative", zIndex: "2"}}
                >
                  https://crontab.guru
                </a>
              </small>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="form-group">
              <label>
                TimeZone <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                options={timeZoneData?.map((data) => {
                  return {
                    value: data.abbr,
                    label: data.text,
                  };
                })}
                placeholder="Select TimeZone"
                value={initFormData.orderTimeZone ? initFormData.orderTimeZone : ""}
                onChange={handleTimeZoneChange}
                name="orderTimeZone"
              />
              {formErrors.orderTimeZone && (
                <span className="text-danger">{formErrors.orderTimeZone}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MarketPlacePage4;
