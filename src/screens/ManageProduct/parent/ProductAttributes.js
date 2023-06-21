import React, { useContext, useEffect } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import "./Product.css";

const ProductAttributes = ({ attribute, setAttributes }) => {

  const product = useContext(ProductContext);

  useEffect(() => {
    if (product) {
      setAttributes({
        Model: product?.Model || "",
        Country_of_Origin: product?.Country_of_Origin || "",
        Season: "",
        Type: product?.Type || "",
        Sleeves: product?.Sleeves || "",
        Collar: product?.Collar || "",
        Pattern: product?.Pattern || "",
        Pockets: product?.Pockets || "",
        Neck: product?.Neck || "",
        Sole: product?.Sole || "",
        Additonal_Details: product?.Additonal_Details || "",
        Closure: product?.Closure || "",
        Handle_Drop: product?.Handle_Drop || "",
        Strap_Drop: product?.Strap_Drop || "",
        Dust_Bag: product?.Dust_Bag || "",
        Box: product?.Box || "",
        Diameter: product?.Diameter || "",
        Circumference: product?.Circumference || "",
        Carat: product?.Carat || "",
        Watch_Hardware_Color: product?.Watch_Hardware_Color || "",
        Watch_Band_Color: product?.Watch_Band_Color || "",
        Watch_Case_Material: product?.Watch_Case_Material || "",
        Watch_Case_Shape: product?.Watch_Case_Shape || "",
        Watch_Case_Color: product?.Watch_Case_Color || "",
        Watch_Brand_of_Movement: product?.Watch_Brand_of_Movement || "",
        Watch_Display: product?.Watch_Display || "",
        Watch_Case_Thickness: product?.Watch_Case_Thickness || "",
        Watch_Case_Diameter: product?.Watch_Case_Diameter || "",
        Watch_Band_Material: product?.Watch_Band_Material || "",
        Watch_Crown: product?.Watch_Crown || "",
        Waterproof: product?.Waterproof || "",
        Watch_Power_Supply: product?.Watch_Power_Supply || "",
        Watch_Band_Width: product?.Watch_Band_Width || "",
        Watch_Movement_Type: product?.Watch_Movement_Type || "",
        Watch_Glass: product?.Watch_Glass || "",
        "Sunglasses/Frames_Lens": product?.["Sunglasses/Frames_Lens"] || "",
        "Sunglasses/Frames_Material": product?.["Sunglasses/Frames_Material"] || "",
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttributes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="5" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Attributes </span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Attribute Name</strong>
                  </p>
                  <p>
                    <strong>Attribute Value</strong>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Model"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Model"
                    name="Model"
                    className="form-control custom-height ml-3"
                    value={attribute.Model}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Country of Origin"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Country of Origin"
                    name="Country_of_Origin"
                    className="form-control custom-height ml-3"
                    value={attribute.Country_of_Origin}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Season"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Season"
                    name="Season"
                    className="form-control custom-height ml-3"
                    value={attribute.Season}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Type"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    name="Type"
                    className="form-control custom-height ml-3"
                    value={attribute.Type}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Sleeves"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Sleeves"
                    name="Sleeves"
                    className="form-control custom-height ml-3"
                    value={attribute.Sleeves}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Collar"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Collar"
                    name="Collar"
                    className="form-control custom-height ml-3"
                    value={attribute.Collar}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Pattern"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Pattern"
                    name="Pattern"
                    className="form-control custom-height ml-3"
                    value={attribute.Pattern}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Pockets"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Pockets"
                    name="Pockets"
                    className="form-control custom-height ml-3"
                    value={attribute.Pockets}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Neck"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Neck"
                    name="Neck"
                    className="form-control custom-height ml-3"
                    value={attribute.Neck}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Sole"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Sole"
                    name="Sole"
                    className="form-control custom-height ml-3"
                    value={attribute.Sole}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Additonal Details"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Additonal Details"
                    name="Additonal_Details"
                    className="form-control custom-height ml-3"
                    value={attribute.Additonal_Details}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Closure"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Closure"
                    name="Closure"
                    className="form-control custom-height ml-3"
                    value={attribute.Closure}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Handle Drop"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Handle Drop"
                    name="Handle_Drop"
                    className="form-control custom-height ml-3"
                    value={attribute.Handle_Drop}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Strap Drop"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Strap Drop"
                    name="Strap_Drop"
                    className="form-control custom-height ml-3"
                    value={attribute.Strap_Drop}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Dust Bag"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Dust Bag"
                    name="Dust_Bag"
                    className="form-control custom-height ml-3"
                    value={attribute.Dust_Bag}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Box"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Box"
                    name="Box"
                    className="form-control custom-height ml-3"
                    value={attribute.Box}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Diameter"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Diameter"
                    name="Diameter"
                    className="form-control custom-height ml-3"
                    value={attribute.Diameter}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Circumference"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Circumference"
                    name="Circumference"
                    className="form-control custom-height ml-3"
                    value={attribute.Circumference}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Carat"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Carat"
                    name="Carat"
                    className="form-control custom-height ml-3"
                    value={attribute.Carat}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Sunglasses/Frames Lens"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Sunglasses/Frames_Lens"
                    name="Sunglasses/Frames_Lens"
                    className="form-control custom-height ml-3"
                    value={attribute["Sunglasses/Frames_Lens"]}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Sunglasses/Frames Material"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Sunglasses/Frames_Material"
                    name="Sunglasses/Frames_Material"
                    className="form-control custom-height ml-3"
                    value={attribute["Sunglasses/Frames_Material"]}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Hardware Color"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Hardware_Color"
                    name="Watch_Hardware_Color"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Hardware_Color}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Band Color"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Band_Color"
                    name="Watch_Band_Color"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Band_Color}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Case Material"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Case_Material"
                    name="Watch_Case_Material"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Case_Material}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Case Shape"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Case_Shape"
                    name="Watch_Case_Shape"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Case_Shape}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Case Color"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Case_Color"
                    name="Watch_Case_Color"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Case_Color}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Brand of Movement"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Brand_of_Movement"
                    name="Watch_Brand_of_Movement"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Brand_of_Movement}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Display"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch_Display"
                    name="Watch_Display"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Display}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Case Thickness"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Case Thickness"
                    name="Watch_Case_Thickness"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Case_Thickness}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Case Diameter"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Case Diameter"
                    name="Watch_Case_Diameter"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Case_Diameter}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Band Material"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Band Material"
                    name="Watch_Band_Material"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Band_Material}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Crown"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Crown"
                    name="Watch_Crown"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Crown}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Waterproof"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Waterproof"
                    name="Waterproof"
                    className="form-control custom-height ml-3"
                    value={attribute.Waterproof}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Power Supply"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Power Supply"
                    name="Watch_Power_Supply"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Power_Supply}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Band Width"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Band Width"
                    name="Watch_Band_Width"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Band_Width}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Movement Type"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Movement Type"
                    name="Watch_Movement_Type"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Movement_Type}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3">
                  <input
                    type="text"
                    placeholder="Watch Glass"
                    className="form-control custom-height ml-2"
                    style={{ flex: "1 1 0" }}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Watch Glass"
                    name="Watch_Glass"
                    className="form-control custom-height ml-3"
                    value={attribute.Watch_Glass}
                    onChange={handleChange}
                    style={{ flex: "2 1 0" }}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          {/* <Button className="btn ml-3 mt-3 mb-2" variant="outline-primary" onClick={addAttribute}><i className="fa fa-plus mr-2"></i>Add Attribute</Button> */}
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProductAttributes;
