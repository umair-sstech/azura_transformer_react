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
        const selectedSupplierIds = selectedDataFromApi.map((item) =>
          item.categoryId.split(",")
        );
        setSelectedCheckbox(selectedSupplierIds.flat());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCategoryData = async () => {
    const supplierIds = localStorage.getItem("supplierSettingId");
    if (supplierIds) {
      try {
        const response = await axios.post(`${API_PATH.GET_RETAILER_PRODUCT}`, {
          supplierId: supplierIds,
        });
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

  const getCheckedCheckboxVal = (id) => {
    // return selectedCheckbox?.some(data => data.includes(String(id)));
    return selectedCheckbox?.some((data) =>
      data.split(",").includes(String(id))
    );
  };

  const handleCheckboxChange1 = (event) => {
    const { value, checked } = event.target;
    const id = value;

    if (checked) {
      setSelectedCheckbox([...selectedCheckbox, id]);
    } else {
      setSelectedCheckbox(selectedCheckbox.filter((rowId) => rowId !== id));
    }
  };

  const checkAnyCheckboxChecked = (checkboxes) => {
    return Object.values(checkboxes).some((box) => box.checked);
  };

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

      const checkboxes = document.querySelectorAll(
        '.product-table tbody input[type="checkbox"]'
      );
      const selectedCategories = {};
      const selectedProductCounts = {};

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const product = data.supplier_product[index];
          const supplierId = product.supplierId;
          if (!selectedCategories.hasOwnProperty(supplierId)) {
            selectedCategories[supplierId] = [];
            selectedProductCounts[supplierId] = [];
          }
          selectedCategories[supplierId].push(product.category_id);
          selectedProductCounts[supplierId].push(product.product_count);
        }
      });

      requestData.forEach((request, idx) => {
        const supplierId = request.supplierId;
        if (selectedCategories.hasOwnProperty(supplierId)) {
          request.categoryId = selectedCategories[supplierId].join(",");
          request.productCount = selectedProductCounts[supplierId].join(",");
        }
      });

      const isChecked = checkAnyCheckboxChecked(checkboxes);
      if (data.supplier_product.length > 0) {
        if (!isChecked) {
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

      const selectedCategories = {};
      const selectedProductCounts = {};

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const product = data.supplier_product[index];
          const supplierId = product.supplierId;
          if (!selectedCategories.hasOwnProperty(supplierId)) {
            selectedCategories[supplierId] = [];
            selectedProductCounts[supplierId] = [];
          }
          selectedCategories[supplierId].push(product.categoryId);
          selectedProductCounts[supplierId].push(product.product_count);
        }
      });

      requestData.forEach((request, idx) => {
        const supplierId = request.supplierId;
        if (selectedCategories.hasOwnProperty(supplierId)) {
          request.categoryId = selectedCategories[supplierId].join(",");
          request.productCount = selectedProductCounts[supplierId].join(",");
        }
      });

      const isChecked = checkAnyCheckboxChecked(checkboxes);
      if (data.supplier_product.length > 0) {
        if (!isChecked) {
          toast.error("Please select atleast one value.");
          return;
        }
      }

      setIsLoadingExit(true);
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
        <div className="row">
          <div className="alert alert-primary col-12 mt-3" role="alert">
            <strong>INFO:</strong> <br />
            Select the appropriate option from the list below to indicate the
            data category you are interested in exporting.
          </div>
          {!data ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          <table className="product-table  w-100 table-responsive-sm">
            <thead>
              <tr>
              
              <th></th>
                <th>SuplierId</th>
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
                        // value={product.supplierId}
                        value={product.category_id}
                        checked={getCheckedCheckboxVal(product?.category_id)}
                        onChange={handleCheckboxChange1}
                      />
                    </td>
                    <td style={{ width: "6%" }}>{product.supplierId}</td>
                    <td style={{ width: "30%" }}>{product.supplierData}</td>
                    <td>{product.azura_category_tree}</td>
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

// import React, { useState, useEffect, useContext } from "react";
// import "../ManageRetailer/Retailer.css";
// import { Spinner } from "react-bootstrap";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
// import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import { onLoading } from "../../actions";
// import { API_PATH } from "../ApiPath/Apipath";

// function ProductExport(props) {
//   const { setPage } = props;
//   const { processCancel } = useContext(FormContext);
//   const [data, setData] = useState(null);
//   const [productData, setProductData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingExit, setIsLoadingExit] = useState(false);
//   const [selectedCheckbox, setSelectedCheckbox] = useState([]);

//   const history = useHistory();

//   useEffect(() => {
//     getCategoryData();
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const id = localStorage.getItem("retailerIntegrationId");
//       const response = await axios.post(API_PATH.GET_RETAILER_BY_ID, {
//         id: id,
//       });
//       const { success, data } = response.data;

//       if (success && data.length > 0) {
//         const selectedDataFromApi = data
//           .filter((val) => val.categoryId !== null)
//           .map((val) => ({
//             productCount: val.productCount,
//             supplierId: val.supplierId,
//             categoryId: val.categoryId,
//             supplierNames: val.supplierNames,
//           }));
//         setProductData(selectedDataFromApi);
//         const selectedSupplierIds = selectedDataFromApi.map((item) => ({
//           categoryId: item.categoryId,
//           productCount: item.productCount,
//           // supplierId: item.supplierId
//         }));
//         setSelectedCheckbox(selectedSupplierIds);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const getCategoryData = async () => {
//     const supplierIds = localStorage.getItem("supplierSettingId");
//     if (supplierIds) {
//       try {
//         const response = await axios.post(`${API_PATH.GET_RETAILER_PRODUCT}`, {
//           supplierId: supplierIds,
//         });
//         const { success, data } = response.data;
//         if (success) {
//           setData(data);
//         } else {
//           console.error("Failed to fetch supplier product data");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     const checkboxes = document.querySelectorAll(
//       '.product-table tbody input[type="checkbox"]'
//     );
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = e.target.checked;
//     });
//   };

//   // const handleCheckboxChange1 = (
//   //   event,
//   //   categoryId,
//   //   productCount,
//   //   supplierId
//   // ) => {
//   //   const { checked } = event.target;
//   //   let updatedArr = [];
//   //   if (checked) {
//   //     setSelectedCheckbox((prevArr) => {
//   //       if (prevArr.length > 0) {
//   //         updatedArr = prevArr.map((val) => {
//   //           return {
//   //             categoryId: val.categoryId + "," + categoryId,
//   //             productCount: val.productCount + "," + productCount,
//   //             supplierId: String(supplierId),
//   //           };
//   //         });
//   //       } else {
//   //         updatedArr = [
//   //           {
//   //             categoryId: String(categoryId),
//   //             productCount: String(productCount),
//   //             supplierId: String(supplierId),
//   //           },
//   //         ];
//   //       }
//   //       return updatedArr;
//   //     });
//   //   } else {
//   //     setSelectedCheckbox((prevArr) => {
//   //       updatedArr = prevArr?.map((obj) => {
//   //         const categoryIdArr = obj.categoryId.split(",");
//   //         const productCountArr = obj.productCount.split(",");

//   //         const indexToDelete = categoryIdArr.indexOf(String(categoryId));
//   //         if (indexToDelete !== -1) {
//   //           categoryIdArr.splice(indexToDelete, 1);
//   //           productCountArr.splice(indexToDelete, 1);
//   //         }
//   //         obj.categoryId = categoryIdArr.join(",");
//   //         obj.productCount = productCountArr.join(",");

//   //         return obj;
//   //       });
//   //       updatedArr.forEach((data) => {
//   //         if (data.categoryId === "" || data.productCount === "") {
//   //           updatedArr = [];
//   //         }
//   //       });
//   //       return updatedArr;
//   //     });
//   //   }
//   // };

//   const handleCheckboxChange1 = (
//     event,
//     categoryId,
//     productCount,
//     supplierId
//   ) => {
//     const { checked } = event.target;

//     setSelectedCheckbox((prevArr) => {
//       let updatedArr = [];

//       if (checked) {
//         // Checkbox is checked
//         if (prevArr.length > 0) {
//           // Group existing objects by supplierId
//           const groupedBySupplier = prevArr.reduce((acc, obj) => {
//             if (acc[obj.supplierId]) {
//               acc[obj.supplierId].push(obj);
//             } else {
//               acc[obj.supplierId] = [obj];
//             }
//             return acc;
//           }, {});
//           // Add new object to the corresponding supplier's array
//           if (groupedBySupplier[supplierId]) {
//             updatedArr = groupedBySupplier[supplierId].map((val) => ({
//               ...val,
//               categoryId: val.categoryId + "," + categoryId,
//               productCount: val.productCount + "," + productCount,
//             }));
//           }
//         } else {
//           updatedArr = [
//             {
//               categoryId: String(categoryId),
//               productCount: String(productCount),
//               supplierId: String(supplierId),
//             },
//           ];
//         }
//       } else {
//         if (prevArr.length > 0) {
//           updatedArr = prevArr
//             .map((obj) => {
//               const categoryIdArr = obj.categoryId.split(",");
//               const productCountArr = obj.productCount.split(",");

//               const indexToDelete = categoryIdArr.indexOf(String(categoryId));
//               if (indexToDelete !== -1) {
//                 categoryIdArr.splice(indexToDelete, 1);
//                 productCountArr.splice(indexToDelete, 1);
//               }

//               obj.categoryId = categoryIdArr.join(",");
//               obj.productCount = productCountArr.join(",");

//               return obj;
//             })
//             .filter((obj) => obj.categoryId !== "" && obj.productCount !== "");

//           updatedArr.forEach((data) => {
//             if (data.categoryId === "" || data.productCount === "") {
//               updatedArr = [];
//             }
//           });
//         }
//         // if (prevArr.length > 0) {
//         //   updatedArr = prevArr
//         //     .map((obj) => {
//         //       const categoryIdArr = obj.categoryId.split(",");
//         //       const productCountArr = obj.productCount.split(",");

//         //       const indexToDelete = categoryIdArr.indexOf(String(categoryId));
//         //       if (indexToDelete !== -1) {
//         //         categoryIdArr.splice(indexToDelete, 1);
//         //         productCountArr.splice(indexToDelete, 1);
//         //       }

//         //       obj.categoryId = categoryIdArr.join(",");
//         //       obj.productCount = productCountArr.join(",");

//         //       return obj;
//         //     })
//         //     .filter((obj) => obj.categoryId !== "" && obj.productCount !== "");

//         //   updatedArr.forEach((data) => {
//         //     if (data.categoryId === "" || data.productCount === "") {
//         //       updatedArr = [];
//         //     }
//         //   });
//         // }
//       }

//       return updatedArr;
//     });
//   };

//   const getCheckedCheckboxVal = (id) => {
//     return selectedCheckbox?.some((data) =>
//       data.categoryId.split(",").includes(String(id))
//     );
//   };

//   console.log("selected--", selectedCheckbox);

//   const checkAnyCheckboxChecked = (checkboxes) => {
//     return Object.values(checkboxes).some((box) => box.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const retailerIntegrationId = localStorage.getItem(
//         "retailerIntegrationId"
//       );

//       const supplierSettingId = localStorage.getItem("supplierSettingId");
//       const requestData = supplierSettingId.split(",").map((supplierId) => ({
//         id: retailerIntegrationId,
//         supplierId,
//         categoryId: "",
//         productCount: "",
//         checked: false,
//       }));

//       const checkboxes = document.querySelectorAll(
//         '.product-table tbody input[type="checkbox"]'
//       );

//       const selectedCategories = {};
//       const selectedProductCounts = {};

//       checkboxes.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//           const product = data.supplier_product[index];
//           const supplierId = product.supplierId;
//           if (!selectedCategories.hasOwnProperty(supplierId)) {
//             selectedCategories[supplierId] = [];
//             selectedProductCounts[supplierId] = [];
//           }
//           selectedCategories[supplierId].push(product.category_id);
//           selectedProductCounts[supplierId].push(product.product_count);
//         }
//       });

//       requestData.forEach((request, idx) => {
//         const supplierId = request.supplierId;
//         if (selectedCategories.hasOwnProperty(supplierId)) {
//           request.categoryId = selectedCategories[supplierId].join(",");
//           request.productCount = selectedProductCounts[supplierId].join(",");
//         }
//       });

//       console.log("requestData--", requestData);

//       // const selectedCategories = [];
//       // const selectedProductCounts = [];
//       // const getAllCategoryId = data?.supplier_product?.map(
//       //   (val) => val.category_id
//       // );
//       // const getAllProductCount = data?.supplier_product?.map(
//       //   (val) => val.product_count
//       // );

//       // selectedCheckbox?.length > 0 &&
//       //   selectedCheckbox.forEach((val, idx) => {
//       //     const categoryArr = val.categoryId.split(",");
//       //     const productCountArr = val.productCount.split(",");
//       //     const containsAllCategories = categoryArr.filter((item) =>
//       //       getAllCategoryId.includes(parseInt(item))
//       //     );
//       //     const containsAllProducts = productCountArr.filter((item) =>
//       //       getAllProductCount.includes(parseInt(item))
//       //     );
//       //     selectedCategories.push(...containsAllCategories);
//       //     selectedProductCounts.push(...containsAllProducts);
//       //   });

//       //   const supplierIdArr = requestData.map(data => data.supplierId)
//       // selectedCheckbox.forEach((val) => {
//       //   if(supplierIdArr.includes(val.supplierId)) {
//       //     requestData[val.supplierId].categoryId = selectedCategories.join(",");
//       //     requestData[val.supplierId].productCount = selectedProductCounts.join(",");
//       //     requestData[val.supplierId].checked = true;
//       //   }
//       // });
//       // console.log("new request--", requestData);

//       // const isChecked = checkAnyCheckboxChecked(checkboxes)
//       if (data.supplier_product.length > 0) {
//         // if(!isChecked) {
//         //   toast.error("Please select atleast one value.");
//         //   return;
//         // }
//         if (selectedCheckbox.length === 0) {
//           return toast.error("Please select atleast one value.");
//         }
//       }
//       return;
//       setIsLoading(true);
//       const response = await axios.post(
//         `${API_PATH.CREATE_RETAILER_CATEGORY}`,
//         requestData
//       );
//       const { success, message } = response.data;
//       if (success) {
//         toast.success(message);
//         setPage(3);
//       } else {
//         toast.error(message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOnClick = async (e) => {
//     e.preventDefault();
//     try {
//       const retailerIntegrationId = localStorage.getItem(
//         "retailerIntegrationId"
//       );
//       const supplierSettingId = localStorage.getItem("supplierSettingId");
//       const requestData = [
//         {
//           id: retailerIntegrationId,
//           supplierId: supplierSettingId,
//           categoryId: "",
//           productCount: "",
//         },
//       ];
//       const checkboxes = document.querySelectorAll(
//         '.product-table tbody input[type="checkbox"]'
//       );
//       const selectedCategories = [];
//       const selectedProductCounts = [];
//       checkboxes.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//           const product = data.supplier_product[index];
//           selectedCategories.push(product.category_id);
//           selectedProductCounts.push(product.product_count);
//         }
//       });

//       selectedCheckbox.forEach((val, idx) => {
//         if (val === requestData[idx]?.supplierId) {
//           requestData[idx].categoryId = selectedCategories.join(",");
//           requestData[idx].productCount = selectedProductCounts.join(",");
//         }
//       });

//       const isChecked = checkAnyCheckboxChecked(checkboxes);
//       if (data.supplier_product.length > 0) {
//         if (!isChecked) {
//           toast.error("Please select atleast one value.");
//           return;
//         }
//       }

//       setIsLoadingExit(true);
//       const response = await axios.post(
//         `${API_PATH.CREATE_RETAILER_CATEGORY}`,
//         requestData
//       );
//       const { success, message } = response.data;
//       if (success) {
//         localStorage.removeItem("supplierSettingId");
//         localStorage.removeItem("selectedSupplierName");
//         localStorage.removeItem("retailerIntegrationId");
//         localStorage.removeItem("currentPage");

//         toast.success(message);
//         history.push("/setting-retailer-list");
//       } else {
//         toast.error(message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoadingExit(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-lg-12 col-md-12 col-12 button-class">
//             <div className="d-flex">
//               <button
//                 className="btn btn-primary w-auto btn-lg mr-2"
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Spinner animation="border" size="sm" /> Please wait...
//                   </>
//                 ) : (
//                   "Save & Next"
//                 )}
//               </button>

//               <button
//                 className="btn btn-primary w-auto btn-lg mr-2"
//                 type="submit"
//                 onClick={handleOnClick}
//               >
//                 {isLoadingExit ? (
//                   <>
//                     <Spinner animation="border" size="sm" /> Please wait...
//                   </>
//                 ) : (
//                   "Save & Exit"
//                 )}
//               </button>
//               <button
//                 className="btn btn-secondary w-auto btn-lg"
//                 type="button"
//                 onClick={processCancel}
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           {!data ? (
//             <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
//               <i className="fa fa-refresh fa-spin"></i>
//             </div>
//           ) : (
//             ""
//           )}
//           <table className="product-table  w-100 table-responsive-sm">
//             <thead>
//               <tr>
//                 <th>
//                   <input type="checkbox" onChange={handleCheckboxChange} />
//                 </th>
//                 <th>#</th>
//                 <th>Supplier Name</th>
//                 <th>Category</th>
//                 <th>Category Id</th>
//                 <th>Product Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data &&
//                 data.supplier_product.map((product, index) => (
//                   <tr key={index}>
//                     <td style={{ width: "5%" }}>
//                       <input
//                         type="checkbox"
//                         // value={product.supplierId}
//                         value={product?.category_id}
//                         checked={getCheckedCheckboxVal(product?.category_id)}
//                         onChange={(e) =>
//                           handleCheckboxChange1(
//                             e,
//                             product?.category_id,
//                             product?.product_count,
//                             product?.supplierId
//                           )
//                         }
//                       />
//                     </td>
//                     <td style={{ width: "6%" }}>{product.supplierId}</td>
//                     <td style={{ width: "30%" }}>{product.supplierData}</td>
//                     <td>{product.azura_category_tree}</td>
//                     <td>{product.category_id}</td>
//                     <td>{product.product_count}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </form>
//     </>
//   );
// }

// const mapStateToProps = ({ LoadingReducer }) => ({
//   loading: LoadingReducer.isLoading,
// });

// export default connect(mapStateToProps, { onLoading })(ProductExport);
