import React, { useState } from "react";
import { Spinner, Accordion, Card } from "react-bootstrap";
import Select from "react-select";

function PriceCalculation(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Next"
                )}
              </button>

              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                disabled={isLoadingExit}
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>
              <button className="btn btn-secondary w-auto btn-lg" type="button">
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Accordion defaultActiveKey="0" className="accordian__main">
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    eventKey="0"
                    as="button"
                    className="btn btn-link collapsed text-decoration-none"
                    style={{ border: "1px solid #49c5b6" }}>
                    Supplier Name
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="row mt-3 p-md-1">
                      <div className="col-sm-6 col-md-4 col-lg-3">
                        <div>
                          <label htmlFor="price">Select Price</label>
                          <Select id="price" placeholder="Select Price" />
                        </div>
                      </div>
                      <div className="col-sm-6 mt-3 mt-sm-0 col-md-4 col-lg-3">
                        <div className="form-group">
                          <label htmlFor="value1">Multiple</label>
                          <input
                            id="value1"
                            className="form-control"
                            placeholder="Enter Value"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 col-lg-2">
                        <div className="form-group">
                          <label htmlFor="value2">Fixed</label>
                          <input
                            id="value2"
                            className="form-control"
                            placeholder="Enter Value"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 col-lg-2">
                        <div className="form-group">
                          <label htmlFor="value3">Tax</label>
                          <input
                            id="value3"
                            className="form-control"
                            placeholder="Enter Value"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 col-lg-2">
                        <div className="form-group">
                          <label htmlFor="value4">Discount</label>
                          <input
                            id="value4"
                            className="form-control"
                            placeholder="Enter Value"
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </form>
    </>
  );
}

export default PriceCalculation;
