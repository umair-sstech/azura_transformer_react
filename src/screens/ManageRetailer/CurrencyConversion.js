import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

function CurrencyConversion(props) {
  const { setPage } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [currencyList,setCurrencyList] = useState([]);

  useEffect(() => {
    getSupplierData()
  }, []);

  const getSupplierData=()=>{
    try {
      axios
      .get("http://localhost:2703/retailer/getCurrency")
      .then((response) => {
        const{success,message,data}=response.data
        if (success) {
          const options = Object.keys(response.data.data).map((currency) => ({
            value: currency,
            label: currency,
          }));
          setCurrencyList(options);
        } else {
          toast.error(message)
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve supplier list:", error);
      });
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form>
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
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>
              <button className="btn btn-secondary w-auto btn-lg" type="button">
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label>Select Currency</label>
            <Select options={currencyList}  placeholder="Select Currency" />
          </div>
        </div>
      </form>
    </>
  );
}
export default CurrencyConversion
