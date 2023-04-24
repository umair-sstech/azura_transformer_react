import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./SupplierPage.css";
import timeZoneData from "../../Data/timeZone";
import axios from "axios";
import Swal from "sweetalert2";
import { validateSftpForm } from "../Validations/Validation";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageSuppiler";
import { API_PATH } from "../ApiPath/Apipath";

function SupplierSftpForm(props) {
  const { setPage } = props;
  const { isSuppilerAdded,processCancel } = useContext(FormContext);

  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    settingType: "",
    password: "",
    hostName: "",
    userName: "",
    password: "",
    port: "",
    protocol: "",
    urlPath: "",
    syncFrequency: "",
    timeZone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();
  const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);

  useEffect(() => {
    getCronTimeData();
  }, []);

  const getCronTimeData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL_SUPPLIER}/general/getCronTime`)
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleProtocolChange = (selectedOption) => {
    setFormData({ ...formData, protocol: selectedOption.value });
    setFormErrors({ ...formErrors, protocol: "" });
  };
  const handleSyncFrequency = (selectedOption) => {
    setFormData({ ...formData, syncFrequency: selectedOption.value });
    setFormErrors({ ...formErrors, syncFrequency: "" });
  };
  const handleTimeZoneChange = (selectedOption) => {
    setFormData({ ...formData, timeZone: selectedOption });
    setFormErrors({ ...formErrors, timeZone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateSftpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);

    if (isFormValid) {
      const supplierId = localStorage.getItem("supplierId");
      const supplierName = localStorage.getItem("supplierName");

      const { value, label } = formData.timeZone;

      const timeZoneString = `${value} (${label})`;

      const payload = {
        ...formData,
        timeZone: timeZoneString,
        supplierId,
        supplierName,
      };
      axios
        .post(
          `${API_PATH.IMPORT_SETTING}`,
          payload
        )
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

    const errors = validateSftpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    if (Object.keys(errors).length === 0) {
      if (isFormValid) {
        const supplierId = localStorage.getItem("supplierId");
        const supplierName = localStorage.getItem("supplierName");
        const payload = { ...formData, supplierId, supplierName };
        axios
          .post(
            `${API_PATH.IMPORT_SETTING}`,
            payload
          )
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
    }
  };

  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "35px" }}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 button-class">
              <div className="d-flex">
                <button
                  className="btn btn-primary w-auto btn-lg mr-2"
                  type="submit"
                >
                  Save & Next
                  {/*{props.isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : isSuppilerAdded ? (
                  "Update"
                ) : (
                  "Save & Next"
                )}*/}
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
                  Host Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="hostName"
                  placeholder="Enter Host Name"
                  onChange={handleInputChange}
                  value={formData.hostName}
                />
                {formErrors.hostName && (
                  <span className="text-danger">{formErrors.hostName}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  User Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  placeholder="Enter User Name"
                  onChange={handleInputChange}
                  value={formData.userName}
                />
                {formErrors.userName && (
                  <span className="text-danger">{formErrors.userName}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                {formErrors.password && (
                  <span className="text-danger">{formErrors.password}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  Port <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="port"
                  placeholder="Enter Port"
                  onChange={handleInputChange}
                  value={formData.port}
                />
                {formErrors.port && (
                  <span className="text-danger">{formErrors.port}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  Protocol <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  placeholder="Select Protocol"
                  name="protocol"
                  options={option}
                  onChange={handleProtocolChange}
                  value={option.find(
                    (option) => option.value === formData.protocol
                  )}
                />
                {formErrors.protocol && (
                  <span className="text-danger">{formErrors.protocol}</span>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label>
                  URL/Path <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter URL"
                  name="urlPath"
                  onChange={handleInputChange}
                  value={formData.urlPath}
                />
                {formErrors.urlPath && (
                  <span className="text-danger">{formErrors.urlPath}</span>
                )}
                <small className="form-text text-muted csv-text">
                  Please Enter.
                </small>
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
                />
                {formErrors.syncFrequency && (
                  <span className="text-danger">
                    {formErrors.syncFrequency}
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
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SupplierSftpForm);
