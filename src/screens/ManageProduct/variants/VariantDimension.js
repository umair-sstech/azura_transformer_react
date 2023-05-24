import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const VariantDimension = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="6" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Dimensions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <Row>
                  <div className="col-lg-6">
                    <label>DIMENSION UNIT</label>
                    <select className="form-control">
                      <option>Inch(es)</option>
                      <option>c.m.</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mt-3 mt-lg-0">
                    <label>WEIGHT UNIT</label>
                    <select className="form-control">
                      <option>Pound(s)</option>
                      <option>Kg</option>
                    </select>
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>LENGTH</label>
                    <input
                      type="number"
                      placeholder=""
                      name="length"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WEIGHT</label>
                    <input
                      type="number"
                      placeholder="0.36"
                      name="weight"
                      className="form-control"
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WIDTH</label>
                    <input
                      type="number"
                      placeholder=""
                      name="width"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>DIMENSIONAL WEIGHT</label>
                    <input
                      type="number"
                      placeholder=""
                      name="dimensionalWeight"
                      disabled
                      className="form-control"
                    />
                  </div>
                </Row>

                <Row>
                    <Col>
                    <label style={{ marginTop: "10px" }}>HEIGHT</label>
                    <input
                      type="number"
                      placeholder=""
                      name="height"
                      className="form-control"
                    />  
                    </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantDimension;
