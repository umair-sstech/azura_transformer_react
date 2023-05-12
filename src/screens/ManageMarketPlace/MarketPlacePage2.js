import React, { useState, useEffect } from "react";
import { Accordion, Card, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import "./MarketPlace.css";
import axios from "axios";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function MarketPlacePage2(props) {
  const { setPage } = props;
  const [categoryFields, setCategoryFields] = useState(null);
  const [mysaleCategory, setMysaleCategory] = useState([]);
  const [selectedMapping, setSelectedMapping] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [formError, setFormError] = useState(false);


  const history = useHistory();

  const createOptions = (obj) =>
    Object.entries(obj).map(([key, value]) => ({
      value,
      label: key,
    }));

  const getCategoryData = () => {
    try {
      axios
        .get("http://localhost:8001/integration/getCategoryFields")
        .then((response) => {
          const categories = Object.keys(
            response.data.data.master_Category
          ).map((category) => ({
            category,
            categoryData: Object.entries(
              response.data.data.master_Category[category]
            ).map(([key, value]) => ({
              value,
              label: key,
            })),
          }));
          setCategoryFields(categories);
          setMysaleCategory(createOptions(response.data.data.mysale_Category));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleMappingSelect = (category, selectedOption, categoryData) => {
    const selectedCategoryId = selectedOption.value;
    const categoryFieldId = categoryData?.value;
    setSelectedMapping((prevSelected) => [
      ...prevSelected,
      {
        azuraMainCategoryName: category,
        azuraCategoryId: categoryFieldId,
        mysaleCategoryId: selectedCategoryId,
      },
    ]);
    setFormError(true);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setIsLoading(true);
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");

    if (!formError) {
      setFormError("Please Select at least one mapping")
      return;
    }

    const mappingData = selectedMapping.map((mapping) => ({
      integrationId: integrationId,
      integrationName: integrationName,
      azuraMainCategoryName: mapping.azuraMainCategoryName,
      azuraCategoryId: mapping.azuraCategoryId,
      mysaleCategoryId: mapping.mysaleCategoryId,
    }));

    axios
      .post(
        "http://localhost:8001/integration/createOrUpdateAzuraMysaleCategoryMapping",
        mappingData
      )
      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage(3);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");
    const mappings = selectedMapping.map((mapping) => ({
      integrationId,
      integrationName,
      azuraMainCategoryName: mapping.azuraMainCategoryName,
      azuraCategoryId: mapping.azuraCategoryId,
      mysaleCategoryId: mapping.mysaleCategoryId,
    }));
    setIsLoadingExit(true);
    axios
      .post(
        "http://localhost:8001/integration/createOrUpdateAzuraMysaleCategoryMapping",
        mappings
      )

      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          history.push("/market-place");
          localStorage.removeItem("marketPlaceId");
          localStorage.removeItem("marketPlaceName");
        } else {
          toast.error(message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingExit(false));
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
                onClick={handleOnClick}
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
        <div className="row mt-4 ml-3">
        {formError && <p style={{ color: "red" }}>{formError}</p>}
       
          {!categoryFields ? (
            <div className="loader-wrapper w-100" style={{ marginTop: "14%" }}>
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          ) : (
            ""
          )}
          {categoryFields && (
            <Accordion defaultActiveKey="0">
              {categoryFields.map((categoryObj, index) => (
                <Card key={index}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      eventKey={index.toString()}
                      className="accordion"
                    >
                      <i className="fa fa-angle-down arrow"></i>
                     
                      <span className="categoryname">
                        {categoryObj.category}
                      </span>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body>
                      {categoryObj.categoryData.length ? (
                        <table className="table table-bordered w-75 mt-0">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Category Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryObj.categoryData.map((field, index) => (
                              <tr key={index}>
                                <td className="p-1 font-weight-normal">
                                  {field.label}
                                </td>
                                <td>
                                  <Select
                                    options={mysaleCategory}
                                    onChange={(selectedOption) =>
                                      handleMappingSelect(
                                        categoryObj.category,
                                        selectedOption[0],
                                        field
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
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
export default connect(mapStateToProps, { onLoading })(MarketPlacePage2);
