import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import MultiStepProgressBar from "./MultiStepProgressBar";
import IntegratorInfo from "./IntegratorInfo";
import IntegratorPage2 from "./IntegratorPage2";
import IntegratorPage3 from "./IntegratorPage3";
import IntegratorPage4 from "./IntegratorPage4";
import IntegratorPage5 from "./IntegratorPage5";
import IntegratorPage6 from "./IntegratorPage6";
import Swal from "sweetalert2";

export const FormContext = createContext();

function ManageIntegrator(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isIntegrator, setIsIntegrator] = useState("");
  const [page, setPage] = useState("1");
  
  useEffect(
    () => () => {
      setFormData();
      setLogoData();
      setIsIntegrator("");
    },
    []
  );

  const processCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/integrator");
        localStorage.removeItem("integratorId");
        localStorage.removeItem("integratorName")
      }
    });
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
      default:
        setPage("1");
    }
  };
  const handleButtonClick = () => {
    if (isIntegrator) {
      setActiveStepIndex(1);
    } else {
      setIsIntegrator(true);
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
              HeaderText={
                isIntegrator ? "Integrator Update" : "Integrator Add"
              }
              Breadcrumb={[
                { name: "Integration", navigate: "#" },
                { name: "Integrator List", navigate: "/integrator" },
                {
                  name: isIntegrator
                    ? "Integrator Update"
                    : "Integrator Add",
                  navigate: "#",
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
                      setIsIntegrator,
                      isIntegrator,
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
                          <IntegratorInfo
                            onButtonClick={handleButtonClick}
                            setPage={setPage}
                          />
                        ),
                        // 2: (
                        //   <IntegratorPage2
                        //     onButtonClick={nextPage}
                        //     setPage={setPage}
                        //   />
                        // ),
                        2: (
                          <IntegratorPage3
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        3: (
                          <IntegratorPage4
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        4: (
                          <IntegratorPage5
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        5: (
                          <IntegratorPage6
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
  ManageIntegrator
);
