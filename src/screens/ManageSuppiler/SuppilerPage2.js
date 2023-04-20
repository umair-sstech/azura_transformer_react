import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import countryList from "../../Data/countryList";
import { FormContext } from "./ManageSuppiler";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import Papa from "papaparse";

function SupplierPage2(props) {
  const { setPage } = props;
  const {
    setIsSupplierAdded,
    isSupplierAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);

  const [initFormData, setInitFormData] = useState({
    csvfile: "",
    supplier_id: "",
  });
  console.log("supplierId", initFormData.id);
  const [fileError, setFileError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleFileInputChange = () => {
    setFileError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      setFileError("Please select a file to upload.");
    } else {
      const form = e.target;
      const formData = new FormData(form);
      const supplierId = localStorage.getItem("supplierId");
      formData.set("supplier_id", supplierId);
      props.onLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/csv/storeCSVdata`,
          formData
        );
        const { success, message } = response.data;
        if (success) {
          // const { csvPath, csvName, csvJSON } = response.data.data;
          setFormData({
            ...formData,
            // csvPath, csvName, csvJSON
          });
          toast.success(message);

          props.onLoading(false);
          setPage("3");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
        props.onLoading(false);
      }
    }
  };

  const handleOnClick = async (e) => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      setFileError("Please select a file to upload.");
    } else {
      const form = e.target.closest("form");
      const formData = new FormData(form);
      formData.append("supplier_id", initFormData.id);
      // props.onLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/csv/storeCSVdata`,
          formData
        );
        const { success, message } = response.data;
        if (success) {
          // const { csvPath, csvName, csvJSON } = response.data.data;
          setFormData({
            ...formData,
            // csvPath, csvName, csvJSON
          });
          toast.success(message);
          localStorage.removeItem("supplierId");
          localStorage.removeItem("supplierName");
          history.push("/supplier");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
        props.onLoading(false);
      }
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/supplier");
      }
    });
  };



  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 button-class">
              <div className="d-flex">
                <button
                  className="btn btn-primary w-auto btn-lg mr-2"
                  type="submit"
                >
                  {props.isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Please wait...
                    </>
                  ) : isSupplierAdded ? (
                    "Update"
                  ) : (
                    "Save & Next"
                  )}
                </button>
                <button
                  className="btn btn-primary w-auto btn-lg mr-2"
                  type="submit"
                  onClick={handleOnClick}
                >
                  Save & Exit
                </button>
                <button
                  className="btn btn-secondary w-auto btn-lg"
                  type="button"
                  onClick={handleCancel}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>
                  Upload File <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="csvfile"
                  accept=".csv"
                  onChange={handleFileInputChange}
                />
                {fileError && <p style={{ color: "red" }}>{fileError}</p>}
                <small className="form-text text-muted csv-text">
                  Allowed file types: CSV.
                </small>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SupplierPage2);
