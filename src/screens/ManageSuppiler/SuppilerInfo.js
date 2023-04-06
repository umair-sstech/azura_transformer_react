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

function SuppilerInfo(props) {
  console.log("props", props);
  const {
    setIsSuppilerAdded,
    isSuppilerAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);
  const history=useHistory()

  const formdata = new FormData();

  const [initFormData, setInitFormData] = useState({
    name: "",
    logo: "",
  });


  const [prefixName, setPrefixName] = useState("");
  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const generatePrefixName = (name) => {
    let prefix = "";
    const words = name.split(" ");
    for (let i = 0; i < words.length && i < 3; i++) {
      prefix += words[i].charAt(0);
    }
    prefix = prefix.toUpperCase();
    if (prefix.length < 3) {
      const remainingChars = 3 - prefix.length;
      prefix += name.substring(0, remainingChars).toUpperCase();
    }
    return prefix;
  };
  

  const handleNameChange = (e) => {
    const name = e.target.value;
    const prefix = generatePrefixName(name);
    setPrefixName(prefix);
  };

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
    <>
      <form onSubmit={handleSubmit} name="myForm" >
        <div style={{ marginTop: "35px" }}>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>
                  Suppiler Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Suppiler Name"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label> Logo</label>
                <input className="form-control" type="file" name="logo" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>
                  Prefix Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Prefix name"
                  disabled
                  value={prefixName}
                />
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
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerInfo);
