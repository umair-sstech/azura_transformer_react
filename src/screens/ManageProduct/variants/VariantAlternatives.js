import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

const VariantAlternatives = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="12" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Product Alternatives (0)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p className="mt-2">
                  No product alternatives are associated with this variant
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-plus mr-2"></i>Add Product Alternative
          </Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantAlternatives;
