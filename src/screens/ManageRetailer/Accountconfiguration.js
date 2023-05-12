import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

function Accountconfiguration() {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);


  return (
    <>
      <form>
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
                  "Save & Next"
                )}
              </button>
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                {isLoadingExit ? (
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
        <div className="col-row">
            <div className="col-6"></div>
            <label style={{ color: "#49c5b6" }}>
              Selected Account: 
            </label>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>
                  Channel/Store <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="channel"
                  placeholder="Enter Channel"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  API Endpoint <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="channel"
                  placeholder="Enter API Endpoint"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  AutoRization Token <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="channel"
                  placeholder="Enter token"
                />
              </div>
            </div>
          </div>
        
      </form>
    </>
  );
}

export default Accountconfiguration;
