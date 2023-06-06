import React, { useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductParent = (props) => {
  const { activeKey, setKey } = props;
  const productData = useContext(ProductContext);
  console.log("productParent", productData?.product);

  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;


  const handleClickCard = () => {
    if (activeKey === "variants") {
      setKey("parent");
    }
  };

  return (
    <>
      <h3 className="ml-3 product__parent__title">PRODUCT PARENT</h3>
      <Card className="product__parent__card">
        <Card.Body onClick={handleClickCard} style={{ cursor: "pointer" }}>
          <Card.Subtitle style={{ textAlign: "center", marginTop: "10px" }}>
            {productData?.Parent_Title ? productData?.Parent_Title : "--"}
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex px-3 justify-content-around mt-3" style={{ gap: "2em" }}>
              <Image
                src={productData?.Image_Parent_1_original}
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
                    {productData?.Parent_SKU ? productData?.Parent_SKU : "--"}
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">Brand</div>
                  <div className=""> : </div>
                  <div className="col-6">
                    {productData?.Brand ? productData?.Brand : "--"}
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">Category</div>
                  <div className=""> : </div>
                  <div className="col-6">
                    {productData?.Category_1 ? productData?.Category_1 : "--"}
                  </div>
                </div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center">
        <span className="ml-3">1 VARIANT</span>
        <Button className="btn mr-3" variant="primary">
          <i className="fa fa-plus"></i>
        </Button>
      </div>

      <div className="d-flex flex-column" style={{ height: "350px", overflowY: "auto" }}>
        <div  className="product__parent">
          {variantData?.map((variant) => (
            <Card key={variant.id} className="product__parent__card">
              <Card.Body>
                <Card.Text>
                  <div className="d-flex justify-content-around">
                    <Image
                      src={variant.Image_Variant_1_original}
                      alt="img1"
                      className="align-self-center"
                      width={80}
                      height={80}
                    />
                    <div className="d-flex flex-column">
                      <div className="d-flex product__info">
                        <small>
                          <strong>VARIENT SKU</strong>
                        </small>
                        <div style={{ width: "inherit", textAlign: "center" }}>
                          {variant.SKU}
                        </div>
                      </div>
                      <div className="d-flex product__info qty">
                        <small>
                          <strong>QTY</strong>
                        </small>
                        <div style={{ width: "inherit" }}>{variant.Quantity}</div>
                      </div>

                      <div className="d-flex flex-column mt-2 price__info">
                        <div className="d-flex product__info">
                          <small>Cost Price</small>
                          <div style={{ width: "inherit", textAlign: "end" }}>
                            {variant.Cost_Price}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column price__info mt-1">
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
