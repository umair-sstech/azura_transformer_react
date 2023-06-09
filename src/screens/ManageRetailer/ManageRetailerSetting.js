import React, { createContext, useEffect, useState } from "react";
import moment from "moment";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import MultiStepProgressBar from "../ManageRetailer/MultiStepProgressBar";
import RetailerPage1 from "./RetailerPage1";
import RetailerExportImage from "./RetailerExportImage";
import ProductExport from "./ProductExport";
import CurrencyConversion from "./CurrencyConversion";
import PriceCalculation from "./PriceCalculation";
import ExportChannel from "./ExportChannel";
import Accountconfiguration from "./Accountconfiguration"
import Swal from "sweetalert2";

export const FormContext = createContext();

function ManageRetailerSetting(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isRetailerAdded, setIsRetailerAdded] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [page, setPage] = useState("1");
  const history = useHistory();

  useEffect(() => {
    const id = localStorage.getItem("newlyAddedRetailer");
    if (id) {
      props.onUpdateFormLoading(true);
      setIsRetailerAdded(id);
      axios
        .get(`${process.env.REACT_APP_RETAILER_SERVICE}/retailer-by-Id/${id}`)
        .then((res) => {
          const data = res.data.retailerData;
          setFormData(data);
          props.onUpdateFormLoading(false);
          setCreatedDate(data.created_on);
        })
        .catch((e) => {
          toast.error(e.response.data.message || "Something went wrong");
          setFormData();
          setIsRetailerAdded("");
          localStorage.removeItem("newlyAddedRetailer");
          props.onUpdateFormLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    // Add the event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
        history.push("/setting-retailer-list");
        localStorage.removeItem("supplierSettingId");
            localStorage.removeItem("selectedSupplierName");
            localStorage.removeItem("retailerIntegrationId");
            localStorage.removeItem("marketPlaceSettingId");
            localStorage.removeItem("marketPlaceSettingName");
            localStorage.removeItem("currentPage");

       
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
    if (isRetailerAdded) {
      setActiveStepIndex(1);
    } else {
      setIsRetailerAdded(true);
      setActiveStepIndex(0);
    }
  };
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setPage(Number(storedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);
  return (
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
              isRetailerAdded ? "Integration Edit" : "Add Integration Setting"
            }
            Breadcrumb={[
              { name: "Integration Setting List", navigate: "/setting-retailer-list",items: ["retailerIntegrationId","supplierSettingId", "selectedSupplierName","marketPlaceSettingId","marketPlaceSettingName","currentPage"] },
              { name: "Integration Setting", navigate: "#" },
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
                {createdDate ? (
                  <div className="date-wrapper" style={{ textAlign: "right" }}>
                    <span>
                      Created on:{" "}
                      {moment(createdDate).format("MM/DD/YYYY hh:mm a")}
                    </span>
                  </div>
                ) : null}
                <FormContext.Provider
                  value={{
                    setIsRetailerAdded,
                    isRetailerAdded,
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
                        <RetailerPage1
                          onButtonClick={handleButtonClick}
                          setPage={setPage}
                        />
                      ),
                      2: (
                        <ProductExport
                        onButtonClick={nextPage}
                          setPage={setPage}
                        />
                      ),
                      3: (
                        <CurrencyConversion
                        onButtonClick={nextPage}
                          setPage={setPage}
                        />
                      ),
                      4: (
                        <RetailerExportImage
                        onButtonClick={nextPage}
                          setPage={setPage}
                        />
                      ),
                      5: (
                        <PriceCalculation
                        onButtonClick={nextPage}
                          setPage={setPage}
                        />
                      ),
                      6: (
                        <ExportChannel
                        onButtonClick={nextPage}
                          setPage={setPage}
                        />
                      ),
                      7: (
                        <Accountconfiguration
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
  );
}
const mapStateToProps = ({ LoadingReducer }) => ({
  updateFormLoading: LoadingReducer.updateFormLoading,
});
export default connect(mapStateToProps, { onUpdateFormLoading })(
  ManageRetailerSetting
);
