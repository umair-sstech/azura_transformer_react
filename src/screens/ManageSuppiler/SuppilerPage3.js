import React, { useState } from "react";
import Select from "react-select";
import "./SupplierPage3.css";

function SuppilerPage3() {
  const options = [
    { value: "Do nothing", label: "Do nothing", color: "black", selections: 0 },
    {
      value: "Hardcode value",
      label: "Hardcode value",
      textbox: true,
      color: "black",
      selections: 0,
    },
    {
      value: "Use AI",
      label: "Use AI",
      textbox: true,
      color: "black",
      selections: 0,
    },
  ];

  const [productFields, setProductFields] = useState([
    { field: "Product 1" },
    { field: "Product 2" },
    { field: "Product 3" },
    { field: "Product 4" },
    { field: "Product 5" },
    { field: "Product 6" },
    { field: "Product 7" },
    { field: "Product 8" },
  ]);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(options.length).fill(null)
  );

  const handleFieldChange = (index, selectedOption) => {
    const newSelectedOptions = [...selectedOptions];
    const prevOption = newSelectedOptions[index];

    if (prevOption) {
      prevOption.selections -= 1;
      if (prevOption.selections === 0) {
        prevOption.color = "black";
      }
    }

    selectedOption.selections += 1;
    if (selectedOption.selections === 1) {
      selectedOption.color = "green";
    } else if (selectedOption.selections === 2) {
      selectedOption.color = "orange";
    } else {
      selectedOption.color = "red";
    }

    newSelectedOptions[index] = selectedOption;
    if (selectedOption?.textbox) {
      selectedOption.textbox = true;
    }
    setSelectedOptions(newSelectedOptions);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Additional Info</th>
          </tr>
        </thead>
        <tbody>
          {productFields.map((productField, index) => {
            const selectedOption = selectedOptions[index];
            return (
              <tr key={index}>
                <td>{productField.field}</td>
                <td>
                  <Select
                    options={options}
                    value={selectedOption}
                    onChange={(selectedOption) =>
                      handleFieldChange(index, selectedOption)
                    }
                    isSearchable={true}
                    getOptionLabel={(option) => (
                      <span style={{ color: option.color }}>
                        {option.label}
                      </span>
                    )}
                  />
                </td>
                <td>
                  {selectedOption?.textbox && (
                    <input type="text" placeholder="Enter a value" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row" style={{ marginTop: "4%" }}>
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

            <button className="btn btn-secondary w-auto btn-lg" type="submit">
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuppilerPage3;
