import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png"
import { useParams } from "react-router-dom";

const ProductParent = () => {
  return (
    <>
      <h3 className="ml-3 product__parent__title">PRODUCT PARENT</h3>
      <Card className="product__parent__card">
        <Card.Body>
          <Card.Subtitle style={{ textAlign: "center", marginTop: "10px" }}>
            Women's Sunglasses
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex justify-content-around mt-2">
              <Image src={airConditioner} alt="img" className="align-self-center" width={80} height={80} />
              <div className="d-flex flex-column">
                <Row>
                  <div className="d-flex">
                    <Col>Parent SKU</Col>
                    <Col className="align-self-center ml-2">Value</Col>
                  </div>
                </Row>
                <Row>
                  <div className="d-flex">
                    <Col>Brand</Col>
                    <Col className="ml-4">Guess</Col>
                  </div>
                </Row>
                <Row>
                  <div className="d-flex">
                    <Col>Category</Col>
                    <Col className="ml-1">Sunglasses</Col>
                  </div>
                </Row>
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
