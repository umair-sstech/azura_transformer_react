import React, { useState, useEffect, useContext } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from '../../ProductContext/ProductContext';
import "./Product.css"


const ProductIdentifiers = ({ identifiers, setIdentifiers }) => {
  const product = useContext(ProductContext);

  useEffect(() => {
    if (product) {
      setIdentifiers({
        Parent_SKU: product?.Parent_SKU || "",
        Brand: product?.Brand || "",
        Category_1: product?.Category_1 || "",
        Category_2: product?.Category_2 || "",
        Category_3: product?.Category_3 || ""
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIdentifiers((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Identifiers</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            {/*<Accordion.Collapse eventKey="1" className="card-body">*/}
              <Card.Body>
                <label>SKU</label>
                <input
                  type="text"
                  placeholder="SKU..."
                  name="Parent_SKU"
                  className="form-control"
                  onChange={handleChange}
                  value={identifiers.Parent_SKU}
                />
                <label style={{ marginTop: "10px" }}>BRAND</label>
                <input
                  type="text"
                  placeholder="Brand..."
                  name="Brand"
                  className="form-control"
                  onChange={handleChange}
                  value={identifiers.Brand}
                />
              </Card.Body>
  {/*</Accordion.Collapse>*/}
          </Card>
        </Accordion>
      </Col>

      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Categories</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
          {/*  <Accordion.Collapse eventKey="0" className="card-body">*/}
              <Card.Body>
                <label>CATEGORY 1</label>
                <input
                  type="text"
                  placeholder="Category1..."
                  name="Category_1"
                  className="form-control"
                  onChange={handleChange}
                  value={identifiers.Category_1}
                />
                <label style={{ marginTop: "10px" }}>CATEGORY 2</label>
                <input
                  type="text"
                  placeholder="Category2..."
                  name="Category_2"
                  className="form-control"
                  onChange={handleChange}
                  value={identifiers.Category_2}
                />
                <label style={{ marginTop: "10px" }}>CATEGORY 3</label>
                <input
                  type="text"
                  placeholder="Category3..."
                  name="Category_3"
                  className="form-control"
                  onChange={handleChange}
                  value={identifiers.Category_3}
                />
              </Card.Body>
            {/*</Accordion.Collapse>*/}
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductIdentifiers;
