import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import "./MarketPlace.css";
import axios from "axios";

function MarketPlacePage2(props) {
  const {setPage}=props
  const [categoryFields, setCategoryFields] = useState(null);

  const getCategoryData = () => {
    try {
      axios
        .get("http://localhost:8001/integration/getCategoryFields")
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

              <button className="btn btn-secondary w-auto btn-lg" type="button">
                Exit
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-4 ml-3">
        {!categoryFields ? (
          <div class="loader-wrapper w-100" style={{marginTop:"14%"}} >
            <i class="fa fa-refresh fa-spin"></i>
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
                    variant="link"
                    eventKey={index.toString()}
                    className="accordion"
                  >
                    <i class="fa fa-angle-down"></i>
                    <span class="categoryname">{category}</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>
                    <ul>
                      {categoryFields[category].map((field, index) => (
                        <li key={index}>{field.category_2}</li>
                      
                      ))}
                    </ul>
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
export default connect(mapStateToProps, { onLoading })(MarketPlacePage2);
