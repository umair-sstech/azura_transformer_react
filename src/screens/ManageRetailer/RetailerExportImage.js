import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import "./Retailer.css";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";

function RetailerExportImage(props) {
  const { setPage } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [supplierImageList, setSupplierImageList] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supplierIds = localStorage.getItem("supplierSettingId");
      console.log("supplierId", supplierIds); // Fetching supplierIds from localStorage
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

  const submitData = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const requestData = [];
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");


      // Iterate over the supplier image list to gather the selected image sizes
      Object.entries(supplierImageList).forEach(([supplierName, supplierData]) => {
        supplierData.forEach((item) => {
          const selectedSizes = item.imageResize
            .split(",")
            .filter((size, index) => {
              const checkbox = document.getElementById(`checkbox-${item.id}-${index}`);
              return checkbox.checked;
            })
            .join(",");

          if (selectedSizes) {
            requestData.push({
              id: retailerIntegrationId,
              supplierId: item.id,
              supplierImageSize: selectedSizes
            });
          }
        });
      });
      if(requestData.length === 0) {
        toast.error("You must select atleast one Image Size.");
      } else {
        console.log("payload", requestData)
        const response = await axios.post(
          "http://localhost:2703/retailer/createOrUpdateRetailerImage",
          requestData
        );
        const { success } = response.data;
        if (success) {
          toast.success("Data submitted successfully");
          setPage(5);
        } else {
          console.error("Failed to submit data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitData}>
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
              {Object.entries(supplierImageList).map(([supplierName, supplierData], index) => (
                <Card key={index}>
                  <Card.Header>
                    <Accordion.Toggle
                      className="btn btn-link collapsed text-decoration-none"
                      eventKey={index.toString()}
                      style={{ border: "1px solid #49c5b6" }}
                    >
                      <i className="fa fa-angle-down arrow"></i>
                      <label className=''>{supplierName}</label>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index.toString()} className="card-body">
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
                          {/* {supplierData.map((item) => (
                            <tr key={item.id}>
                              <td>
                                {item.imageResize.split(",").map((size, index) => (
                                  <div key={index} className="checkbox-size">
                                    <input type="checkbox" id={`checkbox-${item.id}-${index}`} />
                                    {size}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          ))} */}
                          {supplierData.map((item) => (
                            <>
                              {item.imageResize.split(",").map((size, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-${item.id}-${idx}`}
                                        value={size}
                                      />
                                      <label htmlFor={`checkbox-${index}`}></label>
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
              ))}
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
