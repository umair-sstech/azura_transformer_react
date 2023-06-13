import React, { useState, useEffect, useContext } from "react";
import "../ManageRetailer/Retailer.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { API_PATH } from "../ApiPath/Apipath";

function ProductExport(props) {
  const { setPage } = props;
  const { processCancel } = useContext(FormContext);
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getCategoryData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("retailerIntegrationId");
      const response = await axios.post(API_PATH.GET_RETAILER_BY_ID, {
        id: id,
      });
      const { success, data } = response.data;
  
      if (success && data.length > 0) {
        const selectedDataFromApi = data
          .filter((val) => val.categoryId !== null) 
          .map((val) => ({
            productCount: val.productCount,
            supplierId: val.supplierId,
            categoryId: val.categoryId,
            supplierNames: val.supplierNames,
          }));
        setProductData(selectedDataFromApi);
        const selectedSupplierIds = selectedDataFromApi.map(
          (item) => item.categoryId
        );
        setSelectedCheckbox(selectedSupplierIds);
        console.log("selectedSupplierIds", selectedSupplierIds);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const getCategoryData = async () => {
    const supplierIds = localStorage.getItem("supplierSettingId");
    if (supplierIds) {
      try {
        const response = await axios.post(
         `${API_PATH.GET_RETAILER_PRODUCT}`,
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

  const handleCheckboxChange1 = (event) => {
    const { value, checked } = event.target;
    const id = value;

    if (checked) {
      setSelectedCheckbox([...selectedCheckbox, id]);
    } else {
      setSelectedCheckbox(selectedCheckbox.filter((rowId) => rowId !== id));
    }
  }

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
        checked: false,
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

      selectedCheckbox.forEach((val, idx) => {
        if(val === requestData[idx]?.supplierId) {
          requestData[idx].categoryId = selectedCategories.join(",");
          requestData[idx].productCount = selectedProductCounts.join(",");
          requestData[idx].checked = true;
        }
      })
      
      const isChecked = checkAnyCheckboxChecked(checkboxes)
      if(data.supplier_product.length > 0) {

        if(!isChecked) {
          toast.error("Please select atleast one value.");
          return;
        }

      }

      setIsLoading(true);
      const response = await axios.post(
       `${API_PATH.CREATE_RETAILER_CATEGORY}`,
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

      selectedCheckbox.forEach((val, idx) => {
        if(val === requestData[idx]?.supplierId) {
          requestData[idx].categoryId = selectedCategories.join(",");
          requestData[idx].productCount = selectedProductCounts.join(",");
        }
      });

      const isChecked = checkAnyCheckboxChecked(checkboxes)
      if(data.supplier_product.length > 0) {

        if(!isChecked) {
          toast.error("Please select atleast one value.");
          return;
        }

      }

      setIsLoadingExit(true)
      const response = await axios.post(
       `${API_PATH.CREATE_RETAILER_CATEGORY}`,
        requestData
      );
      const { success, message } = response.data;
      if (success) {
        localStorage.removeItem("supplierSettingId");
        localStorage.removeItem("selectedSupplierName");
        localStorage.removeItem("retailerIntegrationId");
        localStorage.removeItem("currentPage");

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
                <th>#</th>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
            {data &&
              data.supplier_product.map((product, index) => (
                <tr key={index}>
                  <td style={{ width: "5%" }}>
                  <input
                  type="checkbox"
                  value={product.categoryId}
                  checked={selectedCheckbox.includes(parseInt(product.categoryId))}

                  onChange={handleCheckboxChange1}
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

