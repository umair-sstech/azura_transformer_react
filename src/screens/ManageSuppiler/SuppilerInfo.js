import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "./ManageSuppiler";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { useHistory } from "react-router-dom";
import "./SupplierPage.css";
import Select from "react-select";
import { validateIntegrationInfoForm } from "../Validations/Validation";
import { Spinner } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";

function SuppilerInfo(props) {
  const { setPage } = props;
  const {
    setIsSuppilerAdded,
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
    name: "",
    logo: "",
    type: "",
  });

  const [prefixName, setPrefixName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  useEffect(() => {
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  useEffect(() => {
    getSupplierDataById();
  }, []);

  const generatePrefixName = (name) => {
    let prefix = "";
    const words = name?.split(" ");
    for (let i = 0; i < words?.length && i < 3; i++) {
      prefix += words[i].charAt(0);
    }
    prefix = prefix.toUpperCase();
    if (prefix?.length < 3) {
      const remainingChars = 3 - prefix?.length;
      prefix += name.substring(0, remainingChars).toUpperCase();
    }
    return prefix;
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const prefix = generatePrefixName(name);
    setPrefixName(prefix);

    const formData = new FormData(document.forms.myForm);
    const errors = validateIntegrationInfoForm(formData);
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
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const errors = validateIntegrationInfoForm(formData);
    if (initFormData.logo) {
      delete errors.logo;
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("name"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      setIsLoading(true);

      const supplierId = localStorage.getItem("supplierId");
       
      if (supplierId) {
        formData.set("supplierId", supplierId);
        axios
          .post(`${API_PATH.UPDATE_INTEGRATION_INFO}`, formData)
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              setIsSuppilerAdded(true);
              setPage("2");
              toast.success(message);
            } else {
              toast.error(message);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
          });
      } else {
        axios
          .post(`${API_PATH.CREATE_INTEGRATION_INFO}`, formData)
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              const supplierId = data.id;
              if (supplierId) {
                localStorage.setItem("supplierId", supplierId);
              }
              const supplierName = data.name;
              if (supplierName) {
                localStorage.setItem("supplierName", supplierName);
              }
              setIsSuppilerAdded(true);
              setPage("2");
              toast.success(message);
            } else {
              toast.error(message);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
          });
      }
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    setIsLoadingExit(true);
    const supplierId = localStorage.getItem("supplierId");
       

    if (supplierId) {
      formData.set("supplierId", supplierId);
      axios
        .post(`${API_PATH.UPDATE_INTEGRATION_INFO}`, formData)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
           history.push("/supplier");
           localStorage.removeItem("supplierId");
           localStorage.removeItem("supplierName")
            toast.success(message);
          } else {
            toast.error(message);
          }
         setIsLoadingExit(false)
        })
        .catch((error) => {
          console.log("error", error);
         setIsLoadingExit(false)
        });
    } else {
      axios
        .post(`${API_PATH.CREATE_INTEGRATION_INFO}`, formData)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            const supplierId = data.id;
            if (supplierId) {
              localStorage.setItem("supplierId", supplierId);
            }
            const supplierName = data.name;
            if (supplierName) {
              localStorage.setItem("supplierName", supplierName);
            }
            setIsSuppilerAdded(true);
            setPage("2");
            toast.success(message);
          } else {
            toast.error(message);
          }
         setIsLoadingExit(false)
        })
        .catch((error) => {
          console.log("error", error);
         setIsLoadingExit(false)
        });
    }
  
  };

  const getSupplierDataById = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;
        setSelectedOption({
          value: supplierData.type,
          label: supplierData.type,
        });
        setPrefixName(supplierData.prefixName);
        setFormData(supplierData);
      })
      .catch((error) => {
        console.log("error", error);
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

          <div className="row mt-3 mt-lg-0">
            <div className="col-sm-6">
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
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  Supplier Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Supplier Name"
                  onChange={handleNameChange}
                  defaultValue={initFormData.name ? initFormData.name : ""}
                />
                {formErrors.name && (
                  <span className="text-danger">{formErrors.name}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>
                  {" "}
                  Supplier Logo <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  className="form-control"
                  type="file"
                  name="logo"
                  onChange={handleLogoChange}
                  defaultValue={initFormData.logo ? initFormData.logo : ""}
                />
                {formErrors.logo && (
                  <span className="text-danger">{formErrors.logo}</span>
                )}
                <small className="form-text text-muted csv-text">
                  Allowed Logo types & size: JPEG, JPG, PNG with 50kb 
                </small>
              </div>
            </div>

            <div className="col-sm-6">
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

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerInfo);
