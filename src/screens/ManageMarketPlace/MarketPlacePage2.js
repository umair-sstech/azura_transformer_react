import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import "./MarketPlace.css";
import axios from "axios";
import Select from "react-dropdown-select";

function MarketPlacePage2(props) {
  const { setPage } = props;
  const [categoryFields, setCategoryFields] = useState(null);
  const [mysaleCategory, setMysaleCategory] = useState([]);
  const [categoryMapping, setCategoryMapping] = useState({})
  console.log("mapping",categoryMapping)

  const getCategoryData = () => {
    try {
      axios
        .get("http://localhost:8001/integration/getCategoryFields")
        .then((response) => {
          setCategoryFields(response.data.data.master_Category);
          setMysaleCategory(response.data.data.mysale_Category);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCategoryData();
  }, []);

  const handleCategoryMapping = (category, mysaleCategory) => {
    setCategoryMapping((prev) => ({
      ...prev,
      [category]: mysaleCategory,
    }));
  };
  const handleSubmit = () => {
    const mappingArray = Object.entries(categoryMapping).map(
      ([category, mysaleCategory]) => ({
        integrationId: 2,
        integrationName: "Mysale",
        azuraMainCategoryName: category,
        azuraCategoryId: categoryFields[category][0].category_1_id,
        mysaleCategoryId: mysaleCategory,
      })
    );
  
    axios
      .post(
        "http://localhost:8001/integration/createOrUpdateAzuraMysaleCategoryMapping",
        mappingArray
      )
      .then((response) => {
        console.log("response",response)
      })
      .catch((error) => {
        // handle error
      });
  }; 

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            <div class="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          {categoryFields &&
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
                        <table className="table table-bordered w-50 mt-0">
                          <thead>
                            <tr>
                              <th >Category </th>
                              <th >Category Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryFields[category].map((field, index) =>
                              field.category_3 ? (
                                <tr key={index}>
                                  <td className="p-1 font-weight-normal">
                                    {field.category_3}
                                  </td>
                                  <td>
                                    <Select
                                    className="p-1 font-weight-normal"
                                      options={mysaleCategory.map((item) => ({
                                        label: item.path,
                                        value: item.path,
                                      }))}
                                      onChange={(selected) => handleCategoryMapping(category, selected.value)}
                                    />
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
          }
        </div>
      </form>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(MarketPlacePage2);
