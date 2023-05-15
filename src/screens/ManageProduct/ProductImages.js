import React from "react";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";

const ProductImages = () => {
  return (
    <Row>
      <Col>
        <Accordion defaultActiveKey="4" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{textDecoration: "none"}}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Images (Images Length)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <Image src="../../assets/images/envelope.png" thumbnail />
                <Image src="../../assets/images/air-conditioner-grey.png" />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr/>
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary"><i className="fa fa-plus mr-2"></i>Add Images</Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductImages;
