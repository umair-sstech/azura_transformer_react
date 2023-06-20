import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import "../parent/Product.css"


const VariantIdentifiers = ({ identifiers, setIdentifiers }) => {
  const { productData, singleVariantData } = useContext(ProductContext);
  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

  useEffect(() => {
    if (variantData) {
      setIdentifiers({
        Variant_SKU:
          singleVariantData !== null
            ? singleVariantData?.Variant_SKU
            : variantData?.[0]?.Variant_SKU || "",
        UPC:
          singleVariantData !== null
            ? singleVariantData?.UPC
            : variantData?.[0]?.UPC || "",
        MPN:
          singleVariantData !== null
            ? singleVariantData?.MPN
            : variantData?.[0]?.MPN || "",
        EAN:
          singleVariantData !== null
            ? singleVariantData?.EAN
            : variantData?.[0]?.EAN || "",
        ASIN:
          singleVariantData !== null
            ? singleVariantData?.ASIN
            : variantData?.[0]?.ASIN || "",
        Cost_Price:
          singleVariantData !== null
            ? singleVariantData?.Cost_Price
            : variantData?.[0]?.Cost_Price || "",
        Retail_Price:
          singleVariantData !== null
            ? singleVariantData?.Retail_Price
            : variantData?.[0]?.Retail_Price || "",
        Suggested_Sell_Price:
          singleVariantData !== null
            ? singleVariantData?.Suggested_Sell_Price
            : variantData?.[0]?.Suggested_Sell_Price || "",
      });
    }
  }, [variantData, singleVariantData]);

  const handleChange = (event) => {
    setIdentifiers({ ...identifiers, [event.target.name]: event.target.value });
  };

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Identifiers</span>
                  {/* <i className="fa fa-angle-down arrow color-arrow"></i> */}
                </div>
              </Accordion.Toggle>
            </Card.Header>
          {/*  <Accordion.Collapse eventKey="1" className="card-body">*/}
              <Card.Body>
                <label>VARIANT SKU</label>
                <input
                  type="text"
                  placeholder="Enter SKU"
                  name="Variant_SKU"
                  className="form-control"
                  value={identifiers.Variant_SKU}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>UPC</label>
                <input
                  type="text"
                  placeholder="Enter UPC"
                  name="UPC"
                  className="form-control"
                  value={identifiers.UPC}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>MPN</label>
                <input
                  type="text"
                  placeholder="Enter MPN"
                  name="MPN"
                  className="form-control"
                  value={identifiers.MPN}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>EAN</label>
                <input
                  type="text"
                  placeholder="Enter EAN"
                  name="EAN"
                  className="form-control"
                  value={identifiers.EAN}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>ASIN</label>
                <input
                  type="text"
                  placeholder="Enter ASIN"
                  name="ASIN"
                  className="form-control"
                  value={identifiers.ASIN}
                  onChange={handleChange}
                />
              </Card.Body>
           {/* </Accordion.Collapse>*/}
          </Card>
        </Accordion>
      </Col>

      <Col>
        <Accordion defaultActiveKey="0" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Prices</span>
                  {/* <i className="fa fa-angle-down arrow color-arrow"></i> */}
                </div>
              </Accordion.Toggle>
            </Card.Header>
           { /*<Accordion.Collapse eventKey="0" className="card-body">*/}
              <Card.Body>
                <label style={{ marginTop: "10px" }}>COAST PRICE</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="Cost_Price"
                  className="form-control"
                  value={identifiers.Cost_Price}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>RETAIL PRICE</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="Retail_Price"
                  className="form-control"
                  value={identifiers.Retail_Price}
                  onChange={handleChange}
                />

                <label style={{ marginTop: "10px" }}>SELL PRICE</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="Suggested_Sell_Price"
                  className="form-control"
                  value={identifiers.Suggested_Sell_Price}
                  onChange={handleChange}
                />
              </Card.Body>
           {/* </Accordion.Collapse>*/}
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantIdentifiers;
