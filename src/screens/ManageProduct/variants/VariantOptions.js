import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import "../parent/Product.css"


const VariantOptions = ({ optionValue, setOptionValue }) => {
  const { productData, singleVariantData } = useContext(ProductContext);


  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

  useEffect(() => {
    if (variantData) {
      setOptionValue({
        Main_Color: singleVariantData !== null ? singleVariantData?.Main_Color : variantData?.[0]?.Main_Color || "",
        Size_Only: singleVariantData !== null ? singleVariantData?.Size_Only : variantData?.[0]?.Size_Only || ""
      });
    }
  }, [variantData, singleVariantData]);


  const handleChange = (event) => {
    setOptionValue({ ...optionValue, [event.target.name]: event.target.value });
  };


  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="5" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Options</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Option Name</strong>
                  </p>
                  <p>
                    <strong>Option Value</strong>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-around align-items-center">
                  <input
                    type="text"
                    placeholder="Color"
                    className="form-control custom-height ml-3"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Enter Color"
                    name="Main_Color"
                    className="form-control custom-height ml-3"
                    value={optionValue.Main_Color}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Size"
                    className="form-control custom-height ml-3"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Enter Size"
                    name="Size_Only"
                    className="form-control custom-height ml-3"
                    style={{ flex: "2 1 0" }}
                    value={optionValue.Size_Only}
                    onChange={handleChange}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantOptions;
