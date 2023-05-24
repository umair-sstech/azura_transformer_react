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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState([]);
  const [price, setPrice] = useState([]);
  const history=useHistory()

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     const retailerIntegrationId = localStorage.getItem(
  //       "retailerIntegrationId"
  //     );
  //     const supplierSettingId = localStorage.getItem("supplierSettingId");

  //     const payload = [
  //       {
  //         id: retailerIntegrationId,
  //         supplierId: supplierSettingId,
  //         costPriceField: selectedOptions.label,
  //         multipleValue: formData.multipleValue,
  //         fixedValue: formData.fixedValue,
  //         taxValue: formData.taxValue,
  //         discountValue: formData.discountValue,
  //         discountType: "percentage",
  //         extraValue: "",
  //       },
  //     ];
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
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
  
      setIsLoading(true);
      axios
        .post(
          "http://localhost:2703/retailer/createOrUpdateRetailerPriceCalculation",
          payload
        )
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            setPage(6);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to submit data:", error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
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
        const {
          costPriceField,
          multipleValue,
          fixedValue,
          taxValue,
          discountValue,
        } = data[0];
        setSelectedOptions({ label: costPriceField, value: costPriceField });
        setFormData({
          multipleValue,
          fixedValue,
          taxValue,
          discountValue,
        });
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
            history.push("/setting-retailer-list")
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
            <Accordion defaultActiveKey="0" className="accordian__main">
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    eventKey="0"
                    as="button"
                    className="btn btn-link collapsed text-decoration-none"
                    style={{ border: "1px solid #49c5b6" }}>
                    Supplier Name
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="row mt-3 p-md-1">
                      <div className="col-sm-6 col-md-4 col-lg-3">
                        <div>
                          <label htmlFor="price">Select Price</label>
                          <Select options={price}
                            onChange={handleSelectChange}
                            value={selectedOptions}
                            placeholder="Select Price"
                            name="costPriceField" />
                        </div>
                      </div>
                      <div className="col-sm-6 mt-3 mt-sm-0 col-md-4 col-lg-3">
                        <div className="form-group">
                          <label htmlFor="value1">Multiple</label>
                          <input
                            id="value1"
                            className="form-control"
                            placeholder="Enter Value"
                            name="multipleValue"
                            onChange={handleChange}
                            value={formData.multipleValue || ''}
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
                            onChange={handleChange}
                            value={formData.fixedValue || ''}
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
                            onChange={handleChange}
                            value={formData.taxValue || ''}
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
                            onChange={handleChange}
                            value={formData.discountValue || ''}
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </form>
    </>
  );
}

export default PriceCalculation;
