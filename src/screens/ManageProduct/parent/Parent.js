import React, { useEffect, useState } from "react";
import ProductTitle from "./ProductTitle";
import ProductIdentifiers from "./ProductIdentifiers";
import ProductDescription from "./ProductDescription";
import ProductImages from "./ProductImages";
import ProductOptions from "./ProductOptions";
import ProductAttributes from "./ProductAttributes";
import CustomFields from "./CustomFields";
import ProductParent from "./ProductParent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductContext } from "../../ProductContext/ProductContext";
import { API_PATH } from '../../ApiPath/Apipath';


const Parent = (props) => {
  const { activeKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // if(activeKey === "parent") {
      getProductDetails();
    // }
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await axios.post(
        `${API_PATH.GET_PRODUCT_LIST_BY_ID}`,
        { id: id }
      );
      const { success, message, data } = response.data;

      if (success) {
        setProductData(data);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Failed to retrieve product details:", error);
    }
  };
  return (
    <div className="product__container">
      {/* Left Div */}
      <div className="left">
        <div className="product__header">
          <h3>
            PARENT SKU : <strong>{productData.product?.[0]?.Parent_SKU}</strong>
          </h3>
          
        </div>

        <ProductContext.Provider value={productData.product?.[0]?.Parent_Title}>
          <ProductTitle />
        </ProductContext.Provider>

        {/* Identifiers */}
        <ProductContext.Provider value={productData.product?.[0]}>
          <ProductIdentifiers />
        </ProductContext.Provider>

        {/* Description */}
        <ProductContext.Provider
          value={productData.product?.[0]?.Plain_Description}
        >
          <ProductDescription />
        </ProductContext.Provider>

        {/* Image */}
        <ProductContext.Provider value={productData.product?.[0]}>
          {" "}
          <ProductImages />
        </ProductContext.Provider>

        {/* Options */}
        <ProductContext.Provider
          value={{
            mainColor: productData.product?.[0]?.Main_Color,
            sizeOnly: productData.product?.[0]?.Size_Only,
          }}
        >
          <ProductOptions />
        </ProductContext.Provider>

        {/* Attributes */}
        <ProductContext.Provider value={productData.product?.[0]}>
          <ProductAttributes />
        </ProductContext.Provider>

        {/* Custom Fields */}
        <ProductContext.Provider value={{ product: productData, customFields: productData.product?.[0]?.custom_field }}>
        <CustomFields />
      </ProductContext.Provider>
      </div>

      {/* Right Div */}
      <ProductContext.Provider value={productData}>
        <div className="right">
        {productData.product?.[0]?.Preference === "PARENT" ? (
          <ProductParent />
        ) : (
          <ProductParent />
        )}
        
      </div>
      </ProductContext.Provider>
    </div>
  );
};

export default Parent;
