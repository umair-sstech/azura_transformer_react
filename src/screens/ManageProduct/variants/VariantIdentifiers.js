import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const VariantIdentifiers = () => {
  const productData = useContext(ProductContext);
  const [identifiers, setIdentifiers] = useState({ Variant_SKU: "", UPC: "", MPN: "", EAN: "", ASIN: "",Cost_Price:"",Retail_Price:"",Suggested_Sell_Price:"" });
  const variantData =
    productData?.product?.[0]?.Preference === "PARENT"
      ? productData?.variant
      : productData?.product;

      useEffect(() => {
        if (variantData) {
          setIdentifiers({
            Variant_SKU: variantData?.[0]?.Variant_SKU || "",
            UPC: variantData?.[0]?.UPC || "",
            MPN: variantData?.[0]?.MPN || "",
            EAN: variantData?.[0]?.EAN || "",
            ASIN: variantData?.[0]?.ASIN || "",
            Cost_Price: variantData?.[0]?.Cost_Price || "",
            Retail_Price: variantData?.[0]?.Retail_Price || "",
            Suggested_Sell_Price: variantData?.[0]?.Suggested_Sell_Price || "",
          });
        }
      }, [variantData]);  

      const handleChange = (event) => {
        setIdentifiers(event.target.value);
      };
  
  return (
    <Row style={{marginBottom: "-15px"}}>
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
                Identifiers
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1" className="card-body">
              <Card.Body>
                <label>VARIANT SKU</label>
                <input
                  type="text"
                  placeholder="SKU..."
                  name="sku"
                  className="form-control"
                  value={identifiers.Variant_SKU}
                  onChange={handleChange}

                />

                <label style={{ marginTop: "10px" }}>UPC</label>
                <input
                  type="text"
                  placeholder="UPC"
                  name="upc"
                  className="form-control"
                  value={identifiers.UPC}
                  onChange={handleChange}

                />

                <label style={{ marginTop: "10px" }}>MPN</label>
                <input
                  type="text"
                  placeholder="MPN"
                  name="mpn"
                  className="form-control"
                  value={identifiers.MPN}
                  onChange={handleChange}

                />

                <label style={{ marginTop: "10px" }}>EAN</label>
                <input
                  type="text"
                  placeholder="EAN"
                  name="ean"
                  className="form-control"
                  value={identifiers.EAN}
                  onChange={handleChange}

                />

                <label style={{ marginTop: "10px" }}>ASIN</label>
                <input
                  type="text"
                  placeholder="ASIN"
                  name="asin"
                  className="form-control"
                  value={identifiers.ASIN}
                  onChange={handleChange}

                />
                
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>

      <Col>
        <Accordion defaultActiveKey="2" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Prices
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
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
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantIdentifiers;
