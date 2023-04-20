import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import MultiStepProgressBar from "./MultiStepProgressBar";
import MarketPlacePage1 from "./MarketPlacePage1";
import MarketPlacePage2 from "./MarketPlacePage2";
import MarketPlacePage3 from "./MarketPlacePage3";
import MarketPlacePage4 from "./MarketPlacePage4";
import MarketPlacePage5 from "./MarketPlacePage5";
import MarketPlacePage6 from "./MarketPlacePage6";
import  "./MarketPlace.css"


export const FormContext = createContext();

function ManageMarketPlace(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isMarketPlaceAdded, setIsMarketPlaceAdded] = useState("");

  const [page, setPage] = useState("1");

  useEffect(
    () => () => {
      setFormData();
      setLogoData();
      setIsMarketPlaceAdded("");
      localStorage.removeItem("newlyAddedSuppiler");
    },
    []
  );
 
  const processCancel = () => {
    setFormData();
    setLogoData();
    setIsMarketPlaceAdded("");
    localStorage.removeItem("newlyAddedSuppiler");
    history.push("/suppiler");
  };

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("1");
        break;
      case "2":
        setPage("2");
        break;
      case "3":
        setPage("3");
        break;
      case "4":
        setPage("4");
        break;
      case "5":
        setPage("5");
        break;
      case "6":
        setPage("6");
        break;
      default:
        setPage("1");
    }
  };
  const handleButtonClick = () => {
    if (isMarketPlaceAdded) {
      setActiveStepIndex(1);
    } else {
      setIsMarketPlaceAdded(true);
      setActiveStepIndex(0);
    }
  };

  const history = useHistory();
  return (
    <>
      <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText={isMarketPlaceAdded ? "Market Place Update" : "Market Place Add"}
              Breadcrumb={[
                { name: "Manage", navigate: "" },
                { name: "Market Place List", navigate: "" },
                {
                  name: isMarketPlaceAdded ? "Market Place Update" : "MArket Place Add",
                  navigate: "",
                },
              ]}
              className="page-header"
            />
            <div className="tab-component">
              <div className="card">
                <div className="body">
                  {props.updateFormLoading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <FormContext.Provider
                    value={{
                      setIsMarketPlaceAdded,
                      isMarketPlaceAdded,
                      activeStepIndex,
                      setActiveStepIndex,
                      formData,
                      setFormData,
                      setLogoData,
                      logoData,
                      processCancel,
                    }}
                  >
                
                    <MultiStepProgressBar
                      setPage={setPage}
                      page={page}
                      onPageNumberClick={nextPageNumber}
                    />
                    {
                      {
                        1: (
                          <MarketPlacePage1
                            onButtonClick={handleButtonClick}
                            setPage={setPage}
                          />
                        ),
                        2: (
                          <MarketPlacePage2
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        3: (
                          <MarketPlacePage3
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        4: (
                          <MarketPlacePage4
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        5: (
                          <MarketPlacePage5
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        6: (
                          <MarketPlacePage6
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                       
                      }[page]
                    }
                  </FormContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  updateFormLoading: LoadingReducer.updateFormLoading,
});
export default connect(mapStateToProps, { onUpdateFormLoading })(
  ManageMarketPlace
);