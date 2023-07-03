import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/en-gb";
import "./Product.css";
import { ProductContext } from "../../ProductContext/ProductContext";

const ProductDescription = (props) => {
  const {aiDesc,aiDescBullet} = useContext(ProductContext);
 
  const renderDescription = () => {
    const lines = aiDesc?.split('\n');
    const cleanedLines = lines?.map(line => line.replace(/["\[\]]/g, ''));
    return cleanedLines?.join('<br>');
  };

  const bulletDescription = () => {
    const lines = aiDescBullet?.split('\n');
    const cleanedLines = lines?.map(line => line.replace(/["\[\]]/g, ''));
    return cleanedLines?.join('<br>');
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
          <hr />
          {/*<Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-edit mr-2"></i>Edit
  </Button>*/}
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
                    props.setBulletDescription(data); // Call the callback function from the Parent component
                  }}
                />
                 
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          {/*<Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-edit mr-2"></i>Edit
  </Button>*/}
        </Accordion>
      </Col>
    </Row>
    </>
  );
};

export default ProductDescription;
