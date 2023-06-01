import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageIntegrator";
import { Spinner } from "react-bootstrap";
import { validateMarketPlaceOrderSync } from "../Validations/Validation";

function IntegratorPage4(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);

  const [formData, setFormData] = useState({
    orderSyncFrequency: "",
    orderTimeZone: "",
    type: "order",
  });

  const [formErrors, setFormErrors] = useState({});
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [orderSyncFrequency,setOrderSyncFrequency]=useState("")


  const history = useHistory();

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

  // const handleSyncFrequency = (selectedOption) => {
  //   setFormData({ ...formData, orderSyncFrequency: selectedOption.value });
  //   setFormErrors({ ...formErrors, orderSyncFrequency: "" });

  // };

  const handleSyncFrequency = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  
    const updatedSyncFrequency = orderSyncFrequency.split(" "); 
    switch (name) {
      case "minute":
        updatedSyncFrequency[0] = trimmedValue;
        break;
      case "hour":
        updatedSyncFrequency[1] = trimmedValue;
        break;
      case "day":
        updatedSyncFrequency[2] = trimmedValue;
        break;
      case "month":
        updatedSyncFrequency[3] = trimmedValue;
        break;
      case "week":
        updatedSyncFrequency[4] = trimmedValue;
        break;
      default:
        break;
    }
    setOrderSyncFrequency(updatedSyncFrequency.join(" "));
  }

  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, orderTimeZone: selectedOption });
    setFormErrors({ ...formErrors, orderTimeZone: "" });
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceOrderSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("integratorId");
    const integrationName = localStorage.getItem("integratorName");

    const { value, label } = formData.orderTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      orderSyncFrequency,
      orderTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    setIsLoading(true)
    axios
      .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setFormData({});
          setPage(4);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false)
      });
  };
  }
  const handleOnClick = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceOrderSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("integratorId");
    const integrationName = localStorage.getItem("integratorName");

    const { value, label } = formData.orderTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      orderSyncFrequency,
      orderTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    setIsLoadingExit(true)
    axios
      .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setFormData({});
          history.push("/integrator");
          localStorage.removeItem("integratorId");
          localStorage.removeItem("integratorName");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingExit(false)
      });
  };
  }

  const getProductData = () => {
    const integrationId = localStorage.getItem("integratorId");

    axios
      .get(
        `${API_PATH.GET_SYNC_SETTING}?integrationId=${integrationId}`
      )
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
    <form onSubmit={handleSubmit}>
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
              "Save & Next"
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
      <label>Sync Frequency <span style={{ color: "red" }}>*</span></label>
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
      </div>
      </div>
      <small className="form-text text-muted csv-text px-3">
              Learn more about Cornjob: &nbsp; <a href="https://crontab.guru/" target="_blank" rel="noopener noreferrer" className="csv-text">
              https://crontab.guru
            </a>
            </small>
      </div>
    
      </div>
        <div className="col-12">
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
                value={formData.orderTimeZone ? formData.orderTimeZone : ""}
                onChange={handleTimeZoneChange}
              />
              {formErrors.orderTimeZone && (
                <span className="text-danger">{formErrors.orderTimeZone}</span>
              )}
          </div>
        </div>
      </div>
    </div>
  </form>
  )
}

export default IntegratorPage4
