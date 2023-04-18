import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { onLoading } from "../../actions";

import axios from "axios";

import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { FormContext } from "./ManageSuppiler";

function SuppilerPage3(props) {
  const { setPage } = props;
  const { isSuppilerAdded, formData, setFormData } = useContext(FormContext);
  
  const [options, setOptions] = useState([
    {
      value: "do_nothing",
      label: "Do nothing",
      color: "gray",
      count: 0,
    },
    {
      value: "hardcode_value",
      label: "Hardcode value",
      textbox: true,
      color: "gray",
      count: 0,
    },
    {
      value: "use_AI",
      label: "Use AI",
      textbox: true,
      color: "gray",
      count: 0,
    },
  ]);
  const dimensionUnitsOptions = [
    { label: "cm", value: "cm" },
    { label: "in", value: "in" },
    { label: "mm", value: "mm" }
  ];
  
  const weightUnitOptions = [
    { label: "lbs", value: "lbs" },
    { label: "kg", value: "kg" }
  ];
  
  const conditionOptions = [
    { label: "new", value: "new" },
    { label: "preloved", value: "preloved" }
  ];
  const [productFields, setProductFields] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mappingArray, setMappingArray] = useState([]);
  const [dropdownName, setDropdownName] = useState("");

  const [formErrors, setFormErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    props.onLoading(true);
    getProductField();
  }, []);

  // useEffect(() => {
  //   const fetchMappings = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8001/supplire/getSupplierFields",
  //         {
  //           params: {
  //             supplierId: localStorage.getItem("supplierId"),
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         const mappings = response.data.data;
  //         setMappingArray(mappings);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchMappings();
  // }, []);

  const handleFieldChange = (index, key, selectedOption, dropdownName) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      if (!newSelectedOptions[index]) {
        newSelectedOptions[index] = {};
      }
      newSelectedOptions[index][key] = selectedOption;
      
      // Only update dropdownName if it's not already set
      if (!dropdownName) {
        setDropdownName("Dimension_Units");
      }
      
      return newSelectedOptions;
    });
  };
  
  

  const handleAdditionalValueChange = (index, key, additionalValue) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      if (!newSelectedOptions[index]) {
        newSelectedOptions[index] = {};
      }
      newSelectedOptions[index][key] = {
        ...newSelectedOptions[index][key],
        additionalValue,
      };
      return newSelectedOptions;
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const mappingArray = [];
      selectedOptions.forEach((selectedOption, index) => {
        const keys = Object.keys(selectedOption);
        keys.forEach((key) => {
          const option = selectedOption[key];
          if (option) {
            const mappingObject = {
              supplierId: localStorage.getItem("supplierId"),
              supplierName: localStorage.getItem("supplierName"),
              standardField: key,
              standardValue: "",
              supplierField: option.value,
              additionalValue:
                option.textbox &&
                selectedOptions[index] &&
                selectedOptions[index][key] &&
                selectedOptions[index][key].additionalValue
                  ? selectedOptions[index][key].additionalValue
                  : "",
            };
            mappingArray.push(mappingObject);
            console.log("mapping", mappingArray);
          }
        });
      });
      props.onLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createOrUpdateSupplierFields`,
          mappingArray
        );
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage("4");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        props.onLoading(false);
      }
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    const mappingArray = [];
    selectedOptions.forEach((selectedOption, index) => {
      const keys = Object.keys(selectedOption);
      keys.forEach((key) => {
        const option = selectedOption[key];
        if (option) {
          const mappingObject = {
            supplierId: localStorage.getItem("supplierId"),
            supplierName: localStorage.getItem("supplierName"),
            standardField: key,
            standardValue: "",
            supplierField: option.value,
            additionalValue:
              option.textbox &&
              selectedOptions[index] &&
              selectedOptions[index][key] &&
              selectedOptions[index][key].additionalValue
                ? selectedOptions[index][key].additionalValue
                : "",
          };
          mappingArray.push(mappingObject);
        }
      });
    });
    props.onLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createOrUpdateSupplierFields`,
        mappingArray
      );
      const { success, message, data } = response.data;
      if (success) {
        toast.success(message);
        localStorage.removeItem("supplierId");
        localStorage.removeItem("supplierName");
        history.push("/supplier");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
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

  const validateForm = () => {
    const errors = [];

    selectedOptions.forEach((selectedOption, index) => {
      const keys = Object.keys(selectedOption);
      keys.forEach((key) => {
        const option = selectedOption[key];
        if (!option) {
          errors.push(`Please map ${key} to a supplier field`);
        }
      });
    });

    setFormErrors(errors);

    return errors.length === 0;
  };
  useEffect(() => {
    getSupplierDataById();
  }, []);

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/getSupplireInfoById?supplierId=${supplierId}`
      )
      .then((response) => {
        const supplierData = response.data.data;
        setFormData(supplierData);
  
        const csvJSON = supplierData.csvJSON || [];
        const newOptions = [
          {
            value: "do_nothing",
            label: "Do nothing",
            color: "gray",
            count: 0,
          },
          {
            value: "hardcode_value",
            label: "Hardcode value",
            textbox: true,
            color: "gray",
            count: 0,
          },
          {
            value: "use_AI",
            label: "Use AI",
            textbox: true,
            color: "gray",
            count: 0,
          },
          ...csvJSON.map((option) => ({
            value: option,
            label: option,
            color: "gray",
            count: 0,
          })),
        ];
        console.log("options",newOptions)
        setOptions(newOptions);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  

  return (
    <>
      <hr className="hr" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                {props.isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : isSuppilerAdded ? (
                  "Update"
                ) : (
                  "Save & Next"
                )}
              </button>

              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={(e) => handleOnClick(e)}
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
          {formErrors.length > 0 && (
            <div className="form-errors">
              {formErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
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
                      let additionalInfo = null;
                      if (key === "Dimension_Units") {
                        additionalInfo = (
                          <div className="select-container">
                            <Select
                              key={`${index}-${key}-additional`}
                              options={[
                                { label: "cm", value: "cm" },
                                { label: "in", value: "in" },
                                { label: "mm", value: "mm" },
                              ]}
                              value={selectedOption}
                              onChange={(selectedOption) =>
                                handleFieldChange(
                                  index,
                                  key,
                                  selectedOption,
                                  "Dimension_Units" // pass the name of the dropdown here
                                )
                              }
                              
                              isSearchable={true}
                              className="select"
                            />
                          </div>
                        );
                      } else if (key === "Weight_Unit") {
                        additionalInfo = (
                          <div className="select-container">
                            <Select
                              key={`${index}-${key}-additional`}
                              options={[
                                { label: "lbs", value: "lbs" },
                                { label: "kg", value: "kg" },
                              ]}
                              value={selectedOption}
                              onChange={(selectedOption) =>
                                handleFieldChange(index, key, selectedOption)
                              }
                              isSearchable={true}
                              className="select"
                            />
                          </div>
                        );
                      } else if (key === "Condition") {
                        additionalInfo = (
                          <div className="select-container">
                            <Select
                              key={`${index}-${key}-additional`}
                              options={[
                                { label: "New", value: "New" },
                                { label: "Preloved", value: "Preloved" },
                              ]}
                              value={selectedOption}
                              onChange={(selectedOption) =>
                                handleFieldChange(index, key, selectedOption)
                              }
                              isSearchable={true}
                              className="select"
                            />
                          </div>
                        );
                        } else {
                          additionalInfo = (
                            <>
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
                            </>
                          );
                        }
              
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
                                  getOptionLabel={(option) => {
                                    const mappingCount = mappingArray.filter(
                                      (mapping) =>
                                        mapping.supplierField ===
                                          option.value &&
                                        mapping.standardField === key
                                    ).length;
              
                                    let color = "gray";
                                    if (mappingCount === 1) {
                                      color = "green";
                                    } else if (mappingCount === 2) {
                                      color = "orange";
                                    } else if (mappingCount >= 3) {
                                      color = "red";
                                    }
              
                                    return (
                                      <span style={{ color }}>
                                        {option.label}
                                      </span>
                                    );
                                  }}
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
                            <td>{additionalInfo}</td>
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
