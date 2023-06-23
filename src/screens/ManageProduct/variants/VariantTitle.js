import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const VariantTitle = (props) => {
  const { productData, singleVariantData } = useContext(ProductContext)
  const [title, setTitle] = useState("");

  const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

  // const variantTitle = singleVariantData !== null ? singleVariantData?.Variant_Title : variantData?.[0]?.Variant_Title;

  const variantTitle1 = singleVariantData !== null ? singleVariantData?.AI_TITLE?.replace(/"/g, "") : variantData?.[0]?.AI_TITLE?.replace(/"/g, "");
  const variantTitle2 = singleVariantData !== null ? singleVariantData?.Variant_Title : variantData?.[0]?.Variant_Title

  const variantTitle = variantTitle1 ? variantTitle1 : variantTitle2;

  useEffect(() => {
    setTitle(variantTitle);
  }, [variantTitle]);

  const handleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    props.setTitle(newTitle); // Pass the new title to the parent component
  };

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
                <input
                  type="text"
                  placeholder="Enter Title..."
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

export default VariantTitle;
