import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import timeZoneData from "../../Data/timeZone";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageIntegrator";

function IntegratoePage3(props) {
  const {setPage}=props
  const {
  
    processCancel,
  } = useContext(FormContext);
  
  const [formData, setFormData] = useState({
    productSyncFrequency: "",
    productTimeZone: "",
    type: "product",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);

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
    setFormData({ ...formData, productSyncFrequency: selectedOption.value });
    setFormErrors({ ...formErrors, productSyncFrequency: "" });
  };

  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, productTimeZone: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const integrationId = localStorage.getItem("integratorId");
    const integrationName = localStorage.getItem("integratorName");

    const { value, label } = formData.productTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      productTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    axios
      .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
      .then((response) => {
        const { success, message, data } = response.data;
        console.log("response", response);
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
      });
  };
  
  const handleOnClick = (e) => {
    e.preventDefault();
    const integrationId = localStorage.getItem("integratorId");
    const integrationName = localStorage.getItem("integratorName");

    const { value, label } = formData.productTimeZone;

    const timeZoneString = `${value}`;

    const payload = {
      ...formData,
      productTimeZone: timeZoneString,
      integrationId,
      integrationName,
    };
    axios
      .post(`${API_PATH.MARKET_PLACE_SYNCSETTING}`, payload)
      .then((response) => {
        const { success, message, data } = response.data;
        console.log("response", response);
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
      });
  };

  const getProductData = () => {
    const integrationId = localStorage.getItem("integratorId");

    axios
      .get(
        `http://localhost:8001/integration/getMarketplaceIntegratorSyncSetting?integrationId=${integrationId}`
      )
      .then((response) => {
        const { success, message, data } = response.data;
        console.log("response", data);
        if (success) {
          let productTimeZone = timeZoneData.find(
            (tz) => tz.abbr == data.productTimeZone
          );
          setFormData({
            productSyncFrequency: data.productSyncFrequency,
            productTimeZone: {
              value: productTimeZone.abbr,
              label: productTimeZone.text,
            },
            type: "product",
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
      <div style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
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
                value={syncFrequencyOptions.find(
                  (option) => option.value === formData.productSyncFrequency
                )}
                onChange={handleSyncFrequency}
              />
              {formErrors.productSyncFrequency && (
                <span className="text-danger">
                  {formErrors.productSyncFrequency}
                </span>
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
                value={formData.productTimeZone ? formData.productTimeZone : ""}
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

export default IntegratoePage3
