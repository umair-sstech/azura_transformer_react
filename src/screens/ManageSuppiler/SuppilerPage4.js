import React, { useEffect, useState } from "react";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SuppilerPage4(props) {
  const { setPage } = props;
  const history = useHistory();
  const imageSize = [
    "762x1100",
    "1200x1600",
    "1000x1000",
    "1600x2000",
    "Original",
  ];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

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
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes((prev) => [...prev, value]);
    } else {
      setSelectedSizes((prev) => prev.filter((size) => size !== value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createOrUpdateSupplierImageResize`,
        {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          imageResize: selectedSizes.join(),
          imagePrefix: prefix,
          imageSuffix: suffix,
        }
      )
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage("5");
          // setSelectedSizes([]);
          // setPrefix("");
          // setSuffix("");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createOrUpdateSupplierImageResize`,
        {
          supplierId: localStorage.getItem("supplierId"),
          supplierName: localStorage.getItem("supplierName"),
          imageResize: selectedSizes.join(),
          imagePrefix: prefix,
          imageSuffix: suffix,
        }
      )
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
      .catch((err) => console.log(err));
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
                // onClick={() => setPage("5")}
                onClick={(e) => handleSubmit(e)}
              >
                Save & Next
              </button>

              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={(e) => handleOnClick(e)}
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
        <div className="d-flex flex-wrap">
          <div className="table-responsive w-50 pr-3">
            <table className="table w-50">
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
          <div className="w-25 mt-3 input-p4">
            <div className="form-group mb-3">
              <label htmlFor="prefix">Prefix:</label>
              <input
                type="text"
                className="form-control"
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="suffix">Suffix:</label>
              <input
                type="text"
                className="form-control"
                id="suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SuppilerPage4;
