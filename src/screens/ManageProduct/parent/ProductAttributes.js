import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import "./Product.css"
import Attributes from "./Attributes";

const ProductAttributes = ({attribute,setAttributes}) => {


  const handleAttributeChange = (index, attr, value) => {
    const updatedFields = [...attribute];
    updatedFields[index] = { ...updatedFields[index], [attr]: value };
    setAttributes(updatedFields);
  };

  const deleteAttribute = (id) => {
    setAttributes(attr => attr.filter((_, idx) => idx !== id))
  }


  return (
    <Row style={{marginBottom: "-15px"}}>
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
                <div className="d-flex justify-content-between align-items-center">
                  <span>Attributes </span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Attribute Name</strong>
                  </p>
                  <p>
                    <strong>Attribute Value</strong>
                  </p>
                </div>
                <hr />
                {attribute.map((attr, idx) => {
                  return (
                    <div
                      className="d-flex justify-content-around align-items-center mt-3"
                      key={idx}
                    >
                  {/*    <i
                        className="fa fa-trash fa-lg ml-2"
                        role="button"
                        aria-hidden="true"
                        style={{ color: "red" }}
                        onClick={() => deleteAttribute(idx)}
                  ></i>*/}
                      <input
                        type="text"
                        placeholder={attr.name}
                        name={attr.name}
                        disabled
                        className="form-control ml-3"
                        style={{ flex: "1 1 0" }}
                      />
                      <span className="ml-3"> = </span>
                      <input
                      type="text"
                      placeholder={attr.name}
                      name={attr.name}
                      className="form-control ml-3"
                      style={{ flex: "1 1 0" }}
                      value={attr.value}
                      onChange={(e) => handleAttributeChange(idx, "value", e.target.value)}
                    />
                    
                    </div>
                  );
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          {/* <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary" onClick={addAttribute}><i className="fa fa-plus mr-2"></i>Add Attribute</Button> */}
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductAttributes;
