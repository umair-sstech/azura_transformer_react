import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { API_PATH } from "../ApiPath/Apipath";
import { onLoading } from "../../actions"
import { connect } from 'react-redux';

function CurrencyConversion(props) {
  const { setPage } = props;
  const {
    processCancel,
  } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const history = useHistory()

  useEffect(() => {
    getSupplierData();
    getRetailerIntegrationData()
  }, []);

  const getSupplierData = () => {
    try {
      axios
        .get(`${API_PATH.GET_CURRENCY}`)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            const options = Object.keys(data).map((currency) => ({
              value: data[currency],
              label: currency,
            }));
            setCurrencyList(options);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve supplier list:", error);
        });
    } catch (error) {
      console.log(error);
    }

  };

  const setDefaultCurrency = currencyList?.find((data) => data?.label?.includes("USD"))

  const handleSelectChange = (selectedOptions) => {
    setSelectedCurrency(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCurrency?.value === null) {
      return toast.error("Please select a currency")
    }

    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
    const currencyId = currencyList.find((currency) => currency?.value === selectedCurrency)?.value;

    const payload = {
      id: retailerIntegrationId,
      currencyId: selectedCurrency !== null ? selectedCurrency?.value : setDefaultCurrency?.value
    };
    setIsLoading(true);
    axios
      .post(`${API_PATH.CREAT_CURRENCY}`, payload)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          setPage(4);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error("Failed to submit data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRetailerIntegrationData = async () => {
    try {
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post(`${API_PATH.GET_RETAILER_BY_ID}`, { id: retailerIntegrationId });
      const { success, data } = response.data;

      if (success && data.length > 0) {
        const selectedCurrencyOption = {
          value: data[0].currencyId === null ? "645b88c21dc294747c33338e" : data[0].currencyId,
          label: data[0].currencyNames === undefined ? "USD" : data[0].currencyNames ,
        };
        setSelectedCurrency(selectedCurrencyOption);
      }
    } catch (error) {
      console.error("Failed to retrieve retailer integration data:", error);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault()
    if (selectedCurrency.value === null) {
      return toast.error("Please select a currency")
    }

    setIsLoadingExit(true);

    const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
    const currencyId = currencyList.find((currency) => currency?.value === selectedCurrency)?.value;

    const payload = {
      id: retailerIntegrationId,
      currencyId: selectedCurrency !== null ? selectedCurrency?.value : setDefaultCurrency?.value
    };
    axios
      .post(`${API_PATH.CREAT_CURRENCY}`, payload)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          localStorage.removeItem("supplierSettingId");
          localStorage.removeItem("selectedSupplierName");
          localStorage.removeItem("retailerIntegrationId");
        localStorage.removeItem("currentPage");

          toast.success(message);
          history.push("/setting-retailer-list")
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error("Failed to submit data:", error);
      })
      .finally(() => {
        setIsLoadingExit(false);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel}>
                Exit
              </button>
            </div>
          </div>
        </div>
        {props.loading && (
          <div className='loader-wrapper' >
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        )}
        <div className="row mt-3 mt-sm-0">
          <div className="col-sm-6">
            <label>Select Currency</label>
            <Select
              options={currencyList}
              placeholder="Select Currency"
              onChange={handleSelectChange}
              value={selectedCurrency ? selectedCurrency : setDefaultCurrency}
            />

          </div>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});

export default connect(mapStateToProps, { onLoading })(CurrencyConversion);
