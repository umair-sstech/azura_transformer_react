import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { validateHttpForm } from "../Validations/Validation";
import axios from "axios";
import Select, { defaultTheme } from "react-select";
import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageSuppiler";

function SupplierHttpForm(props) {
  const { processCancel } = useContext(FormContext);

  const [formData, setFormData] = useState({
    urlPath: "",
    syncFrequency: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getCronTimeData();
    getSupplierDataById();
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
    setFormData({ ...formData, syncFrequency: selectedOption.value });
    setFormErrors({ ...formErrors, syncFrequency: "" });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateHttpForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const supplierId = localStorage.getItem("supplierId");
      const supplierName = localStorage.getItem("supplierName");
      const payload = { ...formData, supplierId, supplierName };
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    const errors = validateHttpForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const supplierId = localStorage.getItem("supplierId");
      const supplierName = localStorage.getItem("supplierName");
      const payload = { ...formData, supplierId, supplierName };
      axios
        .post(`${API_PATH.IMPORT_SETTING}`, payload)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            history.push("/supplier");
            toast.success(message);
            localStorage.removeItem("supplierId");
            localStorage.removeItem("supplierName");
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");

    if (supplierId) {
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          console.log("supplierData",supplierData.urlPath)
          setFormData(supplierData);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <>
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
                  URL/Path <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="urlPath"
                  placeholder="Enter URL"
                  onChange={handleInputChange}
                  defaultValue={
                    formData && formData.urlPath ? formData.urlPath : ""
                  }
                />
                {formErrors.urlPath && (
                  <span className="text-danger">{formErrors.urlPath}</span>
                )}
              </div>
            </div>
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
                    (option) => option.value === formData.syncFrequency
                  )}
                />
                {formErrors.syncFrequency && (
                  <span className="text-danger">
                    {formErrors.syncFrequency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SupplierHttpForm;
