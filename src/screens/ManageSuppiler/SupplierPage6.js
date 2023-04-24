import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageSuppiler";

function SupplierPage6(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);

  const [formData, setFormData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { barcodeName } = formData;
    const supplierId = localStorage.getItem("supplierId");
    const isBarcodeRequired = isChecked;

    axios
      .post(`${API_PATH.BARCODE}`, {
        barcodeName,
        supplierId,
        isBarcodeRequired,
      })
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage("7");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
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
                Save & Next
              </button>

              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                Save & Exit
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

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isChecked}
                  onChange={handleCheckChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Would you like to search data in barcodelookup.com?
                </label>
              </div>
            </div>
          </div>
        </div>

        {isChecked && (
          <>
            <div className="row mt-3">
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Barcode Name <span style={{ color: "red" }}></span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="barcodeName"
                    placeholder="Enter Barcode Name"
                    onChange={handleInputChange}
                  />
                  {/*  {formErrors.urlPath && (
                  <span className="text-danger">{formErrors.urlPath}</span>
              )}*/}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Row 1, Column 1</td>
                      <td>Row 1, Column 2</td>
                      <td>Row 1, Column 3</td>
                    </tr>
                    <tr>
                      <td>Row 2, Column 1</td>
                      <td>Row 2, Column 2</td>
                      <td>Row 2, Column 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default SupplierPage6;
