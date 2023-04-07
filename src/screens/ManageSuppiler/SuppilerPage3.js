import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

import "./SupplierPage.css";

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

  const [productFields, setProductFields] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(productFields.length).fill(null)
  );

  useEffect(() => {
    getProductField();
  }, []);

  const handleFieldChange = (index, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[index] = selectedOption;
      return newSelectedOptions;
    });
  };

  const getProductField = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/product/getStanderdProductCatalog"
      );
      if (response.data.success) {
        setProductFields(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div className="row">
        <div className="col-lg-12 col-md-12 col-12 button-class">
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
      <table>
        <thead>
          <tr>
            <th>Product Field</th>
            <th>Value</th>
            <th>Additional Info</th>
          </tr>
        </thead>
        <tbody>
        {productFields.map((productField, index) => {
          const keys = Object.keys(productField);
          return (
            <>
              {keys.map((key) => {
                const selectedOption =
                  selectedOptions[index] && selectedOptions[index][key]
                    ? selectedOptions[index][key]
                    : null;

                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                    <Select
                    key={`${index}-${key}`}
                    options={options}
                    value={selectedOption}
                    onChange={(selectedOption) =>
                      handleFieldChange(index, {
                        ...selectedOptions[index],
                        [key]: selectedOption
                      })
                    }
                    isSearchable={true}
                    getOptionLabel={(option) => (
                      <span style={{ color: option.color }}>
                        {option.label}
                      </span>
                    )}
                    styles={{
                      menu: (provided, state) => ({
                        ...provided,
                        padding: '0px 0',
                      }),
                    }}
                  />
                    </td>
                    <td>
                      {selectedOption && selectedOption.textbox && (
                        <input type="text" placeholder="Enter a value" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          );
        })}
      </tbody>
      </table>
      
    </>
  );
}

export default SuppilerPage3;
