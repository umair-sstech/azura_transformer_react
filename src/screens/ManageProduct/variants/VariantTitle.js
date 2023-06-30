import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const VariantTitle = (props) => {
  const { productData, singleVariantData } = useContext(ProductContext)
  const [aiTitle, setAiTitle] = useState("");
  const [variantTitle, setVariantTitle] = useState("");

  const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

  // const variantTitle = singleVariantData !== null ? singleVariantData?.Variant_Title : variantData?.[0]?.Variant_Title;

  const aiTitleValue = singleVariantData !== null ? singleVariantData?.AI_TITLE?.replace(/"/g, "") : variantData?.[0]?.AI_TITLE?.replace(/"/g, "");
  const variantTitleValue = singleVariantData !== null ? singleVariantData?.Variant_Title : variantData?.[0]?.Variant_Title

  // const variantTitle = variantTitle1 ? variantTitle1 : variantTitle2;

  useEffect(() => {
    setAiTitle(aiTitleValue);
    setVariantTitle(variantTitleValue);
  }, [variantTitleValue, aiTitleValue]);

  return (
    <Row style={{marginBottom: "-15px"}}>
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
                <label>Variant Title</label>
                <input
                  type="text"
                  placeholder="Variant Title"
                  name="varientTitle"
                  className="form-control"
                  value={variantTitle ? variantTitle : ""}
                  onChange={(e) => {
                    setVariantTitle(e.target.value);
                    props.setVariantTitle(e.target.value);
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

export default VariantTitle;
