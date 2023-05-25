import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner, Accordion, Card } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";

function PriceCalculation(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formData, setFormData] = useState({});
  const [price, setPrice] = useState([]);
  const history = useHistory();
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    getPrice();
    getRetailerIntegrationById();
  }, []);

  const getPrice = () => {
    try {
      axios
        .get("http://localhost:2703/retailer/getPriceList")
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

  const handleSelectChange = (selectedOption, supplierId) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[supplierId] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleChange = (e, supplierId) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    if (!updatedFormData[supplierId]) {
      updatedFormData[supplierId] = {};
    }
    updatedFormData[supplierId][name] = value;
    setFormData(updatedFormData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     const retailerIntegrationId = localStorage.getItem(
  //       "retailerIntegrationId"
  //     );
  //     const supplierSettingId = localStorage.getItem("supplierSettingId");

  //     const payload = supplierSettingId.split(",").map((supplierId) => ({
  //       id: retailerIntegrationId,
  //       supplierId,
  //       costPriceField: selectedOptions.label,
  //       multipleValue: formData.multipleValue,
  //       fixedValue: formData.fixedValue,
  //       taxValue: formData.taxValue,
  //       discountValue: formData.discountValue,
  //       discountType: "percentage",
  //       extraValue: "",
  //     }));
  //     console.log("payload",payload)

  //     setIsLoading(true);
  //     axios
  //       .post(
  //         "http://localhost:2703/retailer/createOrUpdateRetailerPriceCalculation",
  //         payload
  //       )
  //       .then((response) => {
  //         const { success, message } = response.data;
  //         if (success) {
  //           toast.success(message);
  //           setPage(6);
  //         } else {
  //           toast.error(message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Failed to submit data:", error);
  //         setIsLoading(false);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );
      const supplierSettingId = localStorage.getItem("supplierSettingId");

      const payload = supplierSettingId.split(",").map((supplierId) => ({
        id: retailerIntegrationId,
        supplierId,
        costPriceField: selectedOptions[supplierId]?.label || "",
        multipleValue: formData[supplierId]?.multipleValue || "",
        fixedValue: formData[supplierId]?.fixedValue || "",
        taxValue: formData[supplierId]?.taxValue || "",
        discountValue: formData[supplierId]?.discountValue || "",
        discountType: "percentage",
        extraValue: "",
      }));

      console.log("payload", payload);

      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerPriceCalculation",
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
  };

  // const getRetailerIntegrationById = async () => {
  //   try {
  //     const id = localStorage.getItem("retailerIntegrationId");
  //     const response = await axios.post(
  //       "http://localhost:2703/retailer/getRetailerIntegrationById",
  //       {
  //         id: id,
  //       }
  //     );
  //     const { success, message, data } = response.data;
  //     if (success) {
  //       setSupplierData(data);
  //     } else {
  //       toast.error(message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to retrieve retailer integration data:", error);
  //   }
  // };

  const getRetailerIntegrationById = async () => {
    try {
      const id = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post(
        "http://localhost:2703/retailer/getRetailerIntegrationById",
        {
          id: id,
        }
      );
      const { success, message, data } = response.data;
      if (success) {
        setSupplierData(data);
  
        // Pre-fill form data and selected options based on the API response
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
  
        console.log("initialFormData",initialFormData)
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
    try {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );
      const supplierSettingId = localStorage.getItem("supplierSettingId");

      const payload = supplierSettingId.split(",").map((supplierId) => ({
        id: retailerIntegrationId,
        supplierId,
        costPriceField: selectedOptions.label,
        multipleValue: formData.multipleValue,
        fixedValue: formData.fixedValue,
        taxValue: formData.taxValue,
        discountValue: formData.discountValue,
        discountType: "percentage",
        extraValue: "",
      }));
      setIsLoadingExit(true);
      axios
        .post(
          "http://localhost:2703/retailer/createOrUpdateRetailerPriceCalculation",
          payload
        )
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
          <div className="col-12">
            {supplierData.map((supplier, index) => (
              <Accordion
                key={supplier.supplierId}
                defaultActiveKey="0"
                className="accordian__main"
              >
                <Card>
                  <Card.Header>
                    <Accordion.Toggle
                      eventKey="0"
                      as="button"
                      className="btn btn-link collapsed text-decoration-none"
                      style={{ border: "1px solid #49c5b6" }}
                    >
                      {supplier.supplierNames[0]}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
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
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 mt-3 mt-sm-0 col-md-4 col-lg-3">
                          <div className="form-group">
                            <label htmlFor="value2">Multiple</label>
                            <input
                              id="value1"
                              className="form-control"
                              placeholder="Enter Value"
                              name="multipleValue"
                              onChange={(e) =>
                                handleChange(e, supplier.supplierId)
                              }
                              value={
                                formData[supplier.supplierId]?.multipleValue ||
                                ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value2">Fixed</label>
                            <input
                              id="value2"
                              className="form-control"
                              placeholder="Enter Value"
                              name="fixedValue"
                              onChange={(e) =>
                                handleChange(e, supplier.supplierId)
                              }
                              value={
                                formData[supplier.supplierId]?.fixedValue ||
                                ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value3">Tax</label>
                            <input
                              id="value3"
                              className="form-control"
                              placeholder="Enter Value"
                              name="taxValue"
                              onChange={(e) =>
                                handleChange(e, supplier.supplierId)
                              }
                              value={
                                formData[supplier.supplierId]?.taxValue ||
                                ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <div className="form-group">
                            <label htmlFor="value4">Discount</label>
                            <input
                              id="value4"
                              className="form-control"
                              placeholder="Enter Value"
                              name="discountValue"
                              onChange={(e) =>
                                handleChange(e, supplier.supplierId)
                              }
                              value={
                                formData[supplier.supplierId]?.discountValue ||
                                ""
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}

export default PriceCalculation;
