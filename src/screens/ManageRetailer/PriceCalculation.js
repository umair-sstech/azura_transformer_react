import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Accordion, Card } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

function PriceCalculation(props) {
  const {setPage}=props
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState([]);

  const [price, setPrice] = useState([]);

  useEffect(() => {
    getPrice();
    getRetailerIntegrationById()
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
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
      const supplierSettingId = localStorage.getItem("supplierSettingId");

      const payload = [
        {
          id: retailerIntegrationId,
          supplierId: supplierSettingId,
          costPriceField: selectedOptions.label,
          multipleValue: formData.multipleValue,
          fixedValue: formData.fixedValue,
          taxValue: formData.taxValue,
          discountValue: formData.discountValue,
          discountType: "percentage",
          extraValue: "",
        }
      ];

    

      console.log("payload",payload)
      axios
        .post(
          "http://localhost:2703/retailer/createOrUpdateRetailerPriceCalculation",
          payload
        )
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
           
           toast.success(message)
           setPage(6)
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to submit data:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getRetailerIntegrationById = async () => {
    try {
      const id = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post("http://localhost:2703/retailer/getRetailerIntegrationById", {
        id: id
      });
      const { success,message, data } = response.data;
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
                disabled={isLoadingExit}
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>
              <button className="btn btn-secondary w-auto btn-lg" type="button">
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="row ml-5 mt-3">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="price">Select Price</label>
                <Select
                  options={price}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  placeholder="Select Price"
                  name="costPriceField"
                />
              </div>
            </div>
            <div className="col-2">
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
            <div className="col-2">
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
            <div className="col-2">
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
            <div className="col-2">
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
        </div>
      </form>
    </>
  );
}

export default PriceCalculation;
