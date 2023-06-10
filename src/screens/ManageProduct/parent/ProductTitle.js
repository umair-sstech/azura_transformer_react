import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductTitle = (props) => {
  const titleValue = useContext(ProductContext);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(titleValue);
  }, [titleValue]);

  const handleChange = (event) => {
    setTitle(event.target.value);
    props.setTitle(event.target.value); 
  };

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Title
              </Accordion.Toggle>
            </Card.Header>
            {/* <Accordion.Collapse eventKey="0"> */}
              <Card.Body>
                <input
                  type="text"
                  placeholder="Title..."
                  name="title"
                  className="form-control mt-2"
                  value={title ? title : ""}
                  onChange={handleChange}
                />
              </Card.Body>
            {/* </Accordion.Collapse> */}
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductTitle;
