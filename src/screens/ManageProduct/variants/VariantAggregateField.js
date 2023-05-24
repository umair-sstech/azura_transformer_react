import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const VariantAggregateField = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="8" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Custom Aggregate Fields (1)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="row mt-2 mb-2">
                  <div className="col-4">
                    <strong>Name</strong>
                  </div>
                  <div className="col-8">
                    <strong>Value</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-4">
                    <span>HKDC</span>
                  </div>
                  <div className="col-8">
                    <span>38</span>
                  </div>
                </div>
                <Row></Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantAggregateField;
