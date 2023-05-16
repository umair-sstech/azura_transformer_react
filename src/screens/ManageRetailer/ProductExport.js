import React, { useState, useEffect } from 'react';
import "../ManageRetailer/Retailer.css"
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

function ProductExport() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supplierIds = localStorage.getItem("supplierSettingId");
    if (supplierIds) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:2703/retailer/getSupplierProduct",
          { supplierId: supplierIds }
        );
        const { success, data } = response.data;
        if (success) {
          setData(data);
        } else {
          console.error("Failed to fetch supplier product data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    // TODO: Implement checkbox logic
  };

  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                disabled={isLoading}
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
                disabled={isLoadingExit}
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
        <div className='row'>
          <table className='product-table table w-100'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    onChange={handleCheckboxChange}
                  />
                </th>
                <th>Id</th>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
              {/* Render table rows based on data */}
              {data && data.supplier_product.map((product) => (
                <tr key={product.supplierId}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{product.supplierId}</td>
                  <td>{data.supplier_list[product.supplierId]}</td>
                  <td>{product.Azura_Category_Tree}</td>
                  <td>{product.product_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

export default ProductExport;
