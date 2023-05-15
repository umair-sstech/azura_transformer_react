import React, { useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const ProductTitle = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Row>
      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{textDecoration: "none"}} 
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Title
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <input
                  type="text"
                  placeholder="Title..."
                  name="title"
                  className="form-control mt-2"
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductTitle;
