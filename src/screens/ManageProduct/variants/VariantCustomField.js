import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

const VariantCustomField = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="7" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Custom Fields (Custom Fields Length)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Custom Field Name</strong>
                  </p>
                  <p>
                    <strong>Custom Field Value</strong>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-around align-items-center">
                  <i
                    className="fa fa-solid fa-trash fa-lg ml-2"
                    style={{ color: "red" }}
                  ></i>
                  <input
                    type="text"
                    placeholder="Source..."
                    name="source"
                    className="form-control ml-3"
                    style={{ flex: "1 1 0" }}
                  />{" "}
                  <span className="ml-3"> = </span>
                  <input
                    type="text"
                    placeholder="Dropship Clothes"
                    name="dropshipClothes"
                    className="form-control ml-3"
                    style={{ flex: "2 1 0" }}
                  />
                </div>
                <Row></Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-plus mr-2"></i>Add Custom Field
          </Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantCustomField;
