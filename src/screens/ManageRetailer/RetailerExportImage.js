import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import "./Retailer.css";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retailerIntegrationId = localStorage.getItem(
          "retailerIntegrationId"
        );
        const response = await axios.post(
          "http://localhost:2703/retailer/getRetailerIntegrationById",
          { id: retailerIntegrationId }
        );
        const { success, data } = response.data;
        const imageSizeMap = {};
        data.forEach((item) => {
          imageSizeMap[item.id] = item.supplierImageSize.split(",");
        });
        setSelectedImageSizes(imageSizeMap);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supplierIds = localStorage.getItem("supplierSettingId");
      const response = await axios.post(
        "http://localhost:2703/retailer/getSupplierImageList",
        { supplierId: supplierIds }
      );
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
            const selectedSizes = item.imageResize?.split(",")
              .filter((size, index) => {
                const checkbox = document.getElementById(
                  `checkbox-${item.id}-${index}`
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

      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerImage",
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
                  `checkbox-${item.id}-${index}`
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

      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerImage",
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
        <div className="row mt-3">
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
                        style={{ border: "1px solid #49c5b6" }}
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
                          <tbody className="image-size-list">
                            {supplierData.map((item) => (
                              <tr key={item.id}>
                                <td>
                                  {item.imageResize &&
                                    item.imageResize
                                      .split(",")
                                      .map((size, index) => (
                                        <div
                                          key={index}
                                          className="checkbox-size"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`checkbox-${item.id}-${index}`}
                                          />
                                          {size}
                                        </div>
                                      ))}
                                </td>
                              </tr>
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
