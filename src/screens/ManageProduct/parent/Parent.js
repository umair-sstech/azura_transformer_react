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
import {ProductContext} from '../../ProductContext/ProductContext';


const Parent = (props) => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    getProductDetails();
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
                PARENT SKU : <strong>{productData.product?.[0]?.Parent_SKU}</strong>
              </h3>
              <div className="product__header2">
                <h3 className="text-lg-center">
                  <strong>1/1</strong>
                </h3>
                <p>Variants In Stock</p>
              </div>
         
        </div>

        <ProductContext.Provider value={productData.product?.[0]?.Parent_Title}>
        <ProductTitle />
      </ProductContext.Provider>

        {/* Identifiers */}
        <ProductContext.Provider value={productData.product?.[0]}>
        <ProductIdentifiers />
      </ProductContext.Provider>
      

        {/* Description */}
        <ProductContext.Provider value={productData.product?.[0]?.Plain_Description}>
        <ProductDescription />
      </ProductContext.Provider>

        {/* Image */}
        <ProductImages />

        {/* Options */}
        <ProductOptions />

        {/* Attributes */}
        <ProductAttributes />

        {/* Custom Fields */}
        <CustomFields />
      </div>

      {/* Right Div */}
      <div className="right">
        <ProductParent />
      </div>
    </div>
  );
};

export default Parent;
