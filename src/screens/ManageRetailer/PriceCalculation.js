import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner, Accordion, Card } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { validatePriceCalculation } from "../Validations/Validation";
import { API_PATH } from "../ApiPath/Apipath";
import "../ManageRetailer/Retailer.css";

const radioBtns = [
  { label: "Round up to Nearest Decimal Point", value: "decimal" },
  { label: "Round up to Nearest Multiple of 5", value: "5" }
]

function PriceCalculation(props) {
  const { setPage } = props;
  const { processCancel, formData, setFormData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [initFormData, setInitFormData] = useState({});
  const [price, setPrice] = useState([]);
  const history = useHistory();
  const [supplierData, setSupplierData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState(["5"]);

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  useEffect(() => {
    getPrice();
    getRetailerIntegrationById();
  }, []);

  const getPrice = () => {
    try {
      axios
        .get(`${API_PATH.GET_RETAILER_PRICE_LIST}`)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            const options = Object.keys(data).map((price) => ({
              value: data[price],
              label: price,
            }));
            setPrice(options);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve supplier list:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (event, accDataId) => {
    const { value } = event.target;
    const newSelectedRadioOption = [...selectedRadioOption];
    newSelectedRadioOption[accDataId] = value;
    setSelectedRadioOption(newSelectedRadioOption);
  };
  
  // let message;
  // const radioMsg = selectedRadioOption?.map((option) => {
  //   if (option === "decimal") {
  //     message = "e.g. Price = 17.4, Output = 18";
  //   } else if (option === "5") {
  //     message = "e.g. Price = 17, Output = 20";
  //   }
  //   return message;
  // })

  const handleSelectChange = (selectedOption, supplierId) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[supplierId] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);
    // setInitFormData({ ...initFormData, costPriceField: selectedOption.value });

    // setFormErrors({ ...formErrors, costPriceField: "" });
  };

  const handleChange = (key, value) => {
    const formData = new FormData(document.forms.priceForm);
    formData.set(key, value);
    const errors = validatePriceCalculation(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleInputChange = (e, supplierId) => {
    const { name, value } = e.target;
    const updatedFormData = { ...initFormData };
    if (!updatedFormData[supplierId]) {
      updatedFormData[supplierId] = {};
    }
    updatedFormData[supplierId][name] = value;

    setInitFormData(updatedFormData);
    handleChange(name, value);
  };

  const checkAnyValueIsNegative = (payload) => {
    return payload.some(
      (val) =>
        val.multipleValue < 0 ||
        val.fixedValue < 0 ||
        val.taxValue < 0 ||
        val.discountValue < 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const errors = validatePriceCalculation(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(initFormData);
      try {
        const retailerIntegrationId = localStorage.getItem(
          "retailerIntegrationId"
        );
        const supplierSettingId = localStorage.getItem("supplierSettingId");

        const payload = supplierSettingId.split(",").map((supplierId, idx) => ({
          id: retailerIntegrationId,
          supplierId,
          costPriceField: selectedOptions[supplierId]?.label || "",
          multipleValue: initFormData[supplierId]?.multipleValue || "",
          fixedValue: initFormData[supplierId]?.fixedValue || "",
          taxValue: initFormData[supplierId]?.taxValue || "",
          discountValue: initFormData[supplierId]?.discountValue || "",
          discountType: "percentage",
          extraValue: "",
          roundUp: selectedRadioOption[idx],
        }));
        console.log("payload", payload);
        if (
          selectedOptions[supplierSettingId].value === "" ||
          selectedOptions[supplierSettingId].label === "Select Price"
        ) {
          return toast.error("Please select Price.");
        }
        const checkNegativeValue = checkAnyValueIsNegative(payload);
        if (checkNegativeValue) {
          return toast.error("Values can not be negative.");
        }

        setIsLoading(true);
        const response = await axios.post(
          `${API_PATH.CREATE_RETAILER_PRICE}`,
          payload
        );
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          setPage(6);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Failed to submit data:", error);
        setIsLoading(false);
      }
    }
  };

  const getRetailerIntegrationById = async () => {
    try {
      const id = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post(`${API_PATH.GET_RETAILER_BY_ID}`, {
        id: id,
      });
      const { success, message, data } = response.data;
      if (success) {
        setSupplierData(data);
        const initialFormData = {};
        const initialSelectedOptions = {};

        data.forEach((supplier) => {
          initialFormData[supplier.supplierId] = {
            multipleValue: supplier.multipleValue || "",
            fixedValue: supplier.fixedValue || "",
            taxValue: supplier.taxValue || "",
            discountValue: supplier.discountValue || "",
          };
          initialSelectedOptions[supplier.supplierId] = {
            value: supplier.costPriceField || "",
            label: supplier.costPriceField || "Select Price",
          };
          
        });
  
        // const roundUpValue = data[0]?.roundUp || "5";
        // setSelectedRadioOption(roundUpValue);
        // console.log("roundupValue",roundUpValue)

        setFormData(initialFormData);
        setSelectedOptions(initialSelectedOptions);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Failed to retrieve retailer integration data:", error);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const errors = validatePriceCalculation(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const retailerIntegrationId = localStorage.getItem(
          "retailerIntegrationId"
        );
        const supplierSettingId = localStorage.getItem("supplierSettingId");

        const payload = supplierSettingId.split(",").map((supplierId) => ({
          id: retailerIntegrationId,
          supplierId,
          costPriceField: selectedOptions[supplierId]?.label || "",
          multipleValue: initFormData[supplierId]?.multipleValue || "",
          fixedValue: initFormData[supplierId]?.fixedValue || "",
          taxValue: initFormData[supplierId]?.taxValue || "",
          discountValue: initFormData[supplierId]?.discountValue || "",
          discountType: "percentage",
          extraValue: "",
          roundUp: selectedRadioOption,
        }));

        if (
          selectedOptions[supplierSettingId].value === "" ||
          selectedOptions[supplierSettingId].label === "Select Price"
        ) {
          return toast.error("Please select Price.");
        }
        const checkNegativeValue = checkAnyValueIsNegative(payload);
        if (checkNegativeValue) {
          return toast.error("Values can not be negative.");
        }

        setIsLoadingExit(true);
        axios
          .post(`${API_PATH.CREATE_RETAILER_PRICE}`, payload)
          .then((response) => {
            const { success, message } = response.data;
            if (success) {
              localStorage.removeItem("supplierSettingId");
              localStorage.removeItem("selectedSupplierName");
              localStorage.removeItem("retailerIntegrationId");
              toast.success(message);
              history.push("/setting-retailer-list");
            } else {
              toast.error(message);
            }
          })
          .catch((error) => {
            console.error("Failed to submit data:", error);
            setIsLoadingExit(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} name="priceForm">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                disabled={isLoading}
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
                onClick={handleOnClick}
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
                onClick={processCancel}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {/* {supplierData.length === 0 ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )} */}
          <div className="col-12">
            <Accordion defaultActiveKey="0" className="accordian__main">
              {supplierData.map((supplier, index) => (
                <Card key={index}>
                  <Card.Header>
                    <Accordion.Toggle
                      eventKey={index.toString()}
                      className="btn btn-link collapsed text-decoration-none"
                      style={{ border: "1px solid #49c5b6" }}
                    >
                      {supplier.supplierNames[0]}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body>
                      <div className="row ml-2">
                        <label className="text-success">
                          Price Calculation Formula: ((Cost * Multiple + Fixed )
                          * Tax) - discount %)
                        </label>
                      </div>
                      <div className="row mt-3 p-md-1">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <div>
                            <label htmlFor={`price-${index}`}>
                              Select Price
                            </label>
                            <Select
                              options={price}
                              onChange={(selectedOption) =>
                                handleSelectChange(
                                  selectedOption,
                                  supplier.supplierId
                                )
                              }
                              value={selectedOptions[supplier.supplierId]}
                              placeholder="Select Price"
                              name="costPriceField"
                              menuPlacement="top"
                            />
                            {formErrors.costPriceField && (
                              <span className="text-danger validation">
                                {formErrors.costPriceField}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6 mt-3 mt-sm-0 col-md-4 col-lg-3">
                          <div className="form-group">
                            <label htmlFor="value2">Multiple</label>
                            <input
                              id="value1"
                              className="form-control"
                              placeholder="Enter Value"
                              type="number"
                              step="any"
                              name="multipleValue"
                              onChange={(e) =>
                                handleInputChange(e, supplier.supplierId)
                              }
                              defaultValue={
                                initFormData[supplier.supplierId]
                                  ?.multipleValue || ""
                              }
                            />
                            {formErrors && formErrors.multipleValue && (
                              <span className="text-danger valiadtion">
                                {formErrors.multipleValue}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value2">Fixed</label>
                            <input
                              id="value2"
                              className="form-control"
                              placeholder="Enter Value"
                              step="any"
                              type="number"
                              name="fixedValue"
                              onChange={(e) =>
                                handleInputChange(e, supplier.supplierId)
                              }
                              defaultValue={
                                initFormData[supplier.supplierId]?.fixedValue ||
                                ""
                              }
                            />
                            {formErrors && formErrors.fixedValue && (
                              <span className="text-danger valiadtion">
                                {formErrors.fixedValue}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value3">Tax</label>
                            <input
                              id="value3"
                              className="form-control"
                              placeholder="Enter Value"
                              type="number"
                              step="any"
                              name="taxValue"
                              onChange={(e) =>
                                handleInputChange(e, supplier.supplierId)
                              }
                              defaultValue={
                                initFormData[supplier.supplierId]?.taxValue ||
                                ""
                              }
                            />
                            {formErrors && formErrors.taxValue && (
                              <span className="text-danger valiadtion">
                                {formErrors.taxValue}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value4">Discount</label>
                            <input
                              id="value4"
                              className="form-control"
                              placeholder="Enter Value"
                              type="number"
                              step="any"
                              name="discountValue"
                              onChange={(e) =>
                                handleInputChange(e, supplier.supplierId)
                              }
                              defaultValue={
                                initFormData[supplier.supplierId]
                                  ?.discountValue || ""
                              }
                            />
                            {formErrors && formErrors.discountValue && (
                              <span className="text-danger valiadtion">
                                {formErrors.discountValue}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <label htmlFor="roundupRadio mt-3" style={{padding: "0 10px"}}>Round Up Amount</label>
                      {radioBtns.map((option, idx) => (
                        <div className="row px-2" key={idx}>
                          <div className="col-12 mt-0">
                            <div className="form-group">
                              <input
                                type="radio"
                                value={option.value}
                                name={`roundUp-${index}`}
                                id={`roundupRadio-${index}-${idx}`}
                                onChange={(e) => handleRadioChange(e, index)}
                                checked={selectedRadioOption[index] === option.value}
                              />
                              <label className="radio-inline text-dark px-2">
                                { option.label }
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className="col-lg-12">
                        {radioMsg.length > 0 && (
                          <label className="text-success">
                            {radioMsg.map((msg, idx) => (
                              <div key={idx}>{msg}</div>
                            ))}
                          </label>
                        )}
                      </div> */}
                        {/* {radioMsg.split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))} */}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </div>
        </div>
      </form>
    </>
  );
}

export default PriceCalculation;
