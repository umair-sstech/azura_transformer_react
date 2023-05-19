import React, { useContext, useEffect, useState } from "react";
import "./SupplierPage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageSuppiler";
import { Spinner } from "react-bootstrap";

function SuppilerPage4(props) {
  const { setPage } = props;
  const { processCancel, setFormData } = useContext(FormContext);
  const history = useHistory();
  const imageSize = ["762x1100", "1200x1600", "1000x1000", "1600x2000"];
  useEffect(() => {
    getSupplierDataById();
  }, []);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  const handleParentCheckboxChange = (e) => {
    const childCheckboxes = document.querySelectorAll(
      '.image-size-list input[type="checkbox"]:not(#parent-checkbox)'
    );
    setSelectedSizes([]);
    childCheckboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
      const { value, checked } = checkbox;
      if (checked) {
        setSelectedSizes((prev) => [...prev, value]);
      } else {
        setSelectedSizes((prev) => prev.filter((size) => size !== value));
      }
    });
    const allChecked = [...childCheckboxes].every(
      (checkbox) => checkbox.checked
    );
    setFormErrors((prevErrors) => {
      if (allChecked) {
        delete prevErrors.checkbox;
      }
      return prevErrors;
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes((prev) => [...prev, value]);
    } else {
      setSelectedSizes((prev) => prev.filter((size) => size !== value));
    }
    setFormErrors((prevErrors) => {
      delete prevErrors.checkbox;
      return prevErrors;
    });
  };

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
    setFormErrors((prevErrors) => {
      delete prevErrors.prefix;
      return prevErrors;
    });
  };

  const handleSuffixChange = (e) => {
    setSuffix(e.target.value);
    setFormErrors((prevErrors) => {
      delete prevErrors.suffix;
      return prevErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (selectedSizes.length === 0) {
      errors.checkbox = "Please select at least one size.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    axios
      .post(`${API_PATH.IMAGE_RESIZE}`, {
        supplierId: localStorage.getItem("supplierId"),
        supplierName: localStorage.getItem("supplierName"),
        imageResize: selectedSizes.join(),
        imagePrefix: prefix,
        imageSuffix: suffix,
      })
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage("5");
          setSelectedSizes([]);
          setPrefix("");
          setSuffix("");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    let errors = {};
    if (selectedSizes.length === 0) {
      errors.checkbox = "Please select at least one size.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoadingExit(true);
    axios
      .post(`${API_PATH.IMAGE_RESIZE}`, {
        supplierId: localStorage.getItem("supplierId"),
        supplierName: localStorage.getItem("supplierName"),
        imageResize: selectedSizes.join(),
        imagePrefix: prefix,
        imageSuffix: suffix,
      })
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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingExit(false);
      });
  };

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;
        setFormData(supplierData);

        setSelectedSizes(supplierData.imageResize.split(","));
        setPrefix(supplierData.imagePrefix);
        setSuffix(supplierData.imageSuffix);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <form>
        <div className="row fixed-btn-grp">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={(e) => handleSubmit(e)}
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
                onClick={processCancel}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="supplier4__container">
          <div>
            {formErrors.checkbox && (
              <span className="text-danger">{formErrors.checkbox}</span>
            )}
            <table className="table w-100">
              <thead>
                <tr>
                  <th>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="parent-checkbox"
                        onChange={handleParentCheckboxChange}
                      />
                      <label htmlFor="parent-checkbox"></label>
                    </div>
                  </th>
                  <th>Image Size</th>
                </tr>
              </thead>
              <tbody className="image-size-list">
                {imageSize.map((size, index) => (
                  <tr key={index}>
                    <td>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={size}
                          onChange={handleCheckboxChange}
                          checked={selectedSizes.includes(size)}
                        />
                        <label htmlFor={`checkbox-${index}`}></label>
                      </div>
                    </td>
                    <td>{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 input-p4">
            <div className="form-group mb-3">
              <label htmlFor="prefix">Prefix:</label>
              <input
                type="text"
                className="form-control"
                id="prefix"
                placeholder="Enter Prefix Name"
                value={prefix}
                onChange={handlePrefixChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="suffix">Suffix:</label>
              <input
                type="text"
                className="form-control"
                id="suffix"
                placeholder="Enter Suffix Name"
                value={suffix}
                onChange={handleSuffixChange}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SuppilerPage4;
