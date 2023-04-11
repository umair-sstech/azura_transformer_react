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



function SupplierPage2(props) {
  const { setPage } = props;
  const { setIsSupplierAdded, isSupplierAdded, formData, setFormData, processCancel } = useContext(FormContext);
 
  const [initFormData, setInitFormData] = useState({
    upload_file: "",
  });
  const [fileError, setFileError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      setFileError("Please select a file to upload.");
    } else {
      const form = e.target;
      const formData = new FormData(form);
      setFormData(formData);
      // setIsSupplierAdded(false);
      setPage("3");
    }
  };

  const handleOnClick = (e) => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      setFileError("Please select a file to upload.");
    } else {
      const form = e.target.closest("form");
      const formData = new FormData(form);
      setFormData(formData);
      history.push("/supplier");
    }
  };
  
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure, <br> you want to exit ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/supplier');
      }
    });
  };

  const handleFileInputChange = () => {
    setFileError("");
  }

  return (
    <>
    <hr className="hr"/>
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "30px" }}>
      <div className="row">
      <div className="col-lg-12 col-md-12 col-12 button-class">
        <div className="d-flex">
          <button className="btn btn-primary w-auto btn-lg mr-2" type="submit">
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
          <button className="btn btn-primary w-auto btn-lg mr-2" type="button" onClick={handleOnClick}>
            Save & Exit
          </button>
          <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={handleCancel}>
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
              <input className="form-control" type="file" name="upload_file"  accept=".csv" onChange={handleFileInputChange}/>
              {fileError && <p style={{ color: "red" }}>{fileError}</p>}
              <small className="form-text text-muted">
             
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

export default SupplierPage2;


