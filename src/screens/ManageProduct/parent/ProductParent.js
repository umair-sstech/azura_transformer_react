import React, { useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductParent = (props) => {
  const { activeKey, setKey } = props;
  const productData = useContext(ProductContext);
  const { product } = productData;

  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

  const navigateToParent = (mainKey, key) => {
    if (activeKey === key) {
      setKey(mainKey);
    }
  };

  return (
    <>
      <h3 className="ml-3 product__parent__title">PRODUCT PARENT</h3>
      {product !== undefined && (
        <Card className="product__parent__card">
          <Card.Body onClick={() => navigateToParent("parent", "variants")} style={{ cursor: "pointer" }}>
            <Card.Subtitle style={{ textAlign: "center", marginTop: "10px" }}>
              {product[0]?.Parent_Title ? product[0].Parent_Title : "--"}
            </Card.Subtitle>
            <Card.Text>
              <div className="d-flex px-3 justify-content-around mt-3" style={{ gap: "2em" }}>
                <Image
                  src={product[0]?.Image_Parent_1_original}
                  alt="img"
                  className="align-self-center"
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
                <div className="d-flex flex-column w-100 justify-content-center justify-content-sm-start">
                  <div className="row">
                    <div className="col-5">Parent SKU</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {product[0]?.Parent_SKU ? product[0].Parent_SKU : "--"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">Brand</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {product[0]?.Brand ? product[0].Brand : "--"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">Category</div>
                    <div className=""> : </div>
                    <div className="col-6">
                      {product[0]?.Category_1 ? product[0].Category_1 : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <span className="ml-3">{`${variantData?.length ? variantData.length : "--"} ${variantData?.length > 1 ? 'Variants' : 'Variant'}`}</span>
        {/* <Button className="btn mr-3" variant="primary">
          <i className="fa fa-plus"></i>
        </Button> */}
      </div>

      <div style={{ height: "400px", overflowY: "auto" }}>
        <div className="product__parent">
          {variantData?.map((variant) => (
            <Card key={variant.id} className="product__parent__card">
              <Card.Body onClick={() => navigateToParent("variants", "parent")} style={{cursor: "pointer"}}>
                <Card.Subtitle style={{ textAlign: "center", marginTop: "10px" }}>
                  {variant?.Variant_Title? variant.Variant_Title : "--"}
                </Card.Subtitle>
                <Card.Text>
                  <div className="d-flex px-3 mt-3 justify-content-around" style={{gap: "2em"}}>
                    <Image
                      src={variant.Image_Variant_1_original}
                      alt="img1"
                      className="align-self-center"
                      width={100}
                      height={100}
                    />
                    <div className="d-flex flex-column w-100 justify-content-center justify-content-sm-start">
                      <div className="row">
                        <div className="col-5"><strong>Variant SKU</strong></div>
                        <div> : </div>
                        <div className="col-6">{variant.Variant_SKU}</div>
                      </div>
                      <div className="row">
                        <div className="col-5"><strong>QTY</strong></div>
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
