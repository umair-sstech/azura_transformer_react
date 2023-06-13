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
import { API_PATH } from "../ApiPath/Apipath";

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
    update: false,
  });
  const [csvName, setCsvName] = useState("");
  const [fileError, setFileError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleFileInputChange = () => {
    setFileError("");
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
  //   const fileInput = document.querySelector('input[type="file"]');
  //   const { csvfile } = formData;
  //   if (csvName && !formData.update) {
  //     setPage("3");
  //   }
  //   if (fileInput.files.length === 0 && !csvfile && !formData.update) {
  //     setFileError("Please select a file to upload.");
  //   }
  //   const supplierId = localStorage.getItem("supplierId");
  //   formData.set("supplier_id", supplierId);
  //   try {
  //     const response = await axios.post(`${API_PATH.ADD_CSV_DATA}`, formData);
  //     const { success, message } = response.data;
  //     if (success) {
  //       setFormData({
  //         ...formData,
  //       });
  //       toast.success(message);
  //       setPage("3");
  //     } else {
  //       // toast.error(message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const fileInput = document.querySelector('input[type="file"]');
    console.log("fileInput--", fileInput.files);
    const { csvfile } = formData;
    if (csvName && !formData.update) {
      setPage("3");
    }

    if (fileInput.files.length === 0 && !csvfile) {
      setFileError("Please select a file to upload.");
    }
    // if ((initFormData.csvName == null && initFormData.csvPath == null) && fileInput.files.length === 0) {
    //   setFileError("Please select a file to upload.");
    // }
    else {
      const supplierId = localStorage.getItem("supplierId");
      formData.set("supplier_id", supplierId);
      setIsLoading(true);

      try {
        const response = await axios.post(`${API_PATH.ADD_CSV_DATA}`, formData);
        const { success, message } = response.data;
        if (success) {
          setFormData({
            ...formData,
          });
          toast.success(message);
          setPage("3");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const handleOnClick = async (e) => {
    const fileInput = document.querySelector('input[type="file"]');
    const { csvfile } = formData;

    if (csvName && !formData.update) {
      history.push("/supplier");
      localStorage.removeItem("supplierId");
      localStorage.removeItem("supplierName");
      localStorage.removeItem("currentPage")

    }

    if (fileInput.files.length === 0 && !csvfile) {
      setFileError("Please select a file to upload.");
    } else {
      const form = e.target.closest("form");
      const formData = new FormData(form);
      formData.append("supplier_id", initFormData.id);
      setIsLoadingExit(true);
      try {
        const response = await axios.post(`${API_PATH.ADD_CSV_DATA}`, formData);
        const { success, message, data } = response.data;
        if (success) {
          setFormData({
            ...formData,
          });
          toast.success(message);
          history.push("/supplier");
          localStorage.removeItem("supplierId");
          localStorage.removeItem("supplierName");
          localStorage.removeItem("currentPage");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
        setIsLoadingExit(false);
      }
    }
  };
  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;

        setFormData(supplierData);
        setCsvName(supplierData.csvName);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getSupplierDataById();
  }, []);

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
          <div className="alert alert-primary col-12 mt-3" role="alert">
            <strong>INFO:</strong> <br />
            Please upload the supplier CSV file that contains the header
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
                  Allowed file types: CSV(max 10MB)
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
