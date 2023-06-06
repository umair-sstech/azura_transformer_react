import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/en-gb";
import "../parent/Product.css"

const VariantDescription = () => {
  const productData=useContext(ProductContext);

const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

const description = variantData?.[0]?.Plain_Description;


  return (
    <Row style={{marginBottom: "-15px"}}>
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
                Description
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <CKEditor
              editor={ClassicEditor}
              data={description}
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
  );
};

export default VariantDescription;
