import React, { useEffect, useState } from "react";
import "./SupplierPage.css";
import SupplierSftpForm from "./SupplierSftpForm";
import SupplierHttpForm from "./SupplierHttpForm";
import axios from "axios";
import { API_PATH } from "../ApiPath/Apipath";
import { Form } from "react-bootstrap";
function SupplierPage5(props) {
  const { setPage } = props;

  const options = [
    { value: "SFTP", label: "SFTP / FTP" },
    { value: "HTTP", label: "HTTP" },
  ];

  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supplierId = localStorage.getItem("supplierId");

    if (supplierId) {
      setIsLoading(true);
      axios
        .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
        .then((response) => {
          const supplierData = response.data.data;
          setSelectedValue(supplierData?.settingType);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("error", error);
        }).finally(() => {
          setIsLoading(false);
        });
      }
    }, []);

  const handleSftpSubmit = () => {
    setPage(6);
  };

  const handleHttpSubmit = () => {
    setPage(6);
  };

  
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isLoading ? (
          <div className="loader-wrapper">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
        ) : (
          // <div style={{ marginRight: "32px" }} className="select__container">
          //   <label htmlFor="combo-box-demo" style={{ marginBottom: "8px" }}>
          //     Type
          //   </label>
          //   <Select
          //     options={options}
          //     onChange={handleSelectChange}
          //     className="select-option"
          //     // value={selectedValue}
          //     defaultValue={selectedValue || "Select Any Option"}
          //   />
          // </div>
          <div>
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom" className="d-flex align-items-center justify-content-between" style={{gap: "20px"}}>
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
                  {selectedValue === null || (
                    <option value="" key="">Select..</option>
                  )}
                  {options.map((item, idx) => (
                    <option key={idx} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        )}
        {selectedValue && selectedValue === "SFTP" && (
          <SupplierSftpForm
            onSubmit={handleSftpSubmit}
            settingType={selectedValue}
          />
        )}
        {selectedValue && selectedValue === "HTTP" && (
          <SupplierHttpForm
            onSubmit={handleHttpSubmit}
            settingType={selectedValue}
          />
        )}
        
      </div>
    </>
  );
}

export default SupplierPage5;
