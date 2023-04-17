import React, { useState } from "react";
import Select from "react-select";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SupplierPage7() {
  const history = useHistory();
  const options = [
    { value: "two_tire", label: "Two Tiers" },
    { value: "three_tire", label: "Three Tiers" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();

    if (selectedOption) {
      const params = {
        supplierId: localStorage.getItem("supplierId"),
        productTier: selectedOption.value,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/productTierSetup`, params)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            toast.success(message);
            localStorage.removeItem("supplierId");
            localStorage.removeItem("supplierName");
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
        localStorage.removeItem("supplierId");
        localStorage.removeItem("supplierName");
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
                onClick={handleSaveAndExit}
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

        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label>
                Product Tier type <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                placeholder="Select Product Tier type"
                name="productTier"
                value={selectedOption}
                options={options}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SupplierPage7;
