import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import "./Retailer.css";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import axios from "axios";

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async (e) => {
    e.preventDefault()
    try {
      setIsLoadingExit(true);
      const requestData = [];
      const retailerIntegrationId= localStorage.getItem("retailerIntegrationId");

  
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
  
      console.log("payload",requestData)
      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerImage",
        requestData
      );
      const { success } = response.data;
      if (success) {
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingExit(false);
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
        <div className="row">
        <div className="col-6">
        <Accordion defaultActiveKey="0" className="accordian__main">
          {Object.entries(supplierImageList).map(([supplierName, supplierData], index) => (
            <Card key={index}>
              <Card.Header>
                <Accordion.Toggle
                  as="button"
                  className="btn btn-link collapsed border  text-decoration-none"
                  eventKey={index.toString()}
                >
                  <i className="fa fa-angle-down arrow"></i>
                  <label className=''>{supplierName}</label>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index.toString()} className="card-body">
                <Card.Body>
                  <div className="d-flex justify-content-around">
                  <table className="table w-100 table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th className="p-1">Image Size</th>
                    </tr>
                  </thead>
                  <tbody className="image-size-list">
                    {supplierData.map((item) => (
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
                    ))}
                  </tbody>
                </table>
                
                  </div>
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
