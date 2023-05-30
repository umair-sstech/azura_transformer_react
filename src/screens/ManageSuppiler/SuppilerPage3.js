import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import axios from "axios";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FormContext } from "./ManageSuppiler";
import { API_PATH } from "../ApiPath/Apipath";
import { Spinner } from "react-bootstrap";
import CustomFields from "./CustomFields";

function SuppilerPage3(props) {
  const { setPage } = props;
  const { setFormData } = useContext(FormContext);

  const [options, setOptions] = useState([
    {
      value: "do_nothing",
      label: "Do Nothing",
    },
    {
      value: "hardcode_value",
      label: "Hardcode Value",
      textbox: true,
    },
    {
      value: "use_AI",
      label: "Use AI",
      textbox: true,
      message: "e.g. Please generate the {value} from {Parent_Title}",
    },
    {
      value: "extract",
      label: "Extract",
      textbox: true,
    },
  ]);

  const [productRadio, setProductRadio] = useState([
    {
      value: "single_row",
      label: " Single Row ( Parent Child In Same Row)",
    },
    {
      value: "multiple_row",
      label: " Different Rows ( Parent Child In Different Row)",
    },
  ]);

  const [productFields, setProductFields] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState({});
  const [additionalTextValue, setAdditionalTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [mappingData, setMappingData] = useState([]);
  const [csvOption, setCsvOption] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [selectedRadioPreference, setSlectedRadioPreference] = useState(null);
  const [supplierExtractOption, setSupplierExtractOption] = useState([]);
  const [customFieldsData, setCustomFieldsData] = useState([]);

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
        if (
          selectedOption &&
          selectedOption.textbox &&
          !newSelectedOptions[index][key].additionalValue
        ) {
          newSelectedOptions[index][key].additionalValue = "";
        }

        const selectedValue = selectedOption.value;
        const selectedOptionIndex = options.findIndex(
          (option) => option.value === selectedValue
        );
        const option = options[selectedOptionIndex];
        const count = option?.count || 0;
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
        showTextbox: value === "folder_only",
      },
    }));
    setAdditionalTextValue("");
  };

  const handleProductExtractChange = (index, key, selectedOption) => {
    const updatedSupplierExtractOption = [...supplierExtractOption];
    updatedSupplierExtractOption[index] = {
      ...updatedSupplierExtractOption[index],
      [key]: selectedOption.value,
    };
    setSupplierExtractOption(updatedSupplierExtractOption);
  };

  const handleProductRadioChange = (value) => {
    setSlectedRadioPreference(value);
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
            let imageList = "";

            const mapping = mappingData.find((item) => item.standardField === key) || {};
            const radioValue =
              selectedRadio[`${index}-${key}`] &&
              selectedRadio[`${index}-${key}`].value
                ? selectedRadio[`${index}-${key}`].value
                : mapping.imageType || null;
            const isRadioUnchanged =
              mapping.imageType && mapping.imageType === radioValue;

              if (
                key.startsWith("Image") &&
                option.value !== "do_nothing" &&
                !isRadioUnchanged &&
                selectedRadio[`${index}-${key}`]
              ) {
                additionalValue =
                  selectedRadio[`${index}-${key}`].additionalValue || "";
                imageType = radioValue || "";
                if (selectedRadio[`${index}-${key}`].showTextbox) {
                  imageList = additionalTextValue;
                }
              } else if (option.textbox) {
              additionalValue =
                selectedOption[key] && selectedOption[key].additionalValue
                  ? selectedOption[key].additionalValue
                  : "";
            }
            let supplierExtract = "";
            if (option.value === "extract") {
              supplierExtract = supplierExtractOption[index]?.[key] || "";
            }
            const mappingObject = {
              supplierId: localStorage.getItem("supplierId"),
              supplierName: localStorage.getItem("supplierName"),
              standardField: key,
              standardValue: "",
              supplierField: option.value,
              additionalValue: additionalValue,
              imageType: imageType,
              imageList: imageList,
              supplierExtract: supplierExtract,
            };
            mappingArray.push(mappingObject);
          }
        });
      });

      customFieldsData.forEach((customField) => {
        const mappingObject = {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          customFieldName: customField.customFieldName,
          customValue: customField.customValue,
          isCustomField: true,
        };
        mappingArray.push(mappingObject);
      });

      productRadio.forEach((product) => {
        const additionalValue = selectedRadioPreference || "";
        const additionalValueString =
          typeof additionalValue === "object" ? "" : additionalValue;
        const mappingObject = {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          standardField: "Preference",
          standardValue: "",
          supplierField: selectedPreference ? selectedPreference.value : "",
          additionalValue: additionalValueString,
        };

        mappingArray.push(mappingObject);
      });

      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
  };

  const handleOnClick = async (e) => {
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
            let imageList = "";

            const mapping = mappingData.find((item) => item.standardField === key) || {};
            const radioValue =
              selectedRadio[`${index}-${key}`] &&
              selectedRadio[`${index}-${key}`].value
                ? selectedRadio[`${index}-${key}`].value
                : mapping.imageType || null;
            const isRadioUnchanged =
              mapping.imageType && mapping.imageType === radioValue;

              if (
                key.startsWith("Image") &&
                option.value !== "do_nothing" &&
                !isRadioUnchanged &&
                selectedRadio[`${index}-${key}`]
              ) {
                additionalValue =
                  selectedRadio[`${index}-${key}`].additionalValue || "";
                imageType = radioValue || "";
                if (selectedRadio[`${index}-${key}`].showTextbox) {
                  imageList = additionalTextValue;
                }
              } else if (option.textbox) {
              additionalValue =
                selectedOption[key] && selectedOption[key].additionalValue
                  ? selectedOption[key].additionalValue
                  : "";
            }
            let supplierExtract = "";
            if (option.value === "extract") {
              supplierExtract = supplierExtractOption[index]?.[key] || "";
            }
            const mappingObject = {
              supplierId: localStorage.getItem("supplierId"),
              supplierName: localStorage.getItem("supplierName"),
              standardField: key,
              standardValue: "",
              supplierField: option.value,
              additionalValue: additionalValue,
              imageType: imageType,
              imageList: imageList,
              supplierExtract: supplierExtract,
            };
            mappingArray.push(mappingObject);
          }
        });
      });

      customFieldsData.forEach((customField) => {
        const mappingObject = {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          customFieldName: customField.customFieldName,
          customValue: customField.customValue,
          isCustomField: true,
        };
        mappingArray.push(mappingObject);
      });

      productRadio.forEach((product) => {
        const additionalValue = selectedRadioPreference || "";
        const additionalValueString =
          typeof additionalValue === "object" ? "" : additionalValue;
        const mappingObject = {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          standardField: "Preference",
          standardValue: "",
          supplierField: selectedPreference ? selectedPreference.value : "",
          additionalValue: additionalValueString,
        };

        mappingArray.push(mappingObject);
      });

      setIsLoading(true);
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
        setIsLoading(false);
      }
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
          ...options,
          ...csvJSON.map((option) => ({
            value: option,
            label: option,
          })),
        ];
        const csvJSON1 = supplierData.csvJSON || [];
        const newOptions1 = [
          ...csvJSON1.map((option) => ({
            value: option,
            label: option,
          })),
        ];

        setOptions(newOptions);
        setCsvOption(newOptions1);
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
        setFormData(supplierData.supplier_product_field);

        const supplierMapping = supplierData.supplier_product_field;

        const supplierCustomFields = supplierData.supplier_custom_field;

        const additionalValue = supplierMapping.find(
          (field) => field.standardField === "Preference"
        )?.additionalValue;

        setSlectedRadioPreference(additionalValue);

        const options = {};
        supplierMapping.forEach((field) => {
          const { standardField, supplierField, imageType } = field;
          options[standardField] = {
            label: supplierField,
            value: supplierField,
            imageType: imageType,
          };
        });
        setSelectedOptions([options]);
        setMappingData(supplierMapping);
        setCustomFieldsData(supplierCustomFields);

        const selectedRadioState = {};
        supplierMapping.forEach((field, index) => {
          const { standardField, imageType } = field;
          const radioValue = imageType || null;
          selectedRadioState[`${index}-${standardField}`] = {
            value: radioValue,
          };
        });
        setSelectedRadio(selectedRadioState);
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
                onClick={(e) => handleOnClick(e)}
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
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
          <div className="row mt-3 mt-lg-0">
            <div className="col-12">
              <label>
              What is the standard format used by the supplier for sharing the product data?
              </label>
            </div>
            <div className="col-12 mt-2">
              {productRadio.map((radio) => (
                <div key={radio.value} className="radio-label mr-3">
                  <input
                    type="radio"
                    name="Preference"
                    value={radio.value ? radio.value : ""}
                    checked={selectedRadioPreference === radio.value}
                    onChange={() => handleProductRadioChange(radio.value)}
                  />
                  {radio.label}
                </div>
              ))}
            </div>
          </div>
         
          <div className="row mt-2">

            <div className="col-6">
            <label className="text-success"> Please select the field where the parent-child relation is specified.</label>
              {selectedRadioPreference === "multiple_row" ? (
                <div>
                  <Select
                    options={csvOption}
                    value={selectedPreference}
                    onChange={(selectedOption) =>
                      setSelectedPreference(selectedOption)
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
          <label className="text-success">e.g. Product Type</label>
          <table className="w-100 table-responsive-md">
            <thead>
              <tr>
                <th>Product Field</th>
                <th>Value</th>
                <th>Additional Info</th>
                <th>Extract Value</th>
              </tr>
            </thead>

            {props.loading ? (
              <tbody>
                <tr>
                  <td
                    colSpan="3"
                    className="loader-wrapper"
                    style={{ padding: "2.3rem", width: "100%" }}
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
                      const mapping =
                        mappingData.find(
                          (item) => item.standardField === key
                        ) || {};
                      const radioValue =
                        selectedRadio[`${index}-${key}`] &&
                        selectedRadio[`${index}-${key}`].value
                          ? selectedRadio[`${index}-${key}`].value
                          : mapping.imageType || null;
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
                                value="folder_only"
                                onChange={(e) =>
                                  handleRadioChange(
                                    index,
                                    key,
                                    e.target.value
                                  )
                                }
                                checked={radioValue === "folder_only"}
                              />{" "}
                              <label
                                htmlFor={`image-${index}-${key}`}
                                className="image-label text-success"
                              >
                                Is it folder name?
                              </label>
                              <br />
                              <input
                                type="radio"
                                name={`image-${index}-${key}`}
                                value="folder_images"
                                onChange={(e) =>
                                  handleRadioChange(
                                    index,
                                    key,
                                    e.target.value
                                  )
                                }
                                checked={radioValue === "folder_images"}
                              />{" "}
                              <label
                                htmlFor={`image-${index}-${key}`}
                                className="image-label text-success"
                              >
                                Folder name with Image
                              </label>
                              <br />
                              <input
                                type="radio"
                                name={`image-${index}-${key}`}
                                value="single_image"
                                onChange={(e) =>
                                  handleRadioChange(
                                    index,
                                    key,
                                    e.target.value
                                  )
                                }
                                checked={radioValue === "single_image"}
                              />{" "}
                              <label
                                htmlFor={`image-${index}-${key}`}
                                className="image-label text-success"
                              >
                                Single Image
                              </label>
                            </div>
                              {showTextbox && (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Enter a value"
                                    className="additional-textbox rounded"
                                    onChange={(e) =>
                                      setAdditionalTextValue(e.target.value)
                                    }
                                  />
                                  <small>
                                    Please enter the image/photo column
                                    name(same as csv name)
                                  </small>
                                </>
                              )}
                            </>
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
                              <br />
                              {selectedOption &&
                                selectedOption.value === "use_AI" && (
                                  <label className="ml-3 text-success">
                                  e.g. Please generate the "{key}" from  "Parent_Title"
                                  </label>
                                )}
                                {selectedOption &&
                                  selectedOption.value === "extract" && (
                                    <label className="ml-3 text-success">
                                    Note: Please enter the name of the extract string.<br/>
                                    e.g. sleeves

                                    </label>
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
                            <td>
                              {selectedOption &&
                              selectedOption.value === "extract" ? (
                                <>
                                <div className="select-container">
                                  <Select
                                    options={csvOption}
                                    onChange={(selectedOption) =>
                                      handleProductExtractChange(
                                        index,
                                        key,
                                        selectedOption
                                      )
                                    }
                                    isSearchable={true}
                                    className="select"
                                    styles={{
                                      option: (styles) => {
                                        return {
                                          ...styles,
                                        };
                                      },
                                    }}
                                  />
                                  
                                </div>
                                <label className="ml-3 text-success">
                                  Note: Please select the field from where you want to extract.

                                  </label>
                                  </>
                              ) : null}
                              {selectedOption &&
                                selectedOption.value === "use_AI" && (
                                  <label className="text-success">
                                    Please use the mentioned tag for data
                                    generation
                                    <br />
                                    {`{Parent_Title}`}
                                    <br />
                                    {`{Variant_Title}`}
                                    <br />
                                    {`{Plain_Description}`}
                                    <br />
                                    {`{Category_1}`}
                                  </label>
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
          <CustomFields
            customFieldsData={customFieldsData}
            setCustomFieldsData={setCustomFieldsData}
          />
        </div>
        
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerPage3);
