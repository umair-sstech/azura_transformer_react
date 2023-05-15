import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

const ProductDescription = () => {
  return (
    <Row>
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
            <Accordion.Collapse eventKey="0" className="card-body p-3">
              <Card.Body>
                <p>Brand : Guess</p>
                <p>Collection: Spring/summer</p>
                <p>Gender: Woman</p>
                <p>Frame: Metal</p>
                <p>Bridge, Mm: 18</p>
                <p>Temples, Mm: 145 </p>
                <p>Lenses Diameter, Mm: 61</p>
                <p>Protection: Uv3</p>
                <p>Logo: Yes</p>
                <p style={{marginBottom: '-10px'}}>Original Packaging: Yes</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-edit mr-2"></i>Edit
          </Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductDescription;
