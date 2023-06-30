import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductTitle = (props) => {
  const { aiTitleValue, parentTitleValue } = useContext(ProductContext);
  const [aiTitle, setAiTitle] = useState("");
  const [parentTitle, setParentTitle] = useState("");

  useEffect(() => {
    setAiTitle(aiTitleValue);
    setParentTitle(parentTitleValue);
  }, [aiTitleValue, parentTitleValue]);

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
              <Card.Body className="custom-padding-card">
                <label>Parent Title</label>
                <input
                  type="text"
                  placeholder="Parent Title"
                  name="parentTitle"
                  className="form-control"
                  value={parentTitle ? parentTitle : ""}
                  onChange={(e) => {
                    setParentTitle(e.target.value);
                    props.setParentTitle(e.target.value);
                  }}
                />
                <label style={{marginTop: "10px"}}>AI Title</label>
                <input
                  type="text"
                  placeholder="AI Title"
                  name="aiTitle"
                  className="form-control"
                  onChange={(e) => {
                    setAiTitle(e.target.value);
                    props.setAiTitle(e.target.value);
                  }}
                  value={aiTitle && (aiTitle.includes("AI Generated") ? aiTitle.slice(13) : aiTitle)}
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
