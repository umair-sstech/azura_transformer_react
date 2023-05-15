import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import MultiStepProgressBar from "../MultiStepProgressBar/MultiStepProgressBar";
import SupplierInfo from "./SuppilerInfo";
import SuppilerPage2 from "./SuppilerPage2";
import SuppilerPage3 from "./SuppilerPage3";
import SuppilerPage4 from "./SuppilerPage4";
import SuppilerPage5 from "./SuppilerPage5";
import SupplierPage6 from "./SupplierPage6";
import SupplierPage7 from "./SupplierPage7";
import "./SupplierPage.css";
import Swal from "sweetalert2";

export const FormContext = createContext();

function ManageSuppiler(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isSuppilerAdded, setIsSuppilerAdded] = useState("");

  const [page, setPage] = useState(1);

  const history = useHistory();

  useEffect(
    () => () => {
      setFormData();
      setLogoData();
      setIsSuppilerAdded("");
      localStorage.removeItem("newlyAddedSuppiler");
    },
    []
  );

  const processCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData();
        setLogoData();
        setIsSuppilerAdded("");
        history.push("/supplier");
        localStorage.removeItem("supplierId");
        localStorage.removeItem("supplierName");
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
      case "6":
        setPage("6");
        break;
      case "7":
        setPage("7");
        break;
      default:
        setPage("1");
    }
  };
  const handleButtonClick = () => {
    if (isSuppilerAdded) {
      setActiveStepIndex(1);
    } else {
      setIsSuppilerAdded(true);
      setActiveStepIndex(0);
    }
  };

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
              HeaderText={isSuppilerAdded ? "Suppiler Update" : "Suppiler Add"}
              Breadcrumb={[
                { name: "Integration", navigate: "#" },
                { name: "Suppiler List", navigate: "/supplier" },
                {
                  name: isSuppilerAdded ? "Suppiler Update" : "Suppiler Add",
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
                      setIsSuppilerAdded,
                      isSuppilerAdded,
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
                          <SupplierInfo
                            onButtonClick={handleButtonClick}
                            setPage={setPage}
                          />
                        ),
                        2: (
                          <SuppilerPage2
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        3: (
                          <SuppilerPage3
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        4: (
                          <SuppilerPage4
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        5: (
                         <SuppilerPage5
                          onButtonClick={nextPage}
                          setPage={setPage}
                          />
                        ),
                        6: (
                          <SupplierPage6
                            onButtonClick={nextPage}
                            setPage={setPage}
                          />
                        ),
                        7: (
                          <SupplierPage7
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
  ManageSuppiler
);
