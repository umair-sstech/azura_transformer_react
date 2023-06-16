import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";

function CsvConfigurationSftp() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName");

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };
  const options = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];
  return (
    <div>
      <form name="accountForm">
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

              <button className="btn btn-secondary w-auto btn-lg" type="button">
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="col-row mt-3 mt-sm-0">
          <div>
            <label style={{ color: "#49c5b6" }}>
              Selected Account: {marketPlaceSettingName}
            </label>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>
                  Host Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="bucketName"
                  onChange={handleInputChange}
                  placeholder="Enter Channel"
                />
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
                  name="secretKey"
                  onChange={handleInputChange}
                  placeholder="Enter API Endpoint"
                />
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
                  name="secretKey"
                  onChange={handleInputChange}
                  placeholder="Enter API Endpoint"
                />
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
                />
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
                  options={options}
                />
              </div>
            </div>
            <div className="col-12">
              <label>
                Sync Frequency <span style={{ color: "red" }}>*</span>
              </label>
              <div className="row">
                <div className="col-sm-4 col-lg-2">
                  <div className="form-group">
                    <input
                      className="form-control placeholder-color"
                      type="text"
                      placeholder="*"
                      name="minute"
                    />
                    <label>
                      Minute <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-2">
                  <div className="form-group">
                    <input
                      className="form-control placeholder-color"
                      type="text"
                      placeholder="*"
                      name="hour"
                    />
                    <label>
                      Hour <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-2">
                  <div className="form-group">
                    <input
                      className="form-control placeholder-color"
                      type="text"
                      placeholder="*"
                      name="day"
                    />
                    <label>
                      Day(Month) <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-3">
                  <div className="form-group">
                    <input
                      className="form-control placeholder-color"
                      type="text"
                      placeholder="*"
                      name="month"
                    />
                    <label>
                      Month <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-3">
                  <div className="form-group">
                    <input
                      className="form-control placeholder-color"
                      type="text"
                      placeholder="*"
                      name="week"
                    />
                    <label>
                      Day(Week) <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
              </div>
              <small
                className="form-text text-muted csv-text"
                style={{
                  marginTop: "-20px",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                Learn more about Cronjob. &nbsp;{" "}
                <a
                  href="https://crontab.guru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csv-text"
                  style={{ position: "relative", zIndex: "2" }}
                >
                  https://crontab.guru
                </a>
              </small>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CsvConfigurationSftp;
