import React from "react";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";
import airConditioner from '../../../assets/images/air-conditioner-grey.png';
import envelope from '../../../assets/images/envelope.png';

const ProductImages = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
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
              <Card.Body className="d-flex justify-content-center" style={{gap: "50px"}}>
                <Image src={envelope} alt="envelope" width={100}/>
                <Image src={airConditioner} alt="air conditiner" />
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
