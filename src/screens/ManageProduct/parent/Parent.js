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
import attributes from "./Attributes";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Spinner } from "react-bootstrap";

const Parent = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [singleVariantData, setSingleVariantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [identifiers, setIdentifiers] = useState({
    Parent_SKU: "",
    Brand: "",
    Category_1: "",
    Category_2: "",
    Category_3: "",
  });
  const [colorValue, setColorValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [customField, setCustomFields] = useState([]);
  const [attribute, setAttributes] = useState(attributes);
  const history = useHistory();

  useEffect(() => {
    getProductDetails();
  }, []);

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
    setIsLoading(true);
    try {
      const supplierId = productData.product?.[0]?.supplierId;
      const response = await axios.post(`${API_PATH.UPDATE_PRODUCT_DATA}`, {
        productId: id,
        supplierId: supplierId,
        type: "PARENT",
        Parent_Title: title,
        Plain_Description: description,
        ...identifiers,
        Main_Color: colorValue,
        Size_Only: sizeValue,
        ...attribute,
        custom_fields: customField,
      });

      const { success, message } = response.data;
      if (success) {
        variantDetails(activeKey);
        toast.success(message);
        history.push("/products");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Failed to submit title:", error);
      setIsLoading(false);
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
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Please wait...
                </>
              ) : (
                " Save Parent Product"
              )}
            </button>
          </div>
        </div>

        <ProductContext.Provider
          value={
            productData.product?.[0]?.AI_TITLE != null
              ? productData.product?.[0]?.AI_TITLE.replace(/"/g, "")
              : productData.product?.[0]?.Variant_Title
          }
        >
          <ProductTitle title={title} setTitle={setTitle} />
        </ProductContext.Provider>

        {/* Identifiers */}
        <ProductContext.Provider value={productData.product?.[0]}>
          <ProductIdentifiers
            identifiers={identifiers}
            setIdentifiers={setIdentifiers}
          />
        </ProductContext.Provider>

        {/* Description */}
        <ProductContext.Provider
          value={
            productData.product?.[0]?.AI_Description != null
              ? productData.product?.[0]?.AI_Description
              : productData.product?.[0]?.Plain_Description
          }
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
          <ProductOptions
            colorValue={colorValue}
            setColorValue={setColorValue}
            sizeValue={sizeValue}
            setSizeValue={setSizeValue}
          />
        </ProductContext.Provider>

        {/* Attributes */}
        <ProductContext.Provider value={productData.product?.[0]}>
          <ProductAttributes
            attribute={attribute}
            setAttributes={setAttributes}
          />
        </ProductContext.Provider>

        {/* Custom Fields */}
        <ProductContext.Provider
          value={{
            product: productData,
            customFields: productData.product?.[0]?.custom_field,
          }}
        >
          <CustomFields
            customField={customField}
            setCustomFields={setCustomFields}
          />
        </ProductContext.Provider>
      </div>

      {/* Right Div */}
      <ProductContext.Provider value={{ productData, singleVariantData }}>
        <div className="right">
          <ProductParent
            activeKey={activeKey}
            setKey={setKey}
            variantDetails={variantDetails}
            // Pass activeKey to variantDetails
          />
        </div>
      </ProductContext.Provider>
    </div>
  );
};

export default Parent;
