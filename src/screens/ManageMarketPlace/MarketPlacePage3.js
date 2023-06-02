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
  const { processCancel } = useContext(FormContext);

  const history = useHistory();

  const [formData, setFormData] = useState({
    productSyncFrequency: "",
    productTimeZone: "",
    type: "product",
  });
  const [formErrors, setFormErrors] = useState({});
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [productSyncFrequency,setProductSyncFrequency]=useState("")


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
  //   setFormData({ ...formData, productSyncFrequency: selectedOption.value });
  //   setFormErrors({ ...formErrors, productSyncFrequency: "" });
  // };

  const handleSyncFrequency = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  
    const updatedSyncFrequency = productSyncFrequency.split(" "); 
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
  
    // Update the syncFrequency state with the modified array
    setProductSyncFrequency(updatedSyncFrequency.join(" "));
  }

  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, productTimeZone: selectedOption });
    setFormErrors({ ...formErrors, productTimeZone: "" });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceProductSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");

    const { value, label } = formData.productTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      productSyncFrequency,
      productTimeZone: timeZoneString,
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
      }).finally(()=>setIsLoading(false))
  };
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceProductSync(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");

    const { value, label } = formData.productTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      productSyncFrequency,
      productTimeZone: timeZoneString,
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
          history.push("/market-place");
          localStorage.removeItem("marketPlaceId");
          localStorage.removeItem("marketPLaceName");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => setIsLoadingExit(false));
  };
  }

  const getProductData = () => {
    const integrationId = localStorage.getItem("marketPlaceId");

    axios
      .get(
        `${API_PATH.GET_SYNC_SETTING}?integrationId=${integrationId}`
      )
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          let productTimeZone = timeZoneData.find(
            (tz) => tz.abbr == data.productTimeZone
          );
          setFormData({
            productTimeZone: {
              value: productTimeZone.abbr,
              label: productTimeZone.text,
            },
            type: "product",
          });
          const { productSyncFrequency } = data;

          setProductSyncFrequency(productSyncFrequency);
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
        <div className="row mt-3 mt-sm-0">
        <div className="col-12">
        <label>Sync Frequency</label>
        <div className="row">
       
        <div className="col-sm-4 col-lg-2">
        <div className="form-group">
         
            <input
              className="form-control"
              type="text"
            placeholder="*"
              name="minute"
              value={productSyncFrequency.split(" ")[0] || ""}
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
              value={productSyncFrequency.split(" ")[1] || ""}
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
              value={productSyncFrequency.split(" ")[2] || ""}

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
              value={productSyncFrequency.split(" ")[3] || ""}

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
              value={productSyncFrequency.split(" ")[4] || ""}

              onChange={handleSyncFrequency}
            />
            <label>
             Day(Week) <span style={{ color: "red" }}>*</span>
            </label>
        </div>
        </div>
        <small className="form-text text-muted csv-text px-3" style={{marginTop: "-20px"}}>
        Learn more: &nbsp; <a href="https://crontab.guru/" target="_blank" rel="noopener noreferrer" className="csv-text">
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
                value={formData.productTimeZone ? formData.productTimeZone : ""}
                onChange={handleTimeZoneChange}
              />
              {formErrors.productTimeZone && (
                <span className="text-danger">{formErrors.productTimeZone}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MarketPlacePage3;
