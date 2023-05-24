import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

const VariantDescription = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="3" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Description
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p className="mt-2">This variant has no description.</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          {/* <hr /> */}
          {/* <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-edit mr-2"></i>Edit
          </Button> */}
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantDescription;
