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

function SuppilerPage2(props) {
  const {setIsSuppilerAdded,
    isSuppilerAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);

  const formdata = new FormData();
  const history=useHistory()


  const [initFormData, setInitFormData] = useState({
    upload_file: "",
  });

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);
  const handleSubmit = (e) => {

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setFormData(formData);

    setIsSuppilerAdded(false); 
    props.onButtonClick();
  };
  const handleOnClick=()=>{
    history.push("/supplier")
  }

  return (
    <form nSubmit={handleSubmit}>
      <div style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>
                Upload File <span style={{ color: "red" }}>*</span>
              </label>
              <input className="form-control" type="file" name="upload_file" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                
              >
                {props.isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : isSuppilerAdded ? (
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
            type="submit"
            onClick={handleOnClick}
          >
          Exit
          </button>
              {isSuppilerAdded ? (
                <button
                  className="btn btn-secondary w-auto btn-lg"
                  onClick={processCancel}
                  disabled={props.isLoading}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SuppilerPage2;
