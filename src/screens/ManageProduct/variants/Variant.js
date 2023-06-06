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

const Variant = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // if(activeKey === "variants") {
      getProductDetails();
    // }
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await axios.post("http://localhost:8000/product/getProductByID", { id:id });
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
            MASTER SKU : <strong>GU7761-D_32F</strong>
          </h3>

          <div className="product__header2__container">
          <div className="product__header2">
            <h3 className="text-lg-center">
              <strong>1</strong>
            </h3>
            <p>SOURCE</p>
          </div>
          <div className="product__header2">
            <h3 className="text-lg-center">
              <strong>10</strong>
            </h3>
            <p>CHANNELS</p>
          </div>
          <div className="product__header2">
            <h3 className="text-lg-center">
              <strong>38</strong>
            </h3>
            <p>QUANTITY</p>
          </div>
          </div>
        </div>

        <VariantTitle />

        {/* Identifiers */}
        <VariantIdentifiers />

        {/* Description */}
        <VariantDescription />

        {/* Images */}
        <VariantImages />

        {/* Options */}
        <VariantOptions />

        {/* Dimensions */}
        <VariantDimension />

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
