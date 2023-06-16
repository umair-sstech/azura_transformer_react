import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

function CsvConfiguration() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const marketPlaceSettingName = localStorage.getItem("marketPlaceSettingName");


  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };
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

              <button
                className="btn btn-secondary w-auto btn-lg"
                type="button"
              >
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
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Bucket Name<span style={{ color: "red" }}>*</span>
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
                  Secret Key / User Name <span style={{ color: "red" }}>*</span>
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
                Secret Password / Password <span style={{ color: "red" }}>*</span>
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default CsvConfiguration;
