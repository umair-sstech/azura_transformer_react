import React, { useState } from "react";
import Select from "react-select";
import "./SupplierPage.css";
import SupplierSftpForm from "./SupplierSftpForm";
import SupplierHttpForm from "./SupplierHttpForm";

function SupplierPage5() {
  const options = [
    { value: "SFTP", label: "SFTP" },
    { value: "HTTP", label: "HTTP" },
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
      <div>{selectedValue?.value === "SFTP"?<SupplierSftpForm/>:""}</div>
      <div>{selectedValue?.value === "HTTP"?<SupplierHttpForm/>:""}</div>
    </div>
    
    </>
  );
}

export default SupplierPage5;
