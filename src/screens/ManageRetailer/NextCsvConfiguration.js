import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./ManageRetailerSetting";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { API_PATH } from "../ApiPath/Apipath";
import { validateSftpFtp } from "../Validations/Validation";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";
import "./Retailer.css";

function NextCsvConfiguration(props) {
  const { processCancel, formData, setFormData } = useContext(FormContext);
  const dropdownOptions = [{ value: "SFTP", label: "SFTP / FTP" }];
  const [initFormData, setInitFormData] = useState({
    hostName: "",
    ftpUserName: "",
    password: "",
    port: "",
    urlPath: "",
    protocol: "",
    orderHostName: "",
    orderPassword: "",
    orderPort: "",
    orderProtocol: "",
    orderUrlPath: "",
    orderFtpUserName: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [formLoader, setFormLoader] = useState(false);

  const history = useHistory();
  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];

  // useEffect(() => {
  //   if (formData) {
  //     setInitFormData(formData);
  //   }
  // }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  useEffect(() => {
    getAccountConfigurationData();
  }, []);

  const handleChange = (key, val) => {
    const formData = new FormData(document.forms.sftpftpForm);
    formData.set(key, val);
    const errors = validateSftpFtp(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = type === "text" ? value.trim() : value;

    setInitFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
    handleChange(name, value);
  };

  const handleProtocolChange = (selectedOption) => {
    const protocol = selectedOption.value;
    setInitFormData({ ...initFormData, protocol });
    handleChange("protocol", protocol);
  };
  const orderProtocolChange = (selectedOption) => {
    const orderProtocol = selectedOption.value;
    setInitFormData({ ...initFormData, orderProtocol });
    handleChange("orderProtocol", orderProtocol);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validateSftpFtp(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );
      const marketPlaceSettingId = localStorage.getItem("marketPlaceSettingId");

      const payload = {
        id: retailerIntegrationId,
        marketPlaceId: marketPlaceSettingId,
        ...initFormData,
        settingType: "SFTP",
        orderSettingType: "SFTP",
      };
      console.log("payload0-----", payload);
      setIsLoading(true);
      axios
        .post(`${API_PATH.CREATE_NEXT_CSV_CONFIGURATION}`, payload)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            localStorage.removeItem("supplierSettingId");
            localStorage.removeItem("selectedSupplierName");
            localStorage.removeItem("retailerIntegrationId");
            localStorage.removeItem("marketPlaceSettingId");
            localStorage.removeItem("marketPlaceSettingName");
            localStorage.removeItem("currentPage");
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
  };

  const getAccountConfigurationData = () => {
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
    };

    setFormLoader(true);

    axios
      .post(`${API_PATH.GET_ACCOUNT}`, payload)
      .then((response) => {
        const { success, data } = response.data;
        if (success && data.length > 0) {
          const retailerIntegration = data[0];
          setInitFormData({
            hostName: retailerIntegration.hostName,
            ftpUserName: retailerIntegration.ftpUserName,
            port: retailerIntegration.port,
            password: retailerIntegration.password,
            urlPath: retailerIntegration.urlPath,
            protocol: retailerIntegration.protocol,
            orderHostName: retailerIntegration.orderHostName,
            orderFtpUserName: retailerIntegration.orderFtpUserName,
            orderPort: retailerIntegration.orderPort,
            orderPassword: retailerIntegration.orderPassword,
            orderUrlPath: retailerIntegration.orderUrlPath,
            orderProtocol: retailerIntegration.orderProtocol,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setFormLoader(false);
      });
  };
  return (
    <>
      {/* Product Sync Setting*/}
      <form onSubmit={handleSubmit} name="sftpftpForm">
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

        {formLoader && (
          <div className="loader-wrapper">
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        )}

        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Product Sync Setting</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="custom-padding-card">
                <div style={{ marginTop: "30px" }}>
                  <div className="row mt-1">
                    <div className="col-12">
                      <label htmlFor="combo-box-demo">
                        Type of Integration
                      </label>
                      <Select
                        defaultValue={selectedOption}
                        value={selectedOption}
                        options={dropdownOptions}
                        name="type"
                      />
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-6">
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
                          defaultValue={
                            initFormData && initFormData.hostName
                              ? initFormData.hostName
                              : ""
                          }
                        />
                        {formErrors.hostName && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.hostName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          User Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="ftpUserName"
                          placeholder="Enter User Name"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.ftpUserName
                              ? initFormData.ftpUserName
                              : ""
                          }
                        />
                        {formErrors && formErrors.ftpUserName && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.ftpUserName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
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
                          defaultValue={
                            initFormData && initFormData.password
                              ? initFormData.password
                              : ""
                          }
                        />
                        {formErrors.password && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.password}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Port <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          name="port"
                          placeholder="Enter Port"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.port
                              ? initFormData.port
                              : ""
                          }
                        />
                        {formErrors.port && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.port}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
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
                            (option) => option.value === initFormData.protocol
                          )}
                          menuPlacement="top"
                        />
                        {formErrors.protocol && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.protocol}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-6">
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
                          defaultValue={
                            initFormData && initFormData.urlPath
                              ? initFormData.urlPath
                              : ""
                          }
                        />
                        {formErrors.urlPath && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.urlPath}
                          </span>
                        )}
                        <small className="form-text text-muted csv-text">
                          Please Enter Full Name With File. &nbsp;&nbsp;&nbsp;
                          Ex: /var/www/html/abc.csv
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* Order Sync Setting*/}
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Order Sync Setting</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="custom-padding-card">
                <div style={{ marginTop: "30px" }}>
                  <div className="row mt-1">
                    <div className="col-12">
                      <label htmlFor="combo-box-demo">
                        Type of Integration
                      </label>
                      <Select
                        defaultValue={selectedOption}
                        value={selectedOption}
                        options={dropdownOptions}
                        name="type"
                      />
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-6">
                      <div className="form-group">
                        <label>
                          Host Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="orderHostName"
                          placeholder="Enter Host Name"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.orderHostName
                              ? initFormData.orderHostName
                              : ""
                          }
                        />
                        {formErrors.orderHostName && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderHostName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          User Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="orderFtpUserName"
                          placeholder="Enter User Name"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.orderFtpUserName
                              ? initFormData.orderFtpUserName
                              : ""
                          }
                        />
                        {formErrors && formErrors.orderFtpUserName && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderFtpUserName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="orderPassword"
                          placeholder="Enter orderPassword"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.orderPassword
                              ? initFormData.orderPassword
                              : ""
                          }
                        />
                        {formErrors.orderPassword && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderPassword}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Port <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          name="orderPort"
                          placeholder="Enter orderPort"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.orderPort
                              ? initFormData.orderPort
                              : ""
                          }
                        />
                        {formErrors.orderPort && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderPort}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Protocol <span style={{ color: "red" }}>*</span>
                        </label>
                        <Select
                          placeholder="Select Protocol"
                          name="orderProtocol"
                          options={option}
                          onChange={orderProtocolChange}
                          value={option.find(
                            (option) =>
                              option.value === initFormData.orderProtocol
                          )}
                          menuPlacement="top"
                        />
                        {formErrors.orderProtocol && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderProtocol}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label>
                          URL/Path <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter URL"
                          name="orderUrlPath"
                          onChange={handleInputChange}
                          defaultValue={
                            initFormData && initFormData.orderUrlPath
                              ? initFormData.orderUrlPath
                              : ""
                          }
                        />
                        {formErrors.orderUrlPath && (
                          <span className="text-danger next-csv-setting">
                            {formErrors.orderUrlPath}
                          </span>
                        )}
                        <small className="form-text text-muted csv-text">
                          Please Enter Full Name With File. &nbsp;&nbsp;&nbsp;
                          Ex: /var/www/html/abc.csv
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </form>
    </>
  );
}

export default NextCsvConfiguration;
