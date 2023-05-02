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
import { API_PATH } from "../ApiPath/Apipath";

function SuppilerPage3(props) {
  const { setPage } = props;
  const { isSuppilerAdded, formData, setFormData } = useContext(FormContext);

  const [options, setOptions] = useState([
    {
      value: "do_nothing",
      label: "Do nothing",
    },
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
  ]);

  const [productFields, setProductFields] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState({});

  const history = useHistory();

  useEffect(() => {
    props.onLoading(true);
    getProductField();
    getSupplierDataById();
    getMappingData();
  }, []);

  const handleFieldChange = (index, key, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      if (!newSelectedOptions[index]) {
        newSelectedOptions[index] = {};
      }
      if (selectedOption) {
        newSelectedOptions[index][key] = selectedOption;

        const selectedValue = selectedOption.value;
        const selectedOptionIndex = options.findIndex(
          (option) => option.value === selectedValue
        );
        const option = options[selectedOptionIndex];
        console.log("option", option);
        const count = option?.count || 0;
        console.log("count", count);
        let color = "gray";

        if (count === 0) {
          color = "green";
        } else if (count === 1) {
          color = "orange";
        } else if (count >= 2) {
          color = "red";
        }

        const newCount = count + 1;
        const newOptions = [...options];
        newOptions[selectedOptionIndex] = {
          ...newOptions[selectedOptionIndex],
          count: newCount,
          color: color,
        };
        setOptions(newOptions);
        setFormErrors([]);
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

  const handleRadioChange = (index, key, value) => {
    setSelectedRadio((prevSelectedRadio) => ({
      ...prevSelectedRadio,
      [`${index}-${key}`]: {
        value,
        showTextbox: value === "Is it folder name?",
      },
    }));
  };

  const getProductField = async () => {
    try {
      props.onLoading(true);
      const response = await axios.get(`${API_PATH.GET_PRODUCT_CATALOG}`);
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
            let additionalValue = "";
            let imageType = "";
            if (
              key.startsWith("Image") &&
              option.value !== "do_nothing" &&
              selectedRadio[`${index}-${key}`]
            ) {
              additionalValue =
                selectedRadio[`${index}-${key}`].additionalValue || "";
              imageType = selectedRadio[`${index}-${key}`].value || "";
            } else if (option.textbox) {
              additionalValue =
                selectedOption[key] && selectedOption[key].additionalValue
                  ? selectedOption[key].additionalValue
                  : "";
            }
            const mappingObject = {
              supplierId: localStorage.getItem("supplierId"),
              supplierName: localStorage.getItem("supplierName"),
              standardField: key,
              standardValue: "",
              supplierField: option.value,
              additionalValue: additionalValue,
              imageType: imageType, // add imageType to the mappingObject
            };
            mappingArray.push(mappingObject);
          }
        });
      });
      props.onLoading(true);
      try {
        const response = await axios.post(
          `${API_PATH.DATA_FILE_MAPPING}`,
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
        `${API_PATH.DATA_FILE_MAPPING}`,
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/supplier");
        localStorage.removeItem("supplierId");
        localStorage.removeItem("supplierName");
      }
    });
  };

  const validateForm = () => {
    const errors = [];
    let isValid = true;

    if (selectedOptions.length === 0) {
      errors.push("Please do at least one mapping.");
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;
        setFormData(supplierData);

        const csvJSON = supplierData.csvJSON || [];
        const newOptions = [
          ...csvJSON.map((option) => ({
            value: option,
            label: option,
          })),
        ];

        setOptions(newOptions);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getMappingData = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_SUPPLIER_FILE_MAPPING}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;
        console.log("mappingdata", supplierData);
        setFormData(supplierData);

        const options = {};
        supplierData.forEach((field) => {
          const { standardField, supplierField } = field;
          options[standardField] = {
            label: supplierField,
            value: supplierField,
          };
        });

        setSelectedOptions([options]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
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
                type="button"
                onClick={handleCancel}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="table-container" style={{ position: "relative" }}>
          {formErrors.map((error, index) => (
            <div key={index} className="form-error">
              <span className="text-danger"> {error}</span>
            </div>
          ))}

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
                    style={{ padding: "2.3rem", width: "80%" }}
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
                        const radioValue =
                          selectedRadio[`${index}-${key}`] &&
                          selectedRadio[`${index}-${key}`].value
                            ? selectedRadio[`${index}-${key}`].value
                            : null;
                        const showTextbox =
                          selectedRadio[`${index}-${key}`] &&
                          selectedRadio[`${index}-${key}`].showTextbox
                            ? selectedRadio[`${index}-${key}`].showTextbox
                            : false;
                        let additionalInfo = null;
                        if (
                          key.startsWith("Image") &&
                          selectedOption &&
                          !selectedOption.textbox &&
                          selectedOption.value !== "do_nothing"
                        ) {
                          additionalInfo = (
                            <>
                              <div className="radio-container">
                                <input
                                  type="radio"
                                  name={`image-${index}-${key}`}
                                  value="Is it folder name?"
                                  onChange={(e) =>
                                    handleRadioChange(
                                      index,
                                      key,
                                      e.target.value
                                    )
                                  }
                                  checked={radioValue === "Is it folder name?"}
                                />{" "}
                                <label
                                  htmlFor={`image-${index}-${key}`}
                                  className="image-label"
                                >
                                  Is it folder name?
                                </label>
                                <br />
                                <input
                                  type="radio"
                                  name={`image-${index}-${key}`}
                                  value="Folder name with Image"
                                  onChange={(e) =>
                                    handleRadioChange(
                                      index,
                                      key,
                                      e.target.value
                                    )
                                  }
                                  checked={
                                    radioValue === "Folder name with Image"
                                  }
                                />{" "}
                                <label
                                  htmlFor={`image-${index}-${key}`}
                                  className="image-label"
                                >
                                  Folder name with Image
                                </label>
                                <br />
                                <input
                                  type="radio"
                                  name={`image-${index}-${key}`}
                                  value=" Single Image"
                                  onChange={(e) =>
                                    handleRadioChange(
                                      index,
                                      key,
                                      e.target.value
                                    )
                                  }
                                  checked={radioValue === " Single Image"}
                                />{" "}
                                <label
                                  htmlFor={`image-${index}-${key}`}
                                  className="image-label"
                                >
                                  Single Image
                                </label>
                              </div>
                              {showTextbox && (
                                <input
                                  type="text"
                                  placeholder="Enter a value"
                                  className="additional-textbox rounded"
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
                        } else if (selectedOption && selectedOption.textbox) {
                          additionalInfo = (
                            <input
                              type="text"
                              placeholder="Enter a value"
                              className="additional-textbox rounded"
                              onChange={(e) =>
                                handleAdditionalValueChange(
                                  index,
                                  key,
                                  e.target.value
                                )
                              }
                            />
                          );
                        } else if (key === "Dimension_Units") {
                          additionalInfo = (
                            <div className="select-container">
                              <Select
                                key={`${index}-${key}-additional`}
                                options={[
                                  { label: "cm", value: "cm", count: 0 },
                                  { label: "in", value: "in", count: 0 },
                                  { label: "mm", value: "mm", count: 0 },
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
                        } else if (key === "Weight_Unit") {
                          additionalInfo = (
                            <div className="select-container">
                              <Select
                                key={`${index}-${key}-additional`}
                                options={[
                                  { label: "lbs", value: "lbs", count: 0 },
                                  { label: "kg", value: "kg", count: 0 },
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
                                  { label: "New", value: "New", count: 0 },
                                  {
                                    label: "Preloved",
                                    value: "Preloved",
                                    count: 0,
                                  },
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
                                <>
                                  <input
                                    type="text"
                                    placeholder="Enter a value"
                                    className="additional-textbox rounded"
                                    onChange={(e) =>
                                      handleAdditionalValueChange(
                                        index,
                                        key,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <small>Please use </small>
                                </>
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
                                  className="select"
                                  styles={{
                                    option: (styles, { data }) => {
                                      return {
                                        ...styles,
                                        background: data.color,
                                      };
                                    },
                                  }}
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
