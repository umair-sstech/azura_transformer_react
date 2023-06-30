import React, { useContext } from "react";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import imageNotFound from "../../../assets/images/product-image-notFound.jpg";
import "../parent/Product.css"

const VariantImages = () => {
  const { productData, singleVariantData } = useContext(ProductContext)

  const variantData =
  productData?.product?.[0]?.Preference === "PARENT"
    ? productData?.variant
    : productData?.product;

    const variantImageUrls = Object.keys((singleVariantData !== null ? singleVariantData : variantData?.[0]) || {}).filter(
      (key) =>
        key.startsWith("Image_Variant") &&
        key.endsWith("_original") &&
        variantData?.[0]?.[key]
    ).map(key => variantData[0][key]);

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
                <div className="d-flex justify-content-between align-items-center">
                  <span>Images ({variantImageUrls?.length > 0 ? variantImageUrls.length : 0})</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body className="d-flex justify-content-center">
             {variantImageUrls?.length > 0 ? variantImageUrls.map((imageUrl, index) => (
              <>
              <div className="image-box-variant">

              <Image
                    key={index}
                    src={imageUrl}
                    alt={`Variant Image ${index + 1}`}
                    height={100}
                    width={100}
                    className="image-box__image-variant"
                  />
                  </div>
              </>
                  
                )) : (
                  <Image src={imageNotFound} alt="Image Not available..." height={150} width={150} />
                )}
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
