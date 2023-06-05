import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PATH } from "../ApiPath/Apipath";
import { FormContext } from "./ManageSuppiler";
import { Spinner } from "react-bootstrap";

function SupplierPage6(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);

  const options = [
    {
      label: "ASIN",
      value: "ASIN",
    },
    { label: "ISBN", value: "ISBN" },
    { label: "UPC", value: "UPC" },
    {
      label: "EAN",
      value: "EAN",
    },
  ];

  const [formData, setFormData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataFileMapping, setDataFileMapping] = useState([]);
  const [formError,setFormError]=useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const history=useHistory()

  useEffect(() => {
    getDatafileMapping();
    getBarcodeData(); 
  }, []);

  const handleOptionChange = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
    setFormError({});
  };
  
  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const  supplierId  = localStorage.getItem("supplierId");
    const isBarcodeRequired = isChecked;
    const barcodeName = selectedOptions.join(","); 

    if (selectedOptions.length === 0) {
      setFormError({ message: "Please select at least one option." });
      return;
    }
    setIsLoading(true);
    axios
      .post(`${API_PATH.BARCODE}`, {
        barcodeName,
        supplierId,
        isBarcodeRequired,
      })
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage("7");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);

      });
  };
  
  const handleOnClick=(e)=>{
    e.preventDefault();
  
    const  supplierId  = localStorage.getItem("supplierId");
    const isBarcodeRequired = isChecked;
    const barcodeName = selectedOptions.join(","); 

    if (selectedOptions.length === 0) {
      setFormError({ message: "Please select at least one option." });
      return;
    }
    setIsLoadingExit(true);
    axios
      .post(`${API_PATH.BARCODE}`, {
        barcodeName,
        supplierId,
        isBarcodeRequired,
      })
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          localStorage.removeItem("supplierId");
          localStorage.removeItem("supplierName");
          history.push("/supplier");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingExit(false);

      });
  }
 
  const getDatafileMapping = () => {
    const supplierId = localStorage.getItem("supplierId");
    axios
      .get(`${API_PATH.GET_SUPPLIER_FILE_MAPPING}=${supplierId}`)
      .then((response) => {
        const supplierData = response.data.data;
        setFormData(supplierData.supplier_product_field);

        const supplierMapping = supplierData.supplier_product_field;

        const filteredOptions = supplierMapping
          .filter((field) => ["ISBN", "UPC", "EAN", "ASIN"].includes(field.standardField))
          .map((field) => ({
            label: field.supplierField,
            value: field.standardField,
          }));
        setDataFileMapping(filteredOptions);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getBarcodeData = () => {
    const supplierId = localStorage.getItem("supplierId");
  
    if (supplierId) {
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          setFormData(supplierData);
          console.log("object,", supplierData);
  
          const barcodeName = supplierData.barcodeName || "";
          const preselectedOptions = barcodeName.split(",");
          setSelectedOptions(preselectedOptions);
  
          const isBarcodeRequired = supplierData.isBarcodeRequired || false;
          console.log("isbarcodeRequired",isBarcodeRequired)
          setIsChecked(isBarcodeRequired);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="row mt-3 mt-md-0">
      <div className="col-12">
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isChecked}
              onChange={handleCheckChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Would you like to search data in barcodelookup.com?
            </label>
          </div>
        </div>
      </div>
    </div>
  

    {isChecked && (
      <>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button className="btn btn-primary w-auto btn-lg mr-2" type="submit">
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Next"
                )}
              </button>
              <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" onClick={handleOnClick}>
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
          <div className="col-12">
          {formError && <span className="text-danger">{formError.message}</span>}
            <table className="w-50 barcode-table table-responsive-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Field</th>
                  <th>Mapping Field</th>
                </tr>
              </thead>
              <tbody>
                {dataFileMapping.length > 0 ? (
                  dataFileMapping.map((option) => (
                    <tr key={option.value}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.value)}
                          onChange={() => handleOptionChange(option.value)}
                        />
                      </td>
                      <td>{option.value}</td>
                      <td>{option.label}</td>
                    </tr>
                  ))
                ) : (
                  options.map((option) => (
                    <tr key={option.value}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.value)}
                          onChange={() => handleOptionChange(option.value)}
                        />
                      </td>
                      <td>{option.label}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
    
    
        
      </form>
    </>
  );
}

export default SupplierPage6;
