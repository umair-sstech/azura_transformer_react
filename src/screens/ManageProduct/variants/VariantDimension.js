import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const VariantDimension = () => {
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
        <Accordion defaultActiveKey="6" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Dimensions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <Row>
                  <div className="col-lg-6">
                    <label>DIMENSION UNIT</label>
                    <select className="form-control">
                      <option>Inch(es)</option>
                      <option>c.m.</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mt-3 mt-lg-0">
                    <label>WEIGHT UNIT</label>
                    <select className="form-control">
                      <option>Pound(s)</option>
                      <option>Kg</option>
                    </select>
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>LENGTH</label>
                    <input
                      type="number"
                      placeholder=""
                      name="length"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WEIGHT</label>
                    <input
                      type="number"
                      placeholder="0.36"
                      name="weight"
                      className="form-control"
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>WIDTH</label>
                    <input
                      type="number"
                      placeholder=""
                      name="width"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 mt-2 mt-lg-0">
                    <label style={{ marginTop: "10px" }}>DIMENSIONAL WEIGHT</label>
                    <input
                      type="number"
                      placeholder=""
                      name="dimensionalWeight"
                      disabled
                      className="form-control"
                    />
                  </div>
                </Row>

                <Row>
                    <Col>
                    <label style={{ marginTop: "10px" }}>HEIGHT</label>
                    <input
                      type="number"
                      placeholder=""
                      name="height"
                      className="form-control"
                    />  
                    </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantDimension;
