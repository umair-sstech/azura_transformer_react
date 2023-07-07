import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";
import { ProductContext } from '../../ProductContext/ProductContext';
import imageNotFound from "../../../assets/images/product-image-notFound.jpg";
import "./Product.css";

const ProductImages = () => {
  const product = useContext(ProductContext);

  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const imageKeys = Object.keys(product).filter(
    key => key.startsWith("Image_Parent") && key.endsWith("original")
  );
  const imageCount = imageKeys.filter(key => product[key]).length;

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="4" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Images ({imageCount > 0 ? imageCount : 0})</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body className="d-flex justify-content-center flex-wrap">
                {imageCount > 0 ? imageKeys
                  .filter(key => product[key])
                  .map(key => (
                    <div key={key} className="image-box-variant">
                      <Image className="image-box__image-variant" src={product[key]} alt="product image" />
                    </div>
                  )) : (
                    <Image src={imageNotFound} alt="Image Not available..." height={150} width={150} />
                  )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
         { /*<Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-plus mr-2"></i>Add Images
                  </Button>*/}
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductImages;
