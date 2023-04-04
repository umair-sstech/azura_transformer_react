import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import MultiStepProgressBar from "../MultiStepProgressBar/MultiStepProgressBar";
import SupplierInfo from "./SuppilerInfo";
import SuppilerPage2 from "./SuppilerPage2";
import SuppilerPage3 from "./SuppilerPage3";
import SuppilerPage4 from "./SuppilerPage4";
import SuppilerPage5 from "./SuppilerPage5";


export const FormContext = createContext();

function ManageSuppiler(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isSuppilerAdded, setIsSuppilerAdded] = useState("");
  const [page, setPage] = useState("pageone");

  const history = useHistory();

  useEffect(() => {
    const id = localStorage.getItem("newlyAddedSuppiler");
    if (id) {
      props.onUpdateFormLoading(true);
      setIsSuppilerAdded(id);
      axios
        .get(`${process.env.REACT_APP_API_URL}/company/company-by-Id/${id}`)
        .then((res) => {
          const data = res.data.companyData;
          setFormData(data);
          props.onUpdateFormLoading(false);
        })
        .catch((e) => {
          toast.error(e.response.data.message || "Something went wrong");
          setFormData();
          setIsSuppilerAdded("");
          localStorage.removeItem("newlyAddedSuppiler");
          props.onUpdateFormLoading(false);
        });
    }
  }, []);

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
    setFormData();
    setLogoData();
    setIsSuppilerAdded("");
    localStorage.removeItem("newlyAddedSuppiler");
    history.push("/suppiler");
  };

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
        case "5":
          setPage("pagefive");
          break
        
      default:
        setPage("1");
    }
  };
  const handleButtonClick = () => {
    if (isSuppilerAdded) {
      setPage("pagetwo");
    } else {
      setIsSuppilerAdded(true);
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
              HeaderText={isSuppilerAdded ? "Suppiler Update" : "suppiler Add"}
              Breadcrumb={[
                { name: "Manage", navigate: "" },
                { name: "Suppiler List", navigate: "" },
                {
                  name: isSuppilerAdded ? "Suppiler Update" : "Suppiler Add",
                  navigate: "",
                },
              ]}
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
                      page={page}
                      onPageNumberClick={nextPageNumber}
                    />
                    {
                      {
                        pageone: <SupplierInfo onButtonClick={nextPage} />,
                        pagetwo: <SuppilerPage2 onButtonClick={nextPage} />,
                        pagethree: <SuppilerPage3 onButtonClick={nextPage} />,
                        pagefour: <SuppilerPage4 onButtonClick={nextPage} />,
                        pagefive: <SuppilerPage5 onButtonClick={nextPage}/>,
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
