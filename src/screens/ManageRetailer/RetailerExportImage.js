import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import "./Retailer.css";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { API_PATH } from "../ApiPath/Apipath";

function RetailerExportImage(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [supplierImageList, setSupplierImageList] = useState([]);
  const [selectedImageSizes, setSelectedImageSizes] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const id = localStorage.getItem("retailerIntegrationId");
  //       const response = await axios.post(API_PATH.GET_RETAILER_BY_ID, {
  //         id: id,
  //       });
  //       const { success, data } = response.data;

  //       if (success && data.length > 0) {
  //         const selectedSizes = data[0].supplierImageSize;
  //         setSelectedImageSizes(selectedSizes);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("retailerIntegrationId");
        const response = await axios.post(API_PATH.GET_RETAILER_BY_ID, {
          id: id,
        });
        const { success, data } = response.data;

        if (success && data.length > 0) {
          const selectedSizes = {};
          data.forEach((supplier) => {
            selectedSizes[supplier.supplierId] = supplier.supplierImageSize;
          });
          setSelectedImageSizes(selectedSizes);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supplierIds = localStorage.getItem("supplierSettingId");
      const response = await axios.post(`${API_PATH.GET_RETAILER_IMAGE_LIST}`, {
        supplierId: supplierIds,
      });
      const { success, data } = response.data;
      if (success) {
        setSupplierImageList(data);
      } else {
        console.error("Failed to fetch supplier image data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const requestData = [];
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );

      Object.entries(supplierImageList).forEach(
        ([supplierName, supplierData]) => {
          supplierData.forEach((item) => {
            const selectedSizes = item.imageResize
              ?.split(",")
              .filter((size, index) => {
                const checkbox = document.getElementById(
                  `radio-${item.id}-${index}`
                );
                return checkbox.checked;
              })
              .join(",");

            if (selectedSizes) {
              requestData.push({
                id: retailerIntegrationId,
                supplierId: item.id,
                supplierImageSize: selectedSizes,
              });
            }
          });
        }
      );

      if (requestData.length === 0) {
        toast.error("You must select atleast one image size.");
        return;
      }

      const response = await axios.post(
        `${API_PATH.CREATE_RETAILER_IMAGE}`,
        requestData
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setPage(5);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingExit(true);
      const requestData = [];
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );

      Object.entries(supplierImageList).forEach(
        ([supplierName, supplierData]) => {
          supplierData.forEach((item) => {
            const selectedSizes = item.imageResize
              .split(",")
              .filter((size, index) => {
                const checkbox = document.getElementById(
                  `radio-${item.id}-${index}`
                );
                return checkbox.checked;
              })
              .join(",");

            if (selectedSizes) {
              requestData.push({
                id: retailerIntegrationId,
                supplierId: item.id,
                supplierImageSize: selectedSizes,
              });
            }
          });
        }
      );

      if (requestData.length === 0) {
        toast.error("You must select atleast one image size.");
        return;
      }

      const response = await axios.post(
        `${API_PATH.CREATE_RETAILER_IMAGE}`,
        requestData
      );
      const { success, message } = response.data;
      if (success) {
        localStorage.removeItem("supplierSettingId");
        localStorage.removeItem("selectedSupplierName");
        localStorage.removeItem("retailerIntegrationId");
        toast.success(message);
        history.push("/setting-retailer-list");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingExit(false);
    }
  };

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
        <div className="row mt-3" style={{backgroundColor: "#6c757d0f"}}>
          {supplierImageList.length === 0 ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          <div className="col-md-6">
            <Accordion defaultActiveKey="0" className="accordian__main">
              {Object.entries(supplierImageList).map(
                ([supplierName, supplierData], index) => (
                  <Card key={index}>
                    <Card.Header>
                      <Accordion.Toggle
                        className="btn btn-link collapsed text-decoration-none"
                        eventKey={index.toString()}
                        style={{ borderBottom: "2px solid #49c5b6" }}
                      >
                        <i className="fa fa-angle-down arrow"></i>
                        <label className="">{supplierName}</label>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse
                      eventKey={index.toString()}
                      className="card-body"
                    >
                      <Card.Body>
                        <table className="table w-100 table-bordered">
                          <thead>
                            <tr>
                              <th>
                                <div className="checkbox-container">
                                  <label htmlFor="parent-checkbox"></label>
                                </div>
                              </th>
                              <th>Image Size</th>
                            </tr>
                          </thead>
                          {/* <tbody className="image-size-list">
                          {supplierData.map((item) => (
                            <>
                              {item?.imageResize?.split(",").map((size, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <div className="checkbox-container">
                                    <input
                                    type="radio"
                                    name="supplierImageSize"
                                    id={`radio-${item.id}-${idx}`}
                                    value={size}
                                    checked={size === selectedImageSizes}
                                    onChange={(e) => {
                                      setSelectedImageSizes(e.target.value);
                                    }}
                                  />
                                  
                                      <label htmlFor={`radio-${item.id}-${idx}`}></label>
                                    </div>
                                  </td>
                                  <td>{size}</td>
                                </tr>
                              ))}
                            </>
                          ))}
                                  </tbody>*/}

                          <tbody className="image-size-list">
                            {supplierData.map((item) => (
                              <>
                                {item?.imageResize
                                  ?.split(",")
                                  .map((size, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        <div className="checkbox-container">
                                          <input
                                            type="radio"
                                            name={`supplierImageSize-${item.id}`}
                                            id={`radio-${item.id}-${idx}`}
                                            value={size}
                                            checked={
                                              selectedImageSizes[item.id] ===
                                              size
                                            }
                                            onChange={(e) => {
                                              const newSelectedImageSizes = {
                                                ...selectedImageSizes,
                                                [item.id]: e.target.value,
                                              };
                                              setSelectedImageSizes(
                                                newSelectedImageSizes
                                              );
                                            }}
                                          />
                                          <label
                                            htmlFor={`radio-${item.id}-${idx}`}
                                          ></label>
                                        </div>
                                      </td>
                                      <td>{size}</td>
                                    </tr>
                                  ))}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                )
              )}
            </Accordion>
          </div>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(RetailerExportImage);
