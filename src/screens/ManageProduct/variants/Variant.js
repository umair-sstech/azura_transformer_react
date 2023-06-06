import React, { useEffect, useState } from "react";
import VariantTitle from "./VariantTitle";
import VariantIdentifiers from "./VariantIdentifiers";
import VariantDescription from "./VariantDescription";
import VariantImages from "./VariantImages";
import VariantOptions from "./VariantOptions";
import ProductParent from "../parent/ProductParent";
import VariantCustomField from "./VariantCustomField";
import VariantAggregateField from "./VariantAggregateField";
import VariantDimension from "./VariantDimension";
import VariantIssues from "./VariantIssues";
import VariantAlternatives from "./VariantAlternatives";
import VariantListingLinks from "./VariantListingLinks";
import { ProductContext } from "../../ProductContext/ProductContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "../../ApiPath/Apipath";

const Variant = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});

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

  return (
    <div className="product__container">
      {/* Left Div */}
      <div className="left">
        <div className="product__header">
          <h3>
            VAETIANT SKU : <strong>{variantData?.[0]?.Variant_SKU}</strong>
          </h3>
        </div>

        <ProductContext.Provider value={productData}>
        <VariantTitle />
        </ProductContext.Provider>
       

        {/* Identifiers */}
        <ProductContext.Provider value={productData}>
        <VariantIdentifiers />
        </ProductContext.Provider>
       

        {/* Description */}
        <ProductContext.Provider value={productData}>
        <VariantDescription />
        </ProductContext.Provider>
       

        {/* Images */}
       
        <ProductContext.Provider value={productData}>
        <VariantImages />
        </ProductContext.Provider>

        {/* Options */}
        <ProductContext.Provider value={productData}>
        <VariantOptions />
        </ProductContext.Provider>
       

        {/* Dimensions */}
        <ProductContext.Provider value={productData}>
        <VariantDimension />
        </ProductContext.Provider>
  

        {/* CustomField */}
        <VariantCustomField />

        {/* Aggregate Field */}
        {/* <VariantAggregateField /> */}
        {/* <br/> */}

        {/* Inventory Links 9 */}

        {/* Listing Links */}
        {/* <VariantListingLinks /> */}
        {/* <br/> */}

        {/* Builder Issues */}
        {/* <VariantIssues /> */}
        {/* <br/> */}

        {/* Product Alternatives */}
        {/* <VariantAlternatives /> */}
        {/* <br/> */}
        
      </div>

      {/* Right Div */}
      <ProductContext.Provider value={productData}>
        <div className="right">
          <ProductParent activeKey={activeKey} setKey={setKey} />
      </div>
      </ProductContext.Provider>
    </div>
  );
};

export default Variant;
