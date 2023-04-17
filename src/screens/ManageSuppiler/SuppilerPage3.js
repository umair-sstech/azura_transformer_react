import React, { useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { onLoading } from "../../actions";

import axios from "axios";

import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function SuppilerPage3(props) {
  const { setPage } = props;

  const options = [
    { value: "do_nothing", label: "Do nothing" },
    {
      value: "hardcode_value",
      label: "Hardcode value",
      textbox: true,
    },
    {
      value: "use_AI",
      label: "Use AI",
      textbox: true,
    },
  ];

  const [standardField, setStandardField] = useState("");
  const [supplierField, setSupplierField] = useState("");
  const [additionalValue, setadditionalValue] = useState("");
  const [productFields, setProductFields] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    props.onLoading(true);
    getProductField();
  }, []);

  const handleFieldChange = (index, key, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      if (!newSelectedOptions[index]) {
        newSelectedOptions[index] = {};
      }
      Object.keys(newSelectedOptions[index]).forEach((optionKey) => {
        if (optionKey !== key) {
          newSelectedOptions[index][optionKey] = { value: "do_nothing" };
        }
      });
      newSelectedOptions[index][key] = selectedOption;
      return newSelectedOptions;
    });
  
    // Update the additionalValue state
    if (selectedOption && selectedOption.textbox) {
      setadditionalValue(selectedOption.value);
    } else {
      setadditionalValue("");
    }
  
    // Update the productFields state
    setProductFields((prevProductFields) => {
      const newProductFields = [...prevProductFields];
      if (!newProductFields[index]) {
        newProductFields[index] = {};
      }
      newProductFields[index][key] = selectedOption ? selectedOption.value : "";
  
      // Update the standardField if a standard field is selected
      if (key === "standardField") {
        setStandardField(selectedOption.value);
      }
      // Update the supplierField if a supplier field is selected
      if (!selectedOption || !selectedOption.textbox) {
        setSupplierField(selectedOption ? selectedOption.value : "");
      }
      return newProductFields;
    });
  };
  
  
  const handleAdditionalValueChange = (index, key, value) => {
    setadditionalValue(value);
  };

  // const handleFieldChange = (index, key, selectedOption) => {
  //   setSelectedOptions((prevSelectedOptions) => {
  //     const newSelectedOptions = [...prevSelectedOptions];
  //     if (!newSelectedOptions[index]) {
  //       newSelectedOptions[index] = {};
  //     }
  //     newSelectedOptions[index][key] = selectedOption;
  //     return newSelectedOptions;
  //   });
  // };

  // const handleAdditionalValueChange = (index, key, additionalValue) => {
  //   setSelectedOptions((prevSelectedOptions) => {
  //     const newSelectedOptions = [...prevSelectedOptions];
  //     if (!newSelectedOptions[index]) {
  //       newSelectedOptions[index] = {};
  //     }
  //     newSelectedOptions[index][key] = {
  //       ...newSelectedOptions[index][key],
  //       additionalValue,
  //     };
  //     return newSelectedOptions;
  //   });
  // };

  const getProductField = async () => {
    try {
      props.onLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_PRODUCT}/product/getStanderdProductCatalog`
      );
      if (response.data.success) {
        setProductFields(response.data.data);
        props.onLoading(false);
      }
    } catch (error) {
      console.error(error);
      props.onLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const supplierId = localStorage.getItem("supplierId");
  //     const supplierName = localStorage.getItem("supplierName");

  //     const selectedData = productFields.filter((productField, index) => {
  //       const selectedOption =
  //         selectedOptions[index][productField.standardField];
  //       return selectedOption?.value !== "do_nothing";
  //     });

  //     const mappedData = selectedData.flatMap((productField, index) =>
  //       Object.entries(productField).map(([key, value]) => {
  //         console.log("key", key);
  //         const selectedOption = selectedOptions[index][key];
  //         return {
  //           supplierId,
  //           supplierName,
  //           standardField: key,
  //           standardValue: "",
  //           supplierField: selectedOption?.value,
  //           additionalValue: selectedOption?.additionalValue,
  //         };
  //       })
  //     );
  //     console.log("mapped data", mappedData);
  //     const response = await axios.post(
  //       "http://localhost:8001/supplire/createOrUpdateSupplierFields",
  //       mappedData
  //     );
  //     if (response.data.success) {
  //       console.log("Data saved successfully");
  //     }
  //     props.onLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     props.onLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.onLoading(true);
  
      const supplierFields = [];
  
      for (let i = 0; i < productFields.length; i++) {
        const selectedOption = selectedOptions[i];
        const standardField = productFields[i]?.standardField || "";
        const supplierFieldValue = selectedOption?.textbox ? additionalValue : selectedOption?.value || "";
        console.log("supplierFiedlsValue",supplierFieldValue)
        const supplierField = selectedOption?.textbox ? additionalValue : selectedOption?.value || "";
        supplierFields.push({
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          standardField,
          supplierField,
          additionalValue: selectedOption?.textbox ? additionalValue : "",
        });
      }
  
      console.log("supplierFields", supplierFields);
      return false;
      
      const response = await axios.post(
        "http://localhost:8001/supplire/createOrUpdateSupplierFields",
        supplierFields
      );
      if (response.data.success) {
        console.log("response", response.data);
        // handle success
      } else {
        // handle error
      }
    } catch (error) {
      console.error(error);
      // handle error
    } finally {
      props.onLoading(false);
    }
  };
  
  

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/supplier");
      }
    });
  };

  return (
    <>
      <hr className="hr" />
      <form>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                // onClick={() => setPage("4")}
                onClick={(e) => handleSubmit(e)}
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
                onClick={handleCancel}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="table-container" style={{ position: "relative" }}>
          <table>
            <thead>
              <tr>
                <th>Product Field</th>
                <th>Value</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            {props.loading ? (
              <tbody>
                <tr>
                  <td
                    colSpan="3"
                    className="loader-wrapper"
                    style={{ padding: "2.3rem", width: "60%" }}
                  >
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{ padding: "2rem" }}
                    ></i>
                  </td>
                </tr>
              </tbody>
            ) : (
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
                              <div className="select-container">
                                <Select
                                  key={`${index}-${key}`}
                                  options={options}
                                  value={selectedOption}
                                  onChange={(selectedOption) =>
                                    handleFieldChange(
                                      index,
                                      key,
                                      selectedOption
                                    )
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
                                      padding: "0px 0",
                                    }),
                                  }}
                                  className="select"
                                />
                              </div>
                            </td>
                            <td>
                              {selectedOption && selectedOption.textbox && (
                                <input
                                  type="text"
                                  placeholder="Enter a value"
                                  className="additional-textbox"
                                  onChange={(e) =>
                                    handleAdditionalValueChange(
                                      index,
                                      key,
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerPage3);
