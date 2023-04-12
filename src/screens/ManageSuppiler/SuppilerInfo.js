import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "./ManageSuppiler";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";
import Select from "react-select";
import Swal from "sweetalert2";
import { validateSupplierInfoForm } from "../Validations/Validation";
import { Spinner } from "react-bootstrap";

function SuppilerInfo(props) {
  const { setPage } = props;
  const {
    setIsSuppilerAdded,
    isSuppilerAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);
  const history = useHistory();
  const options = [
    { value: "Supplier", label: "Supplier" },
    { value: "Market Place", label: "Market Place", isDisabled: true },
    { value: "Shopping Cart", label: "Shopping Cart", isDisabled: true },
    { value: "Carrier", label: "Carrier", isDisabled: true },
    { value: "TMS", label: "TMS", isDisabled: true },
    { value: "WMS", label: "WMS", isDisabled: true },
    { value: "Integrator", label: "Integrator", isDisabled: true },
  ];

  const [initFormData, setInitFormData] = useState({
    prefixName: "",
    suplirName: "",
    supplireLogo: "",
    type: "",
  });
  console.log("formdata", initFormData);
  const [prefixName, setPrefixName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

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

    const formData = new FormData(document.forms.myForm);
    const errors = validateSupplierInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setInitFormData((prevState) => ({
      ...prevState,
      supplireLogo: file,
    }));

    const formData = new FormData(document.forms.myForm);
    formData.set("supplireLogo", file);
    const errors = validateSupplierInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const errors = validateSupplierInfoForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("suplirName"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      props.onLoading(true);

      axios
        .post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createSupplireInfo`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          setFormData(formData);
          setIsSuppilerAdded(true);
          setPage("2");
          toast.success("Add supplier successfully");

          // Set isLoading back to false after the API call is complete
          props.onLoading(false);
        })
        .catch((error) => {
          console.log(error);

          props.onLoading(false);
        });
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const errors = validateSupplierInfoForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("suplirName"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      axios
        .post(
          `${process.env.REACT_APP_API_URL_SUPPLIER}/supplire/createSupplireInfo`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          setFormData(formData);
          setIsSuppilerAdded(true);
          history.push("/supplier");
          toast.success("Add supplier successfully");
        })
        .catch((error) => {
          console.log(error);
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
        history.push("/supplier");
      }
    });
  };

  return (
    <>
      <hr className="hr" />

      <form onSubmit={handleSubmit} name="myForm" encType="multipart/form-data">
        <div style={{ marginTop: "35px" }}>
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
                {props.isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : isSuppilerAdded ? (
                  "Update"
                ) : (
                  "Save & Exit"
                )}
                  
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
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="combo-box-demo">Type of Integrations</label>
                <Select
                  defaultValue={selectedOption}
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  isDisabled={false}
                  name="type"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  Suppiler Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="suplirName"
                  placeholder="Enter Suppiler Name"
                  onChange={handleNameChange}
                />
                {formErrors.suplirName && (
                  <span className="text-danger">{formErrors.suplirName}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  {" "}
                  Logo <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="supplireLogo"
                  onChange={handleLogoChange}
                />
                {formErrors.supplireLogo && (
                  <span className="text-danger">{formErrors.supplireLogo}</span>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label>Prefix Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Prefix name"
                  disabled
                  name="prefixName"
                  value={prefixName}
                />
              </div>
            </div>
            {/* <div className="col-6">
            <div className="form-group">
              <label>
                Type 
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Type"
                name="type"
              />
            </div>
                </div>*/}
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
