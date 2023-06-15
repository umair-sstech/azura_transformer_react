import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/en-gb";
import "../parent/Product.css";

const VariantDescription = (props) => {
  const { productData, singleVariantData } = useContext(ProductContext);

  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

  // const description = singleVariantData !== null ? singleVariantData?.AI_Description : variantData?.[0]?.AI_Description;
  // const bullteDescription = singleVariantData !== null ? singleVariantData?.AI_Bullet_Description : variantData?.[0]?.AI_Bullet_Description;

  const description =
    singleVariantData !== null
      ? singleVariantData?.AI_Description !== null
        ? singleVariantData?.AI_Description
        : singleVariantData?.Plain_Description
      : variantData?.[0]?.AI_Description;

  const bullteDescription =
    singleVariantData !== null
      ? singleVariantData?.AI_Bullet_Description !== null
        ? singleVariantData?.AI_Bullet_Description
        : singleVariantData?.Plain_Description
      : variantData?.[0]?.AI_Bullet_Description;

  const renderDescription = () => {
    const lines = description?.split("\n");
    return lines?.join("<br>");
  };

  const bulletDescription = () => {
    const lines = bullteDescription?.split("\n");
    return lines?.join("<br>");
  };
  return (
    <>
      <Row style={{ marginBottom: "-15px" }}>
        <Col>
          <Accordion defaultActiveKey="3" className="accordian__main">
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  style={{ textDecoration: "none" }}
                  as="button"
                  className="btn btn-link collapsed"
                  eventKey="0"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Description</span>
                    <i className="fa fa-angle-down arrow color-arrow"></i>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <CKEditor
                    editor={ClassicEditor}
                    data={renderDescription()}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      props.setDescription(data); // Call the callback function from the Parent component
                    }}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* <hr /> */}
            {/* <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-edit mr-2"></i>Edit
          </Button> */}
          </Accordion>
        </Col>
      </Row>

      <Row style={{ marginBottom: "-15px" }}>
        <Col>
          <Accordion defaultActiveKey="3" className="accordian__main">
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  style={{ textDecoration: "none" }}
                  as="button"
                  className="btn btn-link collapsed"
                  eventKey="0"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Bullet Description</span>
                    <i className="fa fa-angle-down arrow color-arrow"></i>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <CKEditor
                    editor={ClassicEditor}
                    data={bulletDescription()}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      props.setDescription(data); // Call the callback function from the Parent component
                    }}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* <hr /> */}
            {/* <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
          <i className="fa fa-edit mr-2"></i>Edit
        </Button> */}
          </Accordion>
        </Col>
      </Row>
    </>
  );
};

export default VariantDescription;
