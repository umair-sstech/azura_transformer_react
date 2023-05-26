import React, { useState, useEffect, useContext } from "react";
import "../ManageRetailer/Retailer.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onLoading } from "../../actions";

function ProductExport(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const supplierIds = localStorage.getItem("supplierSettingId");
    if (supplierIds) {
      try {
        const response = await axios.post(
          "http://localhost:2703/retailer/getSupplierProduct",
          { supplierId: supplierIds }
        );
        const { success, data } = response.data;
        console.log('data',data.supplier_list)
        if (success) {
          setData(data);
        } else {
          console.error("Failed to fetch supplier product data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll(
      '.product-table tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  
  const checkAnyCheckboxChecked = (checkboxes) => {
    return Object.values(checkboxes).some(box => box.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );

      const supplierSettingId = localStorage.getItem("supplierSettingId");
      const requestData = supplierSettingId.split(",").map((supplierId) => ({
        id: retailerIntegrationId,
        supplierId,
        categoryId: "",
        productCount: "",
      }));

      console.log("requestData", requestData);
      const checkboxes = document.querySelectorAll(
        '.product-table tbody input[type="checkbox"]'
      );
      const selectedCategories = [];
      const selectedProductCounts = [];
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const product = data.supplier_product[index];
          selectedCategories.push(product.category_id);
          selectedProductCounts.push(product.product_count);
        }
      });
      requestData[0].categoryId = selectedCategories.join(",");
      requestData[0].productCount = selectedProductCounts.join(",");

      const isChecked = checkAnyCheckboxChecked(checkboxes)
      if(!isChecked) {
        toast.error("Please select atleast one value.");
        return;
      }

      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerCategory",
        requestData
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setPage(3);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const getRetailerIntegrationData = async () => {
    try {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );

      const response = await axios.post(
        "http://localhost:2703/retailer/getRetailerIntegrationById",
        { id: retailerIntegrationId }
      );
      const { success, data } = response.data;

      if (success && data.length > 0) {
        const selectedCategories = data[0].categoryId.split(",");
        console.log("selectedCategories", selectedCategories);
        setSelectedCheckboxes(selectedCategories);
      }
    } catch (error) {
      console.error("Failed to retrieve retailer integration data:", error);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const retailerIntegrationId = localStorage.getItem(
        "retailerIntegrationId"
      );
      const supplierSettingId = localStorage.getItem("supplierSettingId");
      const requestData = [
        {
          id: retailerIntegrationId,
          supplierId: supplierSettingId,
          categoryId: "",
          productCount: "",
        },
      ];
      const checkboxes = document.querySelectorAll(
        '.product-table tbody input[type="checkbox"]'
      );
      const selectedCategories = [];
      const selectedProductCounts = [];
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const product = data.supplier_product[index];
          selectedCategories.push(product.category_id);
          selectedProductCounts.push(product.product_count);
        }
      });
      requestData[0].categoryId = selectedCategories.join(",");
      requestData[0].productCount = selectedProductCounts.join(",");

      const isChecked = checkAnyCheckboxChecked(checkboxes)
      if(!isChecked) {
        toast.error("Please select atleast one value.");
        return;
      }

      setIsLoadingExit(true)
      const response = await axios.post(
        "http://localhost:2703/retailer/createOrUpdateRetailerCategory",
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

  useEffect(() => {
    // getRetailerIntegrationData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <div className='row'>
          {!data ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          <table className='product-table  w-100 table-responsive-sm'>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={handleCheckboxChange} />
                </th>
                <th>Id</th>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
            {data &&
              data.supplier_product.map((product, index) => (
                <tr key={product.supplierId}>
                  <td style={{ width: "5%" }}>
                  <input
                  type="checkbox"
                />
                

                  </td>
                  <td style={{ width: "6%" }}>{product.supplierId}</td>
                  <td style={{ width: "30%" }}>
                    {product.supplierData} 
                  </td>
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

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});

export default connect(mapStateToProps, { onLoading })(ProductExport);

