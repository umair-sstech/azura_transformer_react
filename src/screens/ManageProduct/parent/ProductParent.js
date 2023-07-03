import React, { useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import imageNotFound from "../../../assets/images/product-image-notFound.jpg";

const ProductParent = (props) => {
  const { activeKey, setKey, variantDetails } = props;
  const { productData } = useContext(ProductContext);
  // const { product } = productData;

  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

  const aiTitle =
    productData?.product?.[0] !== null
      ? productData?.product?.[0]?.AI_TITLE?.replace(/[\s\[\]"]/g, "")
      : productData?.product?.[0]?.Parent_Title;
  const parentTitle =
    productData?.product?.[0] !== null
      ? productData?.product?.[0]?.Parent_Title
      : productData?.product?.[0]?.Variant_Title;

  const mainTitle = aiTitle ? aiTitle : parentTitle;

  const navigateToParent = (mainKey, key) => {
    if (activeKey === key) {
      setKey(mainKey);
    }
  };

  const setVariantTitle = (variant) => {
    const variantTitle = variant?.AI_TITLE
      ? variant.AI_TITLE.replace(/[\s\[\]"]/g, "")
      : variant.Variant_Title;
    return variantTitle.includes("AI Generated")
      ? variantTitle.slice(13)
      : variantTitle;
  };

  return (
    <>
      <h3 className="ml-3 product__parent__title">PRODUCT PARENT</h3>
      {Object.keys(productData).length !== 0 ? (
        <Card className="product__parent__card">
          <Card.Body
            onClick={() => navigateToParent("parent", "variants")}
            style={{ cursor: "pointer" }}
          >
            <Card.Subtitle
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontWeight: "600",
              }}
            >
              {mainTitle &&
                (mainTitle.includes("AI Generated")
                  ? mainTitle.slice(13)
                  : mainTitle)}
            </Card.Subtitle>
            <Card.Text>
              <div
                className="d-flex px-3 justify-content-around align-items-center mt-3 mb-2"
                style={{ gap: "2em" }}
              >
                <a
                  href={productData.product[0].Image_Parent_1_original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={
                      productData?.product[0]?.Image_Parent_1_original
                        ? productData?.product[0]?.Image_Parent_1_original
                        : imageNotFound
                    }
                    alt="img"
                    className="align-self-center"
                    width={100}
                    height={100}
                    style={{ objectFit: "contain" }}
                  />
                </a>
                <div className="d-flex flex-column w-100 justify-content-center justify-content-sm-start">
                  <div className="row">
                    <div className="col-5">Parent SKU</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {productData?.product[0]?.Parent_SKU
                        ? productData.product[0].Parent_SKU
                        : "--"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">Brand</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {productData?.product[0]?.Brand
                        ? productData.product[0].Brand
                        : "--"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">Category</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {productData?.product[0]?.Category_1
                        ? productData?.product[0].Category_1
                        : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="loader-wrapper">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      )}
      <h3 className="ml-3 product__parent__title">PRODUCT VARIANT</h3>
      <div
        className="d-flex flex-column"
        style={{ height: "350px", overflowY: "auto" }}
      >
        <div className="product__parent">
          {variantData?.map((variant, idx) => (
            <Card
              key={variant.id}
              onClick={() => navigateToParent(`variants`, "parent")}
            >
              <Card.Body
                className={`product__parent__card`}
                onClick={() => variantDetails(idx)}
                style={{ cursor: "pointer" }}
              >
                <Card.Subtitle
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    fontWeight: "600",
                  }}
                >
                  {setVariantTitle(variant)}
                </Card.Subtitle>
                <Card.Text>
                  <div
                    className="d-flex px-3 mt-3 justify-content-around align-items-center mb-2"
                    style={{ gap: "2em" }}
                  >
                    <a
                      href={variant.Image_Variant_1_original}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={
                          variant.Image_Variant_1_original
                            ? variant.Image_Variant_1_original
                            : imageNotFound
                        }
                        // alt="img1"
                        className="align-self-center"
                        width={100}
                        height={100}
                      />
                    </a>
                    <div className="d-flex flex-column w-100 justify-content-center justify-content-sm-start">
                      <div className="row">
                        <div className="col-5">Variant SKU</div>
                        <div> : </div>
                        <div className="col-6">{variant.Variant_SKU}</div>
                      </div>
                      <div className="row">
                        <div className="col-5">QTY</div>
                        <div> : </div>
                        <div className="col-6">{variant.Quantity}</div>
                      </div>

                      <div className="d-flex px-2 flex-column mt-2 price__info">
                        <div className="d-flex product__info">
                          <small>Cost Price</small>
                          <div style={{ width: "inherit", textAlign: "end" }}>
                            {variant.Cost_Price}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex px-2 flex-column price__info mt-1">
                        <div className="d-flex product__info">
                          <small>Retail Price</small>
                          <div style={{ width: "inherit", textAlign: "end" }}>
                            {variant.Retail_Price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductParent;
