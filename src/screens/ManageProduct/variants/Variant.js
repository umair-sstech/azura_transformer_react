import React, { useEffect, useState } from "react";
import VariantTitle from "./VariantTitle";
import VariantIdentifiers from "./VariantIdentifiers";
import VariantDescription from "./VariantDescription";
import VariantImages from "./VariantImages";
import VariantOptions from "./VariantOptions";
import ProductParent from "../parent/ProductParent";
import VariantCustomField from "./VariantCustomField";
import VariantDimension from "./VariantDimension";
import { ProductContext } from "../../ProductContext/ProductContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "../../ApiPath/Apipath";

const Variant = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [singleVariantData, setSingleVariantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

  useEffect(() => {
    // if(activeKey === "variants") {
      getProductDetails();
    // }
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await axios.post(`${API_PATH.GET_PRODUCT_LIST_BY_ID}`, { id:id });
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

  const variantDetails = async (idx) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_PATH.GET_PRODUCT_LIST_BY_ID}`, { id:id });
      const { success, message, data } = response.data;
      if (success) {
        setSingleVariantData(data.variant[idx])
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to retrieve product details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    {isLoading && (
      <div className="loader-wrapper">
        <i className="fa fa-refresh fa-spin"></i>
      </div>
    )}
    <div className="product__container">
      {/* Left Div */}
      <div className="left">
        <div className="product__header">
          <h3>
            VARIANT SKU : <strong>{singleVariantData !== null ? singleVariantData.Variant_SKU :variantData?.[0]?.Variant_SKU}</strong>
          </h3>
        </div>

        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantTitle />
        </ProductContext.Provider>

        {/* Identifiers */}
        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantIdentifiers />
        </ProductContext.Provider>
       
        {/* Description */}
        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantDescription />
        </ProductContext.Provider>

        {/* Images */}
        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantImages />
        </ProductContext.Provider>

        {/* Options */}
        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantOptions />
        </ProductContext.Provider>

        {/* Dimensions */}
        <ProductContext.Provider value={{productData, singleVariantData}}>
        <VariantDimension />
        </ProductContext.Provider>
  
        {/* CustomField */}
      
        <VariantCustomField />
     

      </div>

      {/* Right Div */}
      <ProductContext.Provider value={{productData, singleVariantData}}>
        <div className="right">
          <ProductParent activeKey={activeKey} setKey={setKey} variantDetails={variantDetails} />
      </div>
      </ProductContext.Provider>
    </div>
    </>
  );
};

export default Variant;
