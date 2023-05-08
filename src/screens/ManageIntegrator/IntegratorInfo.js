import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./ManageIntegrator";
import { validateIntegrationInfoForm } from "../Validations/Validation";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { API_PATH } from "../ApiPath/Apipath";
import { toast } from "react-toastify";
import axios from "axios";

function IntegratorInfo(props) {
  const { setPage } = props;
  const {
    isIntegrator,
    setIsIntegrator,
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
  const opt = [{ value: "Flaxpoint", label: "Flaxpoint" }];
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
  const [selectedOpt, setSelectedOpt] = useState(opt[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  useEffect(() => {
    getDataById();
  }, []);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // const generatePrefixName = (name) => {
  //   let prefix = "";
  //   const words = name.split(" ");
  //   for (let i = 0; i < words.length && i < 3; i++) {
  //     prefix += words[i].charAt(0);
  //   }
  //   prefix = prefix.toUpperCase();
  //   if (prefix.length < 3) {
  //     const remainingChars = 3 - prefix.length;
  //     prefix += name.substring(0, remainingChars).toUpperCase();
  //   }
  //   return prefix;
  // };

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

  useEffect(() => {
    const defaultName = opt[0].value;
    const defaultPrefix = generatePrefixName(defaultName);
    setPrefixName(defaultPrefix);
  }, []);

  const handleSelectChange = (selectedOpt) => {
    setSelectedOpt(selectedOpt);
    const name = selectedOpt ? selectedOpt.value : "";
    setFormErrors({});
    const formData = new FormData(document.forms.myForm);
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    const prefixName = generatePrefixName(name);
    setPrefixName(prefixName);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const handleNameChange = (e) => {
    const name = e.target.value;
    const prefix = generatePrefixName(name);
    setPrefixName(prefix);

    const formData = new FormData(document.forms.myForm);
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("name"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      setIsLoading(true);

      const integratorId = localStorage.getItem("integratorId");
      console.log("integratorId", integratorId);

      if (integratorId) {
        formData.set("supplierId", integratorId);
        axios
          .post(
            `${process.env.REACT_APP_API_URL_SUPPLIER}/integration/updateIntegrationInfo`,
            formData
          )
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              setIsIntegrator(true);
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
              const integratorId = data.id;
              if (integratorId) {
                localStorage.setItem("integratorId", integratorId);
              }
              const integratorName = data.name;
              if (integratorName) {
                localStorage.setItem("integratorName", integratorName);
              }
              setIsIntegrator(true);
              setPage("2");
              toast.success(message);
            } else {
              toast.error(message);
            }
          })
          .catch((error) => {
            console.log("error", error);
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
    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("name"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      setIsLoadingExit(true);

      const integratorId = localStorage.getItem("integratorId");
      console.log("integratorId", integratorId);

      if (integratorId) {
        formData.set("supplierId", integratorId);
        axios
          .post(
            `${process.env.REACT_APP_API_URL_SUPPLIER}/integration/updateIntegrationInfo`,
            formData
          )
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              setIsIntegrator(true);
              toast.success(message);
              history.push("/integrator");
              localStorage.removeItem("integratorId");
              localStorage.removeItem("integratorName");
            } else {
              toast.error(message);
            }
            setIsLoadingExit(false);
          })
          .catch((error) => {
            console.log("error", error);
            setIsLoadingExit(false);
          });
      } else {
        axios
          .post(`${API_PATH.CREATE_INTEGRATION_INFO}`, formData)
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              const integratorId = data.id;
              if (integratorId) {
                localStorage.setItem("integratorId", integratorId);
              }
              const integratorName = data.name;
              if (integratorName) {
                localStorage.setItem("integratorName", integratorName);
              }
              setIsIntegrator(true);
              toast.success(message);
              history.push("/integrator");
              localStorage.removeItem("integratorId");
              localStorage.removeItem("integratorName");
            } else {
              toast.error(message);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  };

  const getDataById = () => {
    const integratorId = localStorage.getItem("integratorId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${integratorId}`)
      .then((response) => {
        const integratorId = response.data.data;
        setSelectedOption({
          value: integratorId.type,
          label: integratorId.type,
        });
        setPrefixName(integratorId.prefixName);
        setFormData(integratorId);
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
                {/* <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Integrator Name"
                  onChange={handleNameChange}
                  defaultValue={initFormData.name ? initFormData.name : ""}
               />   {formErrors.name && (
                  <span className="text-danger">{formErrors.name}</span>
                )}*/}

                <Select
                  value={selectedOpt}
                  onChange={handleSelectChange}
                  options={opt}
                  name="name"
                />
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
                  defaultValue={initFormData.logo ? initFormData.logo : ""}
                />
                {formErrors.logo && (
                  <span className="text-danger">{formErrors.logo}</span>
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

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(IntegratorInfo);
