import React, { useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png"
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductParent = () => {

  const productParent = useContext(ProductContext);

  return (
    <>
      <h3 className="ml-3 product__parent__title">PRODUCT PARENT</h3>
      <Card className="product__parent__card">
        <Card.Body>
          <Card.Subtitle style={{ textAlign: "center", marginTop: "10px" }}>
            {productParent?.Parent_Title ? productParent.Parent_Title : "--"}
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex px-3 justify-content-around mt-3" style={{gap: "2em"}}>
            <Image src={productParent?.Image_Parent_1_original} alt="img" className="align-self-center" width={100} height={100} style={{objectFit: "contain"}} />
              <div className="d-flex flex-column w-100 justify-content-center justify-content-sm-start">
              <div className="row">
                <div className="col-5">Parent SKU</div>
                <div className=""> : </div>
                <div className="col-6">{productParent?.Parent_SKU ? productParent.Parent_SKU : "--"}</div>
              </div>
              <div className="row">
                <div className="col-5">Brand</div>
                <div className=""> : </div>
                <div className="col-6">{productParent?.Brand ? productParent.Brand : "--"}</div>
              </div>
              <div className="row">
                <div className="col-5">Category</div>
                <div className=""> : </div>
                <div className="col-6">{productParent?.Category_1 ? productParent.Category_1 : "--"}</div>
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

      <div className="d-flex flex-column" style={{height: "350px", overflowY: "auto"}}>
      <div className="d-flex mt-3 product__parent">
        <Card className="product__parent__card">
          <Card.Body>
            <Card.Text>
              <div className="d-flex justify-content-around">
                <Image
                  src={airConditioner}
                  alt="img1"
                  className="align-self-center"
                  width={80}
                  height={80}
                />
                <div className="d-flex flex-column">
                  <div className="d-flex product__info">
                    <small>
                      <strong>Master SKU</strong>
                    </small>
                    <div style={{ width: "inherit", textAlign: "center" }}>
                      BD379103
                    </div>
                  </div>
                  <div className="d-flex product__info qty">
                    <small>
                      <strong>QTY</strong>
                    </small>
                    <div style={{ width: "inherit" }}>15</div>
                  </div>

                  <div className="d-flex flex-column mt-2 price__info">
                    <div className="d-flex product__info">
                      <small>Est. Const</small>
                      <div style={{ width: "inherit", textAlign: "end" }}>
                        $40.34
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column price__info mt-1">
                    <div className="d-flex product__info">
                      <small>List Price</small>
                      <div style={{ width: "inherit", textAlign: "end" }}>
                        $40.34
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column mt-2">
                    <div className="d-flex product__info">
                      <small>
                        <strong>Color</strong>
                      </small>
                      <small style={{ width: "inherit" }}>
                        <strong>Yellow</strong>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex product__info">
                      <small>
                        <strong>Size</strong>
                      </small>
                      <small style={{ width: "inherit" }}>
                        <strong>NOSIZE</strong>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="d-flex flex-column justify-content-around">
          <div className="d-flex align-items-center ml-3">
            <i className="fa fa-database"></i>
            <span className="ml-2">1</span>
          </div>
          <div className="d-flex align-items-center pb-3 ml-3">
            <i className="fa fa-shopping-cart"></i>
            <span className="ml-2">11</span>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "-10px" }} />

      <div className="d-flex mt-3 product__parent">
        <Card className="product__parent__card">
          <Card.Body>
            <Card.Text>
              <div className="d-flex justify-content-around">
                <Image
                  src={airConditioner}
                  alt="air conditioner"
                  className="align-self-center"
                  width={80}
                  height={80}
                />
                <div className="d-flex flex-column">
                  <div className="d-flex product__info">
                    <small>
                      <strong>Master SKU</strong>
                    </small>
                    <div style={{ width: "inherit", textAlign: "center" }}>
                      BD379103
                    </div>
                  </div>
                  <div className="d-flex product__info qty">
                    <small>
                      <strong>QTY</strong>
                    </small>
                    <div style={{ width: "inherit" }}>15</div>
                  </div>

                  <div className="d-flex flex-column mt-2 price__info">
                    <div className="d-flex product__info">
                      <small>Est. Const</small>
                      <div style={{ width: "inherit", textAlign: "end" }}>
                        $40.34
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column price__info mt-1">
                    <div className="d-flex product__info">
                      <small>List Price</small>
                      <div style={{ width: "inherit", textAlign: "end" }}>
                        $40.34
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column mt-2">
                    <div className="d-flex product__info">
                      <small>
                        <strong>Color</strong>
                      </small>
                      <small style={{ width: "inherit" }}>
                        <strong>Yellow</strong>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex product__info">
                      <small>
                        <strong>Size</strong>
                      </small>
                      <small style={{ width: "inherit" }}>
                        <strong>NOSIZE</strong>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="d-flex flex-column justify-content-around">
          <div className="d-flex align-items-center ml-3">
            <i className="fa fa-database"></i>
            <span className="ml-2">1</span>
          </div>
          <div className="d-flex align-items-center pb-3 ml-3">
            <i className="fa fa-shopping-cart"></i>
            <span className="ml-2">11</span>
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default ProductParent;
