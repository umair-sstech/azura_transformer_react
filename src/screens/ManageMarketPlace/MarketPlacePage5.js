import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageMarketPlace";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { validateMarketPlaceTrackingSync } from "../Validations/Validation";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
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

  const handleSyncFrequency = (selectedOption) => {
    setFormData({ ...formData, trackingSyncFrequency: selectedOption.value });
    setFormErrors({ ...formErrors, trackingSyncFrequency: "" });
  };

  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, trackingTimeZone: selectedOption });
    setFormErrors({ ...formErrors, trackingTimeZone: "" });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceTrackingSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");

    const { value, label } = formData.trackingTimeZone;
    const timeZoneString = `${value}`;
    const payload = {
      ...formData,
      trackingTimeZone: timeZoneString,
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
          setPage(6);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };
}

  const handleOnClick = (e) => {
    e.preventDefault();
    const errors = validateMarketPlaceTrackingSync(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");

    const { value, label } = formData.trackingTimeZone;
    const timeZoneString = `${value}`;
    const payload = {
      ...formData,
      trackingTimeZone: timeZoneString,
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
      })
      .finally(() => {
       setIsLoadingExit(false)
      });
  };
}
  const getProductData = () => {
    const integrationId = localStorage.getItem("marketPlaceId");

    axios
      .get(
        `http://localhost:8001/integration/getMarketplaceIntegratorSyncSetting?integrationId=${integrationId}`
      )
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          let trackingTimeZone = timeZoneData.find(
            (tz) => tz.abbr == data.trackingTimeZone
          );
          setFormData({
            trackingSyncFrequency: data.trackingSyncFrequency,
            trackingTimeZone: {
              value: trackingTimeZone.abbr,
              label: trackingTimeZone.text,
            },
            type: "tracking",
          });
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
      <div style={{ marginTop: "20px" }}>
        <div className="row fixed-marketplace-btn-grp">
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
            <div className="form-group">
              <label>
                Sync Frequency <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                placeholder="Select Frequency"
                options={syncFrequencyOptions}
                onChange={handleSyncFrequency}
                value={syncFrequencyOptions.find(
                  (option) => option.value === formData.trackingSyncFrequency
                )}
              />
              {formErrors.trackingSyncFrequency && (
                <span className="text-danger">{formErrors.trackingSyncFrequency}</span>
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
                value={
                  formData.trackingTimeZone ? formData.trackingTimeZone : ""
                }
                onChange={handleTimeZoneChange}
              />
              {formErrors.trackingTimeZone && (
                <span className="text-danger">{formErrors.trackingTimeZone}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MarketPlacePage5;
