import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const VariantOptions = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="5" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Options (2)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <label className="mt-1">COLOR</label>
                <input
                  type="text"
                  placeholder="Sky Blue"
                  name="color"
                  className="form-control"
                />

                <label style={{ marginTop: "10px" }}>SIZE</label>
                <input
                  type="text"
                  placeholder="(US 16-18)XL"
                  name="size"
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

export default VariantOptions;
