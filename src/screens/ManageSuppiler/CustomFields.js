import React, { useEffect, useState } from 'react'
import {  Accordion, Card, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function CustomFields(props) {
    const { customFieldsData, setCustomFieldsData } = props;

  const addCustomField = () => {
    setCustomFieldsData([...customFieldsData, { customFieldName: "", customValue: "" }]);
  }

  const removeCustomField = () => {
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
            toast.success("delete data successfully");
            
          }
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...customFieldsData];
    updatedFields[index][field] = value;
    setCustomFieldsData(updatedFields);
  };
  

  return (
    <>
    <div className="accordion-class">
    <Row>
      <Col>
        <Accordion
          defaultActiveKey="7"
          className="accordian__main"
        >
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as="button"
                className="btn btn-link collapsed border border-primary text-decoration-none"
                eventKey="0"
              >
                <i className="fa fa-angle-down arrow"></i>

                <span> Custom Fields</span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  <p>
                    <span>Custom Field Name</span>
                  </p>
                  <p>
                    <span>Custom Field Value</span>
                  </p>
                </div>
                <hr />
                {customFieldsData &&
                  customFieldsData.map((field, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-around align-items-center"
                    >
                      <i
                        className="fa fa-solid fa-trash fa-lg ml-2 pe-auto"
                        style={{ color: "red" }}
                        onClick={() => removeCustomField()}
                      ></i>
                      <input
                        type="text"
                        placeholder="Enter Custom Field"
                        name="customFieldName"
                        className="form-control ml-3"
                        style={{ flex: "1 1 0" }}
                        value={
                          field.customFieldName?field.customFieldName:""
                            
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "customFieldName",
                            e.target.value
                          )
                        }
                      />
                      <span className="ml-3"> = </span>
                      <input
                        type="text"
                        placeholder="Enter Custom Value"
                        name="customValue"
                        className="form-control ml-3"
                        style={{ flex: "2 1 0" }}
                        value={
                          field.customValue?field.customValue:"" 
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "customValue",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                <Row></Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Button
            className="btn ml-3 mt-2 mb-2"
            variant="outline-primary"
            onClick={addCustomField}
          >
            <i className="fa fa-plus mr-2"></i>Add Custom Field
          </Button>
        </Accordion>
      </Col>
    </Row>
  </div>
    </>  )
}

export default CustomFields
