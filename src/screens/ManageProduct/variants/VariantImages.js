import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png"
import { ProductContext } from "../../ProductContext/ProductContext";
import "../parent/Product.css"


const VariantImages = () => {
  const productData=useContext(ProductContext)

  const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

    const variantImageUrls = Object.keys(variantData?.[0] || {}).filter(
      (key) =>
        key.startsWith("Image_Variant") &&
        key.endsWith("_original") &&
        variantData?.[0]?.[key]
    ).map(key => variantData[0][key]);

    console.log("variantImages",variantImageUrls)
  return (
    <Row style={{marginBottom: "-15px"}}>
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
                Images (Images Length)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body className="d-flex justify-content-center">
             {variantImageUrls.map((imageUrl, index) => (
              <>
              <div className="image-box-variant">

              <Image
                    key={index}
                    src={imageUrl}
                    alt={`Variant Image ${index + 1}`}
                    className="image-box__image-variant"
                  />
                  </div>
              </>
                  
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          {/*<Button className="btn ml-3 mt-2 mb-2" variant="outline-primary">
            <i className="fa fa-plus mr-2"></i>Add Images
  </Button>*/}
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantImages;
