import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const ProductIdentifiers = () => {

  return (
    <Row>
      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="1"
              >
                Identifiers
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1" className="card-body">
              <Card.Body>
                <label>SKU</label>
                <input
                  type="text"
                  placeholder="SKU..."
                  name="sku"
                  className="form-control"
                />
                <label style={{ marginTop: "10px" }}>BRAND</label>
                <input
                  type="text"
                  placeholder="Brand..."
                  name="brand"
                  className="form-control"
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>

      <Col>
        <Accordion defaultActiveKey="2" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{textDecoration: "none"}}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Categories
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <label>CATEGORY 1</label>
                <select className="form-control">
                  <option>MM</option>
                  <option>01 - January</option>
                  <option>02 - February</option>
                  <option>03 - February</option>
                </select>
                <label style={{ marginTop: "10px" }}>CATEGORY 2</label>
                <input
                  type="text"
                  placeholder="Category2..."
                  name="category2"
                  className="form-control"
                />
                <label style={{ marginTop: "10px" }}>CATEGORY 3</label>
                <input
                  type="text"
                  placeholder="Category3..."
                  name="category3"
                  className="form-control"
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductIdentifiers;
