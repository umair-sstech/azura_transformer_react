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

  const history = useHistory();

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

  const handleMappingSelect = (category, selectedOption) => {
    const { value } = selectedOption[0];
    setSelectedMapping((prevSelected) => [
      ...prevSelected,
      {
        azuraCategoryId: category.id,
        mysaleCategoryId: value,
        azuraMainCategoryName: category.category_1,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const integrationId = localStorage.getItem("marketPlaceId");
    const integrationName = localStorage.getItem("marketPlaceName");
    const mappings = selectedMapping.map((mapping) => ({
      integrationId,
      integrationName,
      azuraMainCategoryName: mapping.azuraMainCategoryName,
      azuraCategoryId: mapping.azuraCategoryId,
      mysaleCategoryId: mapping.mysaleCategoryId,
    }));

    axios
      .post(
        "http://localhost:8001/integration/createOrUpdateAzuraMysaleCategoryMapping",
        mappings
      )

      .then((response) => {
        const { success, message, data } = response.data;
        if (success) {
          toast.success(message);
          setPage(3);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
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
        <div class="row mt-4 ml-3">
          {!categoryFields ? (
            <div class="loader-wrapper w-100" style={{ marginTop: "14%" }}>
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
                        <table className="table table-bordered w-75 mt-0">
                          <thead>
                            <tr>
                              <th>Category </th>
                              <th>Category Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryFields[category].map((field, index) =>
                              field.category_tree ? (
                                <tr key={index}>
                                  <td className="p-1 font-weight-normal">
                                    {field.category_tree}
                                  </td>
                                  <td>
                                    <Select
                                      className="p-1 font-weight-normal"
                                      options={mysaleCategory.map((item) => ({
                                        label: item.path,
                                        value: item.id,
                                      }))}
                                      onChange={(selectedOption) =>
                                        handleMappingSelect(
                                          field,
                                          selectedOption
                                        )
                                      }
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
