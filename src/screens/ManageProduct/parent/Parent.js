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
import { API_PATH } from "../../ApiPath/Apipath";

const Parent = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [singleVariantData, setSingleVariantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // useEffect(() => {
  //   // if(activeKey === "parent") {
  //     getProductDetails();
  //   // }
  // }, []);

  useEffect(() => {
    getProductDetails();
  }, [activeKey, id]);

  const getProductDetails = async () => {
    try {
      const response = await axios.post(`${API_PATH.GET_PRODUCT_LIST_BY_ID}`, {
        id: id,
      });
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
      const response = await axios.post(`${API_PATH.GET_PRODUCT_LIST_BY_ID}`, {
        id: id,
      });
      const { success, message, data } = response.data;
      if (success) {
        setSingleVariantData(data.variant[idx]);
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
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/product/updateProductById",
        {
          productId: id,
          supplierId: "2",
          type: "PARENT",
          Parent_Title: title,
          Plain_Description: description,
          Parent_SKU: productData.product?.[0]?.Parent_SKU,
          Brand: productData.product?.[0]?.Brand,
          Category_1: productData.product?.[0]?.Category_1,
          Category_2: productData.product?.[0]?.Category_2,
          Category_3: productData.product?.[0]?.Category_3,
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Failed to submit title:", error);
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
          <div>
            <button
              className="btn btn-primary w-auto"
              type="submit"
              onClick={handleSubmit}
            >
              Save Parent Product
            </button>
          </div>
        </div>

        <ProductContext.Provider value={productData.product?.[0]?.Parent_Title}>
          <ProductTitle title={title} setTitle={setTitle} />
        </ProductContext.Provider>

        {/* Identifiers */}
        <ProductContext.Provider value={productData.product?.[0]}>
          <ProductIdentifiers />
        </ProductContext.Provider>

        {/* Description */}
        <ProductContext.Provider
          value={productData.product?.[0]?.Plain_Description}
        >
          <ProductDescription
            description={description}
            setDescription={setDescription}
          />
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
        <ProductContext.Provider
          value={{
            product: productData,
            customFields: productData.product?.[0]?.custom_field,
          }}
        >
          <CustomFields />
        </ProductContext.Provider>
      </div>

      {/* Right Div */}
      <ProductContext.Provider value={{ productData, singleVariantData }}>
        <div className="right">
          <ProductParent
            activeKey={activeKey}
            setKey={setKey}
            variantDetails={variantDetails}
          />
        </div>
      </ProductContext.Provider>
    </div>
  );
};

export default Parent;
