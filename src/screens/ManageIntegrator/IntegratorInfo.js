import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./ManageIntegrator";
import { validateMarketPlaceInfoForm } from "../Validations/Validation";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Select from "react-select";

function IntegratorInfo(props) {
  const { setPage } = props;
  const {
    isMarketPlaceAdded,
    setIsMarketPlaceAdded,
    formData,
    setFormData,
    processCancel,
  } = useContext(FormContext);
  const options = [
    { value: "Integrator", label: "Integrator" },
    { value: "Supplier", label: "Supplier", isDisabled: true },
    { value: "market_place", label: "Market Place", isDisabled: true },
    { value: "shopping_cart", label: "Shopping Cart", isDisabled: true },
    { value: "Carrier", label: "Carrier", isDisabled: true },
    { value: "TMS", label: "TMS", isDisabled: true },
    { value: "WMS", label: "WMS", isDisabled: true },
  ];
 
  const [initFormData, setInitFormData] = useState({
    prefixName: "",
    name: "",
    logo: "",
    type: "",
  });

  const [prefixName, setPrefixName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

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
    const errors = validateMarketPlaceInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setInitFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));

    const formData = new FormData(document.forms.myForm);

    formData.set("logo", file);
    const errors = validateMarketPlaceInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const errors = validateMarketPlaceInfoForm(formData);
    setFormErrors(errors);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/market-integrator");
      }
    });
  };
  return (
    <>
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
                  ) : isMarketPlaceAdded ? (
                    "Update"
                  ) : (
                    "Save & Next"
                  )}
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
                  Integrator Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Integrator Name"
                  onChange={handleNameChange}
                  defaultValue={
                    initFormData.name
                      ? initFormData.name
                      : ""
                  }
                />
                {formErrors.name && (
                  <span className="text-danger">
                    {formErrors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  {" "}
                  Integrator Logo <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="logo"
                  onChange={handleLogoChange}
                  defaultValue={
                    initFormData.logo
                      ? initFormData.logo
                      : ""
                  }
                />
                {formErrors.logo && (
                  <span className="text-danger">
                    {formErrors.logo}
                  </span>
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
          </div>
        </div>
      </form>
    </>
  );
}

export default IntegratorInfo;
