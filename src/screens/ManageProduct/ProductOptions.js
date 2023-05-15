import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

const ProductOptions = () => {
  return (
    <Row>
      <Col>
        <Accordion defaultActiveKey="5" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{textDecoration: "none"}}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Options (Options Length)
                <span className="ml-4">view all options</span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Option Name</strong>
                  </p>
                  <p>
                    <strong>Option Value</strong>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-around align-items-center">
                  <i
                    className="fa fa-trash fa-lg ml-2"
                    aria-hidden="true"
                    style={{ color: "red" }}
                  ></i>
                  <input
                    type="text"
                    placeholder="Color..."
                    name="color"
                    className="form-control ml-3"
                    style={{ flex: "1 1 0" }}
                  />
                  <input
                    type="text"
                    placeholder="Yellow"
                    name="yellow"
                    className="form-control ml-3"
                    style={{ flex: "2 1 0" }}
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mt-3">
                  <i
                    className="fa fa-trash fa-lg ml-2"
                    aria-hidden="true"
                    style={{ color: "red" }}
                  ></i>
                  <input
                    type="text"
                    placeholder="Size..."
                    name="size"
                    className="form-control ml-3"
                    style={{ flex: "1 1 0" }}
                  />
                  <input
                    type="text"
                    placeholder="NOSIZE"
                    name="nosize"
                    className="form-control ml-3"
                    style={{ flex: "2 1 0" }}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr/>
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary"><i className="fa fa-plus mr-2"></i>Add Option</Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductOptions;
