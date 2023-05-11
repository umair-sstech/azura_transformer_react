import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./Retailer.css";
import axios from "axios";

function RetailerExportImage(props) {
  const { setPage } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [supplierImageList, setSupplierImageList] = useState([]);

  useEffect(() => {
    const getSupplierImageList = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:2703/retailer/getSupplierImageList",
          { supplierId: "1,2" }
        );
        setSupplierImageList(response.data.data["UP Feed"]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getSupplierImageList();
  }, []);

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
          <div className="col-12 table-class">
            <table className="table w-100 ">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Image Size</th>
                  <th>Image Prefix Name</th>
                  <th>Image Suffix Name</th>
                </tr>
              </thead>
              <tbody className="image-size-list">
                {supplierImageList.map((image, index) => (
                  <>
                    <tr key={`${index}-1`}>
                      <td>{image.name}</td>
                      {/* <td>{image.imageResize.split(',').map((size, i) => <div key={`${index}-1-${i}`}>{size}</div>)}</td>*/}
                      <td>{image.imageResize}</td>
                      <td>{image.imagePrefix}</td>
                      <td>{image.imageSuffix}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
}

export default RetailerExportImage;
