import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { ProductContext } from "../../ProductContext/ProductContext";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "../../ApiPath/Apipath";
import "../parent/Product.css"


const VariantCustomField = ({ customField, setCustomFields }) => {
  const { customFields } = useContext(ProductContext);

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
  const deleteCustomField = (id) => {
    const requestBody = {
      id: id
    };
    axios
      .post(`${API_PATH.DELETE_PRODUCT_DATA}`, requestBody)
      .then(response => {
        const { success, message, data } = response.data
        if (success) {

          toast.success(message);
        } else {
          toast.error(message)
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to delete data");
      });
  };

  const removeCustomField = (id) => {
    Swal.fire({
      title: "Are you sure, <br> you want to delete ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomField(id);
        setCustomFields(customField.filter(field => field.id !== id));

      }
    });
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
                <div className="d-flex justify-content-between align-items-center">
                  <span>Custom Fields</span>
                  <i className="fa fa-angle-down arrow color-arrow"></i>
                </div>
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
                  <div className="d-flex justify-content-around align-items-center mb-3 px-2" key={index}>
                    <i className="fa fa-solid fa-trash fa-lg ml-2" style={{ color: "red" }} onClick={() => removeCustomField(field.id)}></i>
                    <input
                      type="text"
                      placeholder="Enter Custom Field Name"
                      name={`source_${index}`}
                      className="form-control custom-height ml-3"
                      value={field.customFieldName || ""}
                      onChange={(e) => handleCustomFieldChange(index, "customFieldName", e.target.value)}
                      style={{ flex: "1 1 0" }}
                    />
                    <span className="ml-3">=</span>
                    <input
                      type="text"
                      placeholder="Entyer Custom Field Value"
                      name={`brands_distribution_${index}`}
                      className="form-control custom-height ml-3"
                      value={field.customValue || ""}
                      onChange={(e) => handleCustomFieldChange(index, "customValue", e.target.value)}
                      style={{ flex: "2 1 0" }}
                    />
                  </div>
                ))}
                <Row><Button className="btn ml-4 mt-2 mb-2" variant="outline-primary" onClick={handleAddField}>
                  <i className="fa fa-plus mr-2"></i>Add Custom Field
                </Button></Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />

        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantCustomField;
