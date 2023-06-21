import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import "../parent/Product.css"


const VariantDimension = ({dimensionValue, setDimensionValue}) => {
  const { productData, singleVariantData } = useContext(ProductContext);
  
  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

      useEffect(() => {
        if (variantData) {
          setDimensionValue({
            Dimension_Units: singleVariantData !== null ? singleVariantData?.Dimension_Units : variantData?.[0]?.Dimension_Units || "",
            Weight_Unit: singleVariantData !== null ? singleVariantData?.Weight_Unit : variantData?.[0]?.Weight_Unit || "",
            Length: singleVariantData !== null ? singleVariantData?.Length : variantData?.[0]?.Length || 0,
            Weight: singleVariantData !== null ? singleVariantData?.Weight : variantData?.[0]?.Weight || 0,
            Width: singleVariantData !== null ? singleVariantData?.Width : variantData?.[0]?.Width || 0,
            Height: singleVariantData !== null ? singleVariantData?.Height : variantData?.[0]?.Height || 0,
          });
        }
      }, [variantData, singleVariantData]);  

 
      const handleChange = (event) => {
        setDimensionValue({ ...dimensionValue, [event.target.name]: event.target.value });
      };

  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="6" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Dimensions</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body className="px-2 py-1">
                <Row>
                  <div className="col-lg-6">
                    <label>DIMENSION UNIT</label>
                  <input
                      type="text"
                      placeholder="Enter Value"
                      name="Dimension_Units"
                      className="form-control custom-height"
                      value={dimensionValue.Dimension_Units}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mt-3 mt-lg-0">
                    <label>WEIGHT UNIT</label>
                    <input
                    type="text"
                    placeholder="Enter Value"
                    name="Weight_Unit"
                    className="form-control custom-height"
                    value={dimensionValue.Weight_Unit}
                    onChange={handleChange}
                  />
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>LENGTH</label>
                    <input
                      type="text"
                      placeholder="Enter Value"
                      name="Length"
                      className="form-control custom-height"
                      value={dimensionValue.Length}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WEIGHT</label>
                    <input
                      type="text"
                      placeholder="Enter Value"
                      name="Weight"
                      className="form-control custom-height"
                      value={dimensionValue.Weight}
                      onChange={handleChange}
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WIDTH</label>
                    <input
                      type="text"
                      placeholder="Enter Value"
                      name="Width"
                      className="form-control custom-height"
                      value={dimensionValue.Width}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                  <label style={{ marginTop: "10px" }}>HEIGHT</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    name="Height"
                    className="form-control custom-height"
                    value={dimensionValue.Height}
                    onChange={handleChange}
                  />  
                  </div>
                </Row>
                
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantDimension;
