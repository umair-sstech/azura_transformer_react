
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageRetailerSetting";
import { validateRetailerAccount } from "../Validations/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


function Accountconfiguration(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const { processCancel} = useContext(FormContext);

  const [formData, setFormData] = useState({
    storeName: "",
    endpointURL: "",
    authorizationToken: "",
  });
  useEffect(() => {
    getAccountConfigurationData();
  }, []);

  const history=useHistory()
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    getAccountConfigurationData();
  }, []);

  const marketPlaceSettingName=localStorage.getItem("marketPlaceSettingName")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
    const marketPlaceSettingId = localStorage.getItem("marketPlaceSettingId");

    const payload = {
      id: retailerIntegrationId,
      marketPlaceId: marketPlaceSettingId,
      storeName: formData.storeName,
      endpointURL: formData.endpointURL,
      authorizationToken: formData.authorizationToken,
    };

    console.log("payload", payload);
    axios
      .post(
        "http://localhost:2703/retailer/createOrUpdateRetailerAccountConfig",
        payload
      )
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          localStorage.removeItem("supplierSettingId");
          localStorage.removeItem("selectedSupplierName");
          localStorage.removeItem("retailerIntegrationId");
          toast.success(message);
          history.push("/setting-retailer-list");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const getAccountConfigurationData = () => {
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
    };

    axios
      .post(
        "http://localhost:2703/retailer/getRetailerIntegrationById",
        payload
      )
      .then((response) => {
        const { success, data } = response.data;
        if (success && data.length > 0) {
          const retailerIntegration = data[0];

          setFormData({
            storeName: retailerIntegration.storeName,
            endpointURL: retailerIntegration.endpointURL,
            authorizationToken: retailerIntegration.authorizationToken,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} name="accountForm">
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
              
              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel}>
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="col-row mt-3 mt-sm-0">
          <div className="col-6">
            <label style={{ color: "#49c5b6" }}>Selected Account:{marketPlaceSettingName}</label>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Channel/Store <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="storeName"
                  onChange={handleChange}
                  placeholder="Enter Channel"
                  defaultValue={formData && formData.storeName ? formData.storeName : ""}
                />
                {formErrors && formErrors.storeName && (
                  <span className="text-danger">{formErrors.storeName}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  API Endpoint <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="endpointURL"
                  onChange={handleChange}
                  placeholder="Enter API Endpoint"
                  defaultValue={formData && formData.endpointURL ? formData.endpointURL : ""}
                />
                {formErrors && formErrors.endpointURL && (
                  <span className="text-danger">{formErrors.endpointURL}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Authorization Token <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="authorizationToken"
                  onChange={handleChange}
                  placeholder="Enter token"
                  defaultValue={formData && formData.authorizationToken ? formData.authorizationToken : ""}
                />
                {formErrors && formErrors.authorizationToken && (
                  <span className="text-danger">{formErrors.authorizationToken}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form >
    </>
  );
}

export default Accountconfiguration;
