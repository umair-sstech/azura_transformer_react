import React, { useState, useEffect } from 'react';
import "../ManageRetailer/Retailer.css"
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductExport(props) {
  const {setPage}=props
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
   console.log("SelectProdiucts",selectedProducts)


  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const supplierIds = localStorage.getItem("supplierSettingId");
    if (supplierIds) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:2703/retailer/getSupplierProduct",
          { supplierId: supplierIds }
        );
        const { success, data } = response.data;
        console.log("response data",data)
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

  const handleCheckboxChange = (e,product) => {
    console.log("product",product)

    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
   
    const supplierId=localStorage.getItem("retailerIntegrationId")
      const requestData = selectedProducts.map((product) => ({
        id: product.id,
        supplierId: supplierId,
        categoryId: product.category_id.join(','),
        productCount: product.product_count.join(',')
      }));
  console.log("requestedData",requestData)
      axios
        .post("http://localhost:2703/retailer/createOrUpdateRetailerCategory", requestData)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            toast.success(message);
            setPage(3)
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to submit data:", error);
          toast.error("Failed to submit data. Please try again.");
        });
   
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
          <table className='product-table  w-100 table-responsive-sm'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    onChange={(e,product) => handleCheckboxChange(e, product)}
                  />
                </th>
                <th>Id</th>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
              {data && data.supplier_product.map((product) => (
                <tr key={product.supplierId}>
                  <td style={{width: "5%"}}>
                    <input type="checkbox" />
                  </td>
                  <td style={{width: "6%"}}>{product.supplierId}</td>
                  <td style={{width: "30%"}}>{data.supplier_list}</td>
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
