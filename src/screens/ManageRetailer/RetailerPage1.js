import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { API_PATH } from "../ApiPath/Apipath";

function RetailerPage1(props) {
  const { setPage } = props;
  const {
    processCancel,
  } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const history = useHistory()

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  useEffect(() => {
    getSupplierData();
    getRetailerIntegrationData()
  }, []);

  const getSupplierData = () => {
    try {
      axios
        .get(`${API_PATH.GET_RETAILER_SUPPLIER_LIST}`)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            const options = Object.keys(data).map((supplierName) => ({
              value: data[supplierName],
              label: supplierName,
            }));
            setSupplierList(options);
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

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("_id");
    const userName = localStorage.getItem("name");
    const retailerId = localStorage.getItem("newlyAddedRetailer");
    const selectedSupplierIds = selectedOptions.map((option) => option.value);
    const selectedSupplierNames = selectedOptions.map((option) => option.label);

    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId ? retailerIntegrationId : "", // Check if "id" exists and use it for update, otherwise leave it empty for create
      userId,
      userName,
      retailerId,
      companyId: null,
      supplierId: selectedSupplierIds.join(","),
    };

    if (!payload.supplierId) {
      toast.error("Please select atleast one supplier");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_PATH.CREATE_RETAILER_SUPPLIER}`,
        payload
      );

      const { success, message, data } = response.data;

      if (success) {
        const newRetailerIntegrationId = response.data.retailerIntegrationId;

        localStorage.setItem("retailerIntegrationId", newRetailerIntegrationId);
        localStorage.setItem("supplierSettingId", selectedSupplierIds.join(","));
        localStorage.setItem(
          "selectedSupplierName",
          JSON.stringify(selectedSupplierNames)
        );
        toast.success(message);
        setIsLoading(false);
        setPage(2);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }

    setIsLoading(false);
  };


  const getRetailerIntegrationData = async () => {
    try {
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post(`${API_PATH.GET_RETAILER_BY_ID}`, { id: retailerIntegrationId });
      const { success, data } = response.data;

      if (success && data.length > 0) {
        const selectedSupplierOptions = data.map((entry) => ({
          value: entry.supplierId,
          label: entry.supplierNames[0],
        }));
        setSelectedOptions(selectedSupplierOptions);
      }
    } catch (error) {
      console.error("Failed to retrieve retailer integration data:", error);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault()

    const userId = localStorage.getItem("_id");
    const userName = localStorage.getItem("name");
    const retailerId = localStorage.getItem("newlyAddedRetailer");
    const selectedSupplierIds = selectedOptions.map((option) => option.value);
    const selectedSupplierNames = selectedOptions.map((option) => option.label);

    const payload = {
      userId,
      userName,
      retailerId,
      companyId: null,
      supplierId: selectedSupplierIds.join(","),
    };
    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
    if (retailerIntegrationId) {
      payload.id = retailerIntegrationId;
    }

    if (!payload.supplierId) {
      toast.error("Please select atleast one supplier");
      return;
    }

    try {
      setIsLoadingExit(true);
      const response = await axios.post(
        `${API_PATH.CREATE_RETAILER_SUPPLIER}`,
        payload
      );

      const { success, message, data } = response.data;

      if (success) {
        localStorage.removeItem("supplierSettingId");
        localStorage.removeItem("selectedSupplierName");
        localStorage.removeItem("retailerIntegrationId");
        toast.success(message);
        history.push("/setting-retailer-list")
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }

    setIsLoadingExit(false);
  }

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
              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel}>
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3 mt-sm-0">
          <div className="col-sm-6">
            <label>Select your Supplier(s)</label>
            <Select
              options={supplierList}
              isMulti
              onChange={handleSelectChange}
              value={selectedOptions}
              placeholder="Select Supplier"
            />

          </div>
        </div>
      </form>
    </>
  );
}

export default RetailerPage1;
