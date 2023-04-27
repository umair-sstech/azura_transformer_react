import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "./ManageMarketPlace";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import "../ManageMarketPlace/MarketPlace.css";
import { validateIntegrationInfoForm } from "../Validations/Validation";
import { API_PATH } from "../ApiPath/Apipath";
function MarketPlacePage1(props) {
  const { setPage } = props;
  const {
    isMarketPlaceAdded,
    setIsMarketPlaceAdded,
    formData,
    setFormData,
    setLogoData,
    processCancel,
  } = useContext(FormContext);
  const history = useHistory();

  const options = [
    { value: "market_place", label: "Market Place" },
    { value: "Supplier", label: "Supplier", isDisabled: true },
    { value: "shopping_cart", label: "Shopping Cart", isDisabled: true },
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
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (formData) {
      setInitFormData(formData);
    }
  }, [props]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  useEffect(() => {
    getSupplierDataById();
  }, []);

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
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setInitFormData((prevState) => ({
      ...prevState,
      marketPlaceLogo: file,
    }));

    const formData = new FormData(document.forms.myForm);

    formData.set("marketPlaceLogo", file);
    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const errors = validateIntegrationInfoForm(formData);
    setFormErrors(errors);
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("name"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      props.onLoading(true);

      const marketPlaceId = localStorage.getItem("marketPlaceId");
      console.log("marketPlaceId", marketPlaceId);

      if (marketPlaceId) {
        formData.set("supplierId", marketPlaceId);
        axios
          .post(
            `${process.env.REACT_APP_API_URL_SUPPLIER}/integration/updateIntegrationInfo`,
            formData
          )
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              setIsMarketPlaceAdded(true);
              setPage("2");
              toast.success(message);
            } else {
              toast.error(message);
            }
            props.onLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setSubmitting(false);
          });
      } else {
        axios
          .post(`${API_PATH.CREATE_INTEGRATION_INFO}`, formData)
          .then((response) => {
            console.log("response", response);
            const { success, message, data } = response.data;
            if (success) {
              const marketPlaceId = data.id;
              if (marketPlaceId) {
                localStorage.setItem("marketPlaceId", marketPlaceId);
              }
              const marketPlaceName = data.name;
              if (marketPlaceName) {
                localStorage.setItem("marketPlaceName", marketPlaceName);
              }
              setIsMarketPlaceAdded(true);
              setPage("2");
              toast.success(message);
            } else {
              toast.error(message);
            }
            setSubmitting(false);
          })
          .catch((error) => {
            console.log("error", error);
            setSubmitting(false);
          });
      }
    }
  };

  const getSupplierDataById = () => {
    const marketPlaceId = localStorage.getItem("marketPlaceId");
    axios
      .get(`${API_PATH.GET_INTEGRATION_INFO_BY_ID}=${marketPlaceId}`)
      .then((response) => {
        const marketPlaceData = response.data.data;
        setSelectedOption({
          value: marketPlaceData.type,
          label: marketPlaceData.type,
        });
        setPrefixName(marketPlaceData.prefixName);
        setFormData(marketPlaceData);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      const prefixName = generatePrefixName(formData.get("name"));
      setPrefixName(prefixName);
      formData.set("prefixName", prefixName);

      props.onLoading(true);

      const marketPlaceId = localStorage.getItem("marketPlaceId");
      console.log("marketPlaceId", marketPlaceId);

      if (marketPlaceId) {
        formData.set("supplierId", marketPlaceId);
        axios
          .post(
            `${process.env.REACT_APP_API_URL_SUPPLIER}/integration/updateIntegrationInfo`,
            formData
          )
          .then((response) => {
            const { success, message, data } = response.data;
            if (success) {
              setIsMarketPlaceAdded(true);
              toast.success(message);
              history.push("/market-place");

              localStorage.removeItem("marketPlaceId");
              localStorage.removeItem("marketPlaceName");
            } else {
              toast.error(message);
            }
            props.onLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setSubmitting(false);
          });
      } else {
        axios
          .post(`${API_PATH.CREATE_INTEGRATION_INFO}`, formData)
          .then((response) => {
            console.log("response", response);
            const { success, message, data } = response.data;
            if (success) {
              const marketPlaceId = data.id;
              if (marketPlaceId) {
                localStorage.setItem("marketPlaceId", marketPlaceId);
              }
              const marketPlaceName = data.name;
              if (marketPlaceName) {
                localStorage.setItem("marketPlaceName", marketPlaceName);
              }
              setIsMarketPlaceAdded(true);
              toast.success(message);
              history.push("/market-place");

              localStorage.removeItem("marketPlaceId");
              localStorage.removeItem("marketPlaceName");
            } else {
              toast.error(message);
            }
            setSubmitting(false);
          })
          .catch((error) => {
            console.log("error", error);
            setSubmitting(false);
          });
      }
    }
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
                  Save & Next
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
                  Market Place Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Market Place Name"
                  onChange={handleNameChange}
                  defaultValue={initFormData.name ? initFormData.name : ""}
                />
                {formErrors.name && (
                  <span className="text-danger">{formErrors.name}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>
                  {" "}
                  Market Place Logo <span style={{ color: "red" }}>*</span>
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
export default connect(mapStateToProps, { onLoading })(MarketPlacePage1);
