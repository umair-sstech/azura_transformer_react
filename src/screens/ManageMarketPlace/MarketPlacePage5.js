import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageMarketPlace";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MarketPlacePage5(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);

  const [formData, setFormData] = useState({
    trackingSyncFrequency: "",
    trackingTimeZone: "",
    type: "tracking",
  });
  const [formErrors, setFormErrors] = useState({});
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const history=useHistory()

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
          console.log("item", options);
          setSyncFrequencyOptions(options);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSyncFrequency = (selectedOption) => {
    setFormData({ ...formData, trackingSyncFrequency: selectedOption.value });
    setFormErrors({ ...formErrors, trackingSyncFrequency: "" });
  };

  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, trackingTimeZone: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true); // set the submitting state to true
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");
  
    const { value, label } = formData.trackingTimeZone;
    const timeZoneString = `${value} (${label})`;
    const payload = {
      ...formData,
      trackingTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    axios
      .post(
        `${API_PATH.MARKET_PLACE_SYNCSETTING}`,
        payload
      )
      .then((response) => {
        const { success, message, data } = response.data;
        console.log("response", response);
        if (success) {
          toast.success(message);
          setFormData({});
          setPage(6);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false); // set the submitting state to false after the request is complete
      });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setSubmitting(true); // set the submitting state to true
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");
  
    const { value, label } = formData.trackingTimeZone;
    const timeZoneString = `${value} (${label})`;
    const payload = {
      ...formData,
      trackingTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    axios
      .post(
        `${API_PATH.MARKET_PLACE_SYNCSETTING}`,
        payload
      )
      .then((response) => {
        const { success, message, data } = response.data;
        console.log("response", response);
        if (success) {
          toast.success(message);
          setFormData({});
          history.push("/market-place")
          localStorage.removeItem("marketPlaceId")
          localStorage.removeItem("marketPLaceName")
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false); 
      });
  };

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
              {/*{isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                ""
              )}*/}
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
                type="button"
                onClick={processCancel}
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
                Sync Frequency <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                placeholder="Select Frequency"
                options={syncFrequencyOptions}
                onChange={handleSyncFrequency}
              />
              {formErrors.syncFrequency && (
                <span className="text-danger">{formErrors.syncFrequency}</span>
              )}
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
                value={formData.timeZone}
                onChange={handleTimeZoneChange}
              />
              {formErrors.timeZone && (
                <span className="text-danger">{formErrors.timeZone}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MarketPlacePage5;
