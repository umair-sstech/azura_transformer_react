import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductOptions = () => {
  const product = useContext(ProductContext);
  const { mainColor, sizeOnly } = product;
  const [colorValue, setColorValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  useEffect(() => {
    setColorValue(mainColor);
  }, [mainColor]);

  useEffect(() => {
    setSizeValue(sizeOnly);
  }, [sizeOnly]);



  const handleColorChange = (event) => {
    setColorValue(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSizeValue(event.target.value);
  };

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="5" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Options</span>
                  <i className="fa fa-angle-down arrow"></i>
                </div>
                {/* <span className="ml-4">view all options</span> */}
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
                    placeholder="Color"
                    name="color"
                    className="form-control ml-3"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Enter Color Name"
                    name="yellow"
                    className="form-control ml-3"
                    style={{ flex: "2 1 0" }}
                    value={colorValue}
                    onChange={handleColorChange}
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
                    placeholder="Size"
                    name="size"
                    className="form-control ml-3"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Enter Size"
                    name="nosize"
                    className="form-control ml-3"
                    style={{ flex: "2 1 0" }}
                    value={sizeValue}
                    onChange={handleSizeChange}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          {/*<Button className="btn ml-3 mt-2 mb-2" variant="outline-primary"><i className="fa fa-plus mr-2"></i>Add Option</Button>*/}
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductOptions;
