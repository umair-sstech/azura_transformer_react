import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import "./Integrator.css";
import axios from "axios";
import { FormContext } from "./ManageIntegrator";
import { API_PATH } from "../ApiPath/Apipath";

function IntegratorPage2(props) {
  const {
   
    processCancel,
  } = useContext(FormContext);
  const [categoryFields, setCategoryFields] = useState(null);
  

  const getCategoryData = () => {
    try {
      axios
        .get(`${API_PATH.GET_CATEGORY_MAPPING}`)
        .then((response) =>
          setCategoryFields(response.data.data.master_Category)
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                Save & Next
              </button>
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                Save & Exit
              </button>

              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel} >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4 ml-3">
          {!categoryFields ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          {categoryFields && (
            <Accordion defaultActiveKey="0">
              {Object.keys(categoryFields).map((category, index) => (
                <Card key={index}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      eventKey={index.toString()}
                      className="accordion"
                    >
                      <i className="fa fa-angle-down arrow"></i>
                      <span className="categoryname">{category}</span>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body>
                      {categoryFields[category].length ? (
                        <table className="table table-bordered w-25 mt-0">
                          <thead>
                            <tr>
                              <th className="p-1">Category </th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryFields[category].map((field, index) =>
                              field.category_3 ? (
                                <tr key={index}>
                                  <td className="p-1 font-weight-normal">
                                    {field.category_3}
                                  </td>
                                </tr>
                              ) : null
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <p>No records found.</p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          )}
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(IntegratorPage2);
