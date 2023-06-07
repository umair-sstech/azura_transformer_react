import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";

const CustomFields = () => {
  const { customFields } = useContext(ProductContext);
  const [customField, setCustomFields] = useState([]);

  useEffect(() => {
    setCustomFields(customFields || []);
  }, [customFields]);

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customField];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setCustomFields(updatedFields);
  };

  const handleAddField = () => {
    setCustomFields([...customField, {}]);
  };

  return (
    <Row style={{ marginBottom: "-15px" }}>
      <Col>
        <Accordion defaultActiveKey="7" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                as="button"
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Custom Fields 
                {/* <span className="ml-4">view all custom fields</span> */}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <strong>Custom Field Name</strong>
                  </p>
                  <p>
                    <strong>Custom Field Value</strong>
                  </p>
                </div>
                <hr />
                {customField?.map((field, index) => (
                  <div key={index} className="d-flex justify-content-around align-items-center mb-3">
                    <i className="fa fa-solid fa-trash fa-lg ml-2" style={{ color: "red" }}></i>
                    <div>
                      <input
                        type="text"
                        placeholder="Source..."
                        name={`source_${index}`}
                        className="form-control"
                        value={field.customFieldName || ""}
                        onChange={(e) => handleCustomFieldChange(index, "customFieldName", e.target.value)}
                      />
                    </div>
                    <span className="ml-3">=</span>
                    <div>
                      <input
                        type="text"
                        placeholder="Brands Distribution"
                        name={`brands_distribution_${index}`}
                        className="form-control"
                        value={field.customValue || ""}
                        onChange={(e) => handleCustomFieldChange(index, "customValue", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Row></Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Button className="btn ml-3 mt-2 mb-2" variant="outline-primary" onClick={handleAddField}>
            <i className="fa fa-plus mr-2"></i>Add Custom Field
          </Button>
        </Accordion>
      </Col>
    </Row>
  );
};

export default CustomFields;
