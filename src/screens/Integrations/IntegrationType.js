
import React, { useState } from "react";
import Select from "react-select";

function IntegrationType() {
  const options = [
    { value: "Supplier", label: "Supplier" },
    { value: "Market Place", label: "Market Place", isDisabled: true },
    { value: "Shopping Cart", label: "Shopping Cart", isDisabled: true },
    { value: "Carrier", label: "Carrier", isDisabled: true },
    { value: "TMS", label: "TMS", isDisabled: true },
    { value: "WMS", label: "WMS", isDisabled: true },
    { value: "Integrator", label: "Integrator", isDisabled: true },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div
      style={{
        marginRight: "32px",
        display: "flex",
        alignItems: "center",
        width: "400px",
      }}
    >
      <label htmlFor="combo-box-demo" style={{ width: "36%" }}>
        Type of Integrations
      </label>
      <Select
        defaultValue={selectedOption}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isDisabled={false}
        styles={{
          menu: (provided) => ({ ...provided, width: 200 }),
          control: (provided) => ({ ...provided, width: 200 }),
        }}
      />
    </div>
  );
}

export default IntegrationType;
