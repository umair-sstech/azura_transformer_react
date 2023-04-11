import React, { useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { onLoading } from "../../actions";

import axios from "axios";

import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function SuppilerPage3(props) {
  const { setPage } = props;
  const options = [
    { value: "Do nothing", label: "Do nothing",},
    {
      value: "Hardcode value",
      label: "Hardcode value",
      textbox: true,
      
    },
    {
      value: "Use AI",
      label: "Use AI",
      textbox: true,
   
    },
  ];

  const [productFields, setProductFields] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(productFields.length).fill(null)
  );
  const [selectedOptionCounts, setSelectedOptionCounts] = useState({});

  const history=useHistory()
  useEffect(() => {
    props.onLoading(true);
    getProductField();
  }, []);

  const handleFieldChange = (index, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[index] = selectedOption;
      return newSelectedOptions;
    });
  }; 

  const getProductField = async () => {
    try {
      props.onLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_PRODUCT}/product/getStanderdProductCatalog`
      );
      if (response.data.success) {
        setProductFields(response.data.data);
        props.onLoading(false);
      }
    } catch (error) {
      console.error(error);
      props.onLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure, <br> you want to exit ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/supplier');
      }
    });
  };

  return (
    <>
    <hr className="hr"/>

    <div className="row">
      <div className="col-lg-12 col-md-12 col-12 button-class">
        <div className="d-flex">
          <button
            className="btn btn-primary w-auto btn-lg mr-2"
            type="submit"
            onClick={() => setPage("4")}
          >
            Save & Next
          </button>
  
          <button
            className="btn btn-primary w-auto btn-lg mr-2"
            type="submit"
          >
            Save & Exit
          </button>
  
          <button className="btn btn-secondary w-auto btn-lg" type="submit" onClick={handleCancel}>
            Exit
          </button>
        </div>
      </div>
    </div>
    <div className="table-container" style={{ position: "relative" }}>
      <table>
        <thead>
          <tr>
            <th>Product Field</th>
            <th>Value</th>
            <th>Additional Info</th>
          </tr>
        </thead>
        {props.loading ? (
          <tbody>
            <tr>
              <td colSpan="3" className="loader-wrapper" style={{padding:"2.3rem",width:"60%"}}>
                <i className="fa fa-refresh fa-spin" style={{padding:"2rem"}}></i>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {productFields.map((productField, index) => {
              const keys = Object.keys(productField);
              return (
                <>
                  {keys.map((key) => {
                    const selectedOption =
                      selectedOptions[index] && selectedOptions[index][key]
                        ? selectedOptions[index][key]
                        : null;
  
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          <div className="select-container">
                            <Select
                              key={`${index}-${key}`}
                              options={options}
                              value={selectedOption}
                              onChange={(selectedOption) =>
                                handleFieldChange(index, {
                                  ...selectedOptions[index],
                                  [key]: selectedOption,
                                })
                              }
                              isSearchable={true}
                              getOptionLabel={(option) => (
                                <span style={{ color: option.color }}>
                                  {option.label}
                                </span>
                              )}
                              styles={{
                                menu: (provided, state) => ({
                                  ...provided,
                                  padding: "0px 0",
                                }),
                              }}
                              className="select"
                            />
                          </div>
                        </td>
                        <td>
                          {selectedOption && selectedOption.textbox && (
                            <input
                              type="text"
                              placeholder="Enter a value"
                              className="additional-textbox"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  </>
  
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(SuppilerPage3);
