import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import "../ManageRetailer/Retailer.css"

function RetailerExportImage(props) {
  const { setPage } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
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
          <div className="col-6">
          <table className="table ">
          <thead>
            <tr>
              <th>
                Supplier Name
              </th>
              <th>Image Size</th>
              <th>Image Prefix Name</th>
              <th>Image Suffix Name</th>
            </tr>
          </thead>
          <tbody className="image-size-list">
            
          </tbody>
        </table>
          </div>
        </div>
      </form>
    </>
  );
}

export default RetailerExportImage
