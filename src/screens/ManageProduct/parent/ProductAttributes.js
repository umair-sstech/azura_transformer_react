import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import attributes from "./Attributes";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductAttributes = () => {
  const product = useContext(ProductContext);
  // console.log("product--", product);
  const [attribute, setAttributes] = useState(attributes)

  useEffect(() => {
    for(const attr of attribute) {
      findCommonAttribute(attr.name)
    }
  }, [attribute])
  

  // const addAttribute = () => {
  //   setAttributes(attr => {
  //     return [...attr, {
  //       name: "",
  //       valie: ""
  //     }]
  //   })
  // }

  const handleAttributeChange = (index, attr, value) => {
    const updatedFields = [...attribute];
    updatedFields[index] = { ...updatedFields[index], [attr]: value };
    setAttributes(updatedFields);
  };

  const deleteAttribute = (id) => {
    setAttributes(attr => attr.filter((_, idx) => idx !== id))
  }

  const findCommonAttribute = (commonAttribute) => {
    const commonAttr = attribute.find(attr => attr.name === commonAttribute)
    if(commonAttr) {
      commonAttr.value = product?.commonAttribute || ""
    }
    // console.log("commmon--", commonAttr);
  }

  // const matchedValues = attribute.map(attr => {
  //   const databaseValue = [product].filter(dbVal => {
  //     console.log("dbVal--", dbVal);
  //   })
  //   // const databaseValue = [product].find(dbValue => dbValue.name === attr.name);
  //   console.log(databaseValue);
  //   // return { name: attr.name, value: databaseValue ? databaseValue.value : '' };
  // });

  // console.log("matched--", matchedValues);

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
                  <span>Attributes ({attribute.length})</span>
                  <i className="fa fa-angle-down arrow"></i>
                </div>
                {/* <span className="ml-4">view all attribues</span> */}
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
                      <i
                        className="fa fa-trash fa-lg ml-2"
                        role="button"
                        aria-hidden="true"
                        style={{ color: "red" }}
                        onClick={() => deleteAttribute(idx)}
                      ></i>
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
                        placeholder={attr.value}
                        name={attr.value}
                        // value={}
                        className="form-control ml-3"
                        style={{ flex: "2 1 0" }}
                        onChange={(e) => handleAttributeChange(idx, attr.name, e.target.value)}
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
