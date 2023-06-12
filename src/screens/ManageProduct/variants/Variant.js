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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Spinner } from "react-bootstrap";

const Variant = (props) => {
  const { activeKey, setKey } = props;
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [singleVariantData, setSingleVariantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExitLoading, setIsExitLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [identifiers, setIdentifiers] = useState({
    Variant_SKU: "",
    UPC: "",
    MPN: "",
    EAN: "",
    ASIN: "",
    Cost_Price: "",
    Retail_Price: "",
    Suggested_Sell_Price: "",
  });
  const [optionValue, setOptionValue] = useState({
    Main_Color: "",
    Size_Only: "",
  });
  const [dimensionValue, setDimensionValue] = useState({
    Dimension_Units: "",
    Weight_Unit: "",
    Length: "",
    Weight: "",
    Width: "",
    Height: "",
  });
  const [customField, setCustomFields] = useState([]);
  const history=useHistory()

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
    setIsExitLoading(true)
    try {
      const supplierId=productData.product?.[0]?.supplierId
      const response = await axios.post(
        `${API_PATH.UPDATE_PRODUCT_DATA}`,
        {
          productId: productData?.variant?.[0]?.id,
          supplierId:supplierId ,
          type: "VARIANT",
          Variant_Title: title,
          Plain_Description: description,
          ...identifiers,
          ...optionValue,
          ...dimensionValue,
          custom_fields: customField

        }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        history.push("/products")

      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Failed to submit title:", error);
      setIsExitLoading(false)
    }
  };

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
              VARIANT SKU :{" "}
              <strong>
                {singleVariantData !== null
                  ? singleVariantData.Variant_SKU
                  : variantData?.[0]?.Variant_SKU}
              </strong>
            </h3>
            <div>
          <button
          className="btn btn-primary w-auto"
          type="submit"
          onClick={handleSubmit}
                >
                {isExitLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  " Save Variant Product"
                )}
                </button>
           
          </div>
          </div>

          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantTitle title={title} setTitle={setTitle} />
          </ProductContext.Provider>

          {/* Identifiers */}
          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantIdentifiers
              identifiers={identifiers}
              setIdentifiers={setIdentifiers}
            />
          </ProductContext.Provider>

          {/* Description */}
          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantDescription
              description={description}
              setDescription={setDescription}
            />
          </ProductContext.Provider>

          {/* Images */}
          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantImages />
          </ProductContext.Provider>

          {/* Options */}
          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantOptions
              optionValue={optionValue}
              setOptionValue={setOptionValue}
            />
          </ProductContext.Provider>

          {/* Dimensions */}
          <ProductContext.Provider value={{ productData, singleVariantData }}>
            <VariantDimension dimensionValue={dimensionValue} setDimensionValue={setDimensionValue}/>
          </ProductContext.Provider>

          {/* CustomField */}
          <ProductContext.Provider
            value={{
              product: productData,
              customFields: productData.variant?.[0]?.custom_field,
            }}
          >
            <VariantCustomField customField={customField} setCustomFields={setCustomFields}/>
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
    </>
  );
};

export default Variant;
