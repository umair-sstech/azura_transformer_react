import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Accordion, Card, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function CustomFields(props) {
  const { customFieldsData, setCustomFieldsData } = props;

  const addCustomField = () => {
    setCustomFieldsData([...customFieldsData, { customFieldName: "", customValue: "" }]);
  }

  const deleteCustomField = (customFieldId) => {
    const supplierId=localStorage.getItem("supplierId")
    const requestBody = {
      supplierId: supplierId,
      customFieldId: customFieldId
    };
    axios
      .post("http://localhost:8001/Integration/deleteCustomField", requestBody)
      .then(response => {
        const {success,message,data}=response.data
        if(success){

          toast.success(message);
        }else{
          toast.error(message)
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to delete data");
      });
  };

  const removeCustomField = (customFieldId) => {
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
          deleteCustomField(customFieldId);
          setCustomFieldsData(customFieldsData.filter(field => field.id !== customFieldId));
            
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
        defaultActiveKey="0" className="accordian__main"
        >
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as="button"
                className="btn btn-link collapsed border border-success text-decoration-none"
                eventKey="0"
              >
                <i className="fa fa-angle-down arrow"></i>

                <label className='text-success'> Custom Fields</label>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" className="card-body">
              <Card.Body>
                <div className="d-flex justify-content-around">
                  
                    <label className='text-dark'>Custom Field Name</label> 
                    <label  className='text-dark'>Custom Field Value</label>
                  
                </div>
                <hr />
                {customFieldsData &&
                  customFieldsData.map((field, index) => (
                    
                    <div
                      key={index}
                      className="d-flex justify-content-around align-items-center mt-3"
                    >
                      <i
                        className="fa fa-solid fa-trash fa-lg ml-2 pe-auto"
                         role="button"
                        aria-hidden="true"
                        style={{ color: "red",cursor: "pointer" }}
                        onClick={() => removeCustomField(field.id
                          )}
                      
                      ></i>
                      {console.log("object",field)}
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
            variant="outline-success"
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
