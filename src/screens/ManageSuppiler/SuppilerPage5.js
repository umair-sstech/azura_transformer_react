import React, { useState } from "react";
import Select from "react-select";
import "./SupplierPage5.css";

function SupplierPage5() {
  const options = [
    { value: "SFTP", label: "SFTP" },
    { value: "HTTP", label: "HTTP" },
  ];

  const option = [
    { value: "SFTP", label: "SFTP" },
    { value: "FTP", label: "FTP" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
      margin: "8px 16px",
    }),
    menu: (provided) => ({
      ...provided,
      width: 200,
      margin: "8px 16px",
    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const sftpForm = () => {
    if (selectedValue?.value === "SFTP") {
      return (
        <form>
          <div style={{ marginTop: "35px" }}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Host Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter Host Name"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>User Name </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="Enter User Name"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>
                    password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>
                    port <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter port"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>
                    protocol <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select placeholder="Select Protocol" options={option} />
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
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Sync Frequency <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Sync Frequency"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
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
                  >
                    Save & Exit
                  </button>

                  <button
                    className="btn btn-secondary w-auto btn-lg"
                    type="submit"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
    return null;
  };

  const httpForm = () => {
    if (selectedValue?.value === "HTTP") {
      return (
        <form>
          <div style={{ marginTop: "30px" }}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>
                    URL/Path <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter URL"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Sync Frequency <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Sync Frequency"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
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
                  >
                    Save & Exit
                  </button>

                  <button
                    className="btn btn-secondary w-auto btn-lg"
                    type="submit"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
    return null;
  };

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginRight: "32px", width: "200px" }}>
        <label htmlFor="combo-box-demo" style={{ marginBottom: "8px" }}>
          Type
        </label>
        <Select
          options={options}
          styles={customStyles}
          onChange={handleSelectChange}
          className="select-option"
        />
      </div>
      <div>{sftpForm()}</div>
      <div>{httpForm()}</div>
    </div>
    
    </>
  );
}

export default SupplierPage5;
