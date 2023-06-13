import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./ManageSuppiler";

import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { Spinner } from "react-bootstrap";

function SupplierPage7(props) {
  const { processCancel, setFormData } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  const history = useHistory();
  const options = [
    { value: "two_tire", label: "Two Tier" },
    { value: "three_tire", label: "Three Tier" },
  ];
  useEffect(() => {
    getData();
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      setErrorMessage("Please select a value");
      return;
    }

    if (selectedOption) {
      const params = {
        supplierId: localStorage.getItem("supplierId"),
        productTier: selectedOption.value,
      };
      setIsLoadingExit(true);
      axios
        .post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/integration/productTierSetup`,
          params
        )
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
            localStorage.removeItem("supplierId");
            localStorage.removeItem("supplierName");
        localStorage.removeItem("currentPage")

            history.push("/supplier");
          } else {
            toast.error(message);
          }
          // Swal.fire({
          //   title: 'Product Tier Saved',
          //   icon: 'success',
          //   confirmButtonText: 'OK',
          //   customClass: {
          //     confirmButton: 'btn btn-primary',
          //   },
          // }).then(() => {
          //   localStorage.removeItem('supplierId');
          //   localStorage.removeItem('supplierName');
          //  history.push("/supplier")
          // });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error Occurred",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        });
    }
  };

  const getData = () => {
    const supplierId = localStorage.getItem("supplierId");
  
    if (supplierId) {
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          setFormData(supplierData);
          const productTierValue = supplierData.productTier;
          const selectedOption = options.find(
            (option) => option.value === productTierValue
          );
          setSelectedOption(selectedOption);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => setIsLoadingExit(false));
    }
  };

  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={handleSubmit}
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

        <div className="row mt-3 mt-sm-0">
          <div className="col-sm-6">
            <div className="form-group">
              <label>
                Product Tier type <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                placeholder="Select Product Tier Type"
                name="productTier"
                value={selectedOption}
                options={options}
                onChange={handleSelectChange}
              />
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SupplierPage7;
