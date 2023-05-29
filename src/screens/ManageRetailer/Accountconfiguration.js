import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageRetailerSetting";
import { validateRetailerAccount } from "../Validations/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { API_PATH } from "../ApiPath/Apipath";


function Accountconfiguration(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const { processCancel, formData, setFormData } = useContext(FormContext);

  const [initFormData, setInitFormData] = useState({
    storeName: "",
    endpointURL: "",
    authorizationToken: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const history=useHistory()

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

  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName")

  const handleChange = (key, value) => {
    const formData = new FormData(document.forms.accountForm);
    formData.set(key, value);
    const errors = validateRetailerAccount(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    setInitFormData(prevState => ({
      ...prevState,
      [name]: trimmedValue,
    }));
    handleChange(name, value);
  };

  const getAccountConfigurationData = () => {
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
    };

    axios
      .post(
        `${API_PATH.GET_ACCOUNT}`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateRetailerAccount(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(initFormData)
      setIsLoading(true);

      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
      const marketPlaceSettingId = localStorage.getItem("marketPlaceSettingId");

      const payload = {
        id: retailerIntegrationId,
        marketPlaceId: marketPlaceSettingId,
        storeName: initFormData.storeName,
        endpointURL: initFormData.endpointURL,
        authorizationToken: initFormData.authorizationToken,
      };

      console.log("payload", payload);
      axios
        .post(
          `${API_PATH.CREAT_ACCOUNT_CONFIGURATION}`,
          payload
        )
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            setIsLoading(false)
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
    }
  }

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
                  onChange={handleInputChange}
                  placeholder="Enter Channel"
                  defaultValue={initFormData && initFormData.storeName ? initFormData.storeName : ""}
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
                  onChange={handleInputChange}
                  placeholder="Enter API Endpoint"
                  defaultValue={initFormData && initFormData.endpointURL ? initFormData.endpointURL : ""}
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
                  onChange={handleInputChange}
                  placeholder="Enter token"
                  defaultValue={initFormData && initFormData.authorizationToken ? initFormData.authorizationToken : ""}
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