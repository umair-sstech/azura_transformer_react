import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const VariantIdentifiers = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
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
                <label>MASTER SKU</label>
                <input
                  type="text"
                  placeholder="SKU..."
                  name="sku"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>UPC</label>
                <input
                  type="text"
                  placeholder="UPC"
                  name="upc"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>MPN</label>
                <input
                  type="text"
                  placeholder="MPN"
                  name="mpn"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>EAN</label>
                <input
                  type="text"
                  placeholder="EAN"
                  name="ean"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>ASIN</label>
                <input
                  type="text"
                  placeholder="ASIN"
                  name="asin"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }} className="text-uppercase">
                  Reference Identifier
                </label>
                <input
                  type="text"
                  placeholder="Reference"
                  name="reference"
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
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Prices
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <label className="text-uppercase">Default List Price</label>
                <input
                  type="text"
                  placeholder="$12.51"
                  name="listPrice"
                  disabled
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>EST. CNST</label>
                <input
                  type="text"
                  placeholder="$12.51"
                  name="estCost"
                  disabled
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>MSRP</label>
                <input
                  type="text"
                  placeholder="$100.50"
                  name="msrp"
                  disabled
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>MAP</label>
                <input
                  type="text"
                  placeholder="empty"
                  name="map"
                  disabled
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>EST. SHIPPING COST</label>
                <input
                  type="text"
                  placeholder="empty"
                  name="shippingCost"
                  disabled
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>EST. DROPSHIP FEE</label>
                <input
                  type="text"
                  placeholder="empty"
                  name="dropshipCost"
                  disabled
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

export default VariantIdentifiers;
