import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./SupplierPage.css";
import SupplierSftpForm from "./SupplierSftpForm";
import SupplierHttpForm from "./SupplierHttpForm";
function SupplierPage5(props) {
  const { setPage } = props;

  const options = [
    { value: "SFTP", label: "SFTP / FTP" },
    { value: "HTTP", label: "HTTP" },
  ];

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const handleSftpSubmit = () => {
    setPage(6);
  };

  const handleHttpSubmit = () => {
    setPage(6);
  };

  
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginRight: "32px" }} className="select__container">
          <label htmlFor="combo-box-demo" style={{ marginBottom: "8px" }}>
            Type
          </label>
          <Select
            options={options}
            onChange={handleSelectChange}
            className="select-option"
            value={selectedValue}
          />
        </div>
        {selectedValue && selectedValue.value === "SFTP" && (
          <SupplierSftpForm
            onSubmit={handleSftpSubmit}
            settingType={selectedValue.value}
          />
        )}
        {selectedValue && selectedValue.value === "HTTP" && (
          <SupplierHttpForm
            onSubmit={handleHttpSubmit}
            settingType={selectedValue.value}
          />
        )}
        
      </div>
    </>
  );
}

export default SupplierPage5;
