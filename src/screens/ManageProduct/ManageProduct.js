import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import "./Products.css";
import { Tab, Tabs } from "react-bootstrap";
import Parent from "./parent/Parent";
import Variant from "./variants/Variant";

export const FormContext = createContext();

const ManageProduct = (props) => {
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isCompanyAdded, setIsCompanyAdded] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [key, setKey] = useState('parent');

  const history = useHistory();

  useEffect(() => {
    const id = localStorage.getItem("newlyAddedCompany");
    if (id) {
      props.onUpdateFormLoading(true);
      setIsCompanyAdded(id);
      axios
        .get(`${process.env.REACT_APP_COMPANY_SERVICE}/company-by-Id/${id}`)
        .then((res) => {
          const data = res.data.companyData;
          setFormData(data);
          props.onUpdateFormLoading(false);
          console.log(data.created_on);
          setCreatedDate(data.created_on);
        })
        .catch((e) => {
          toast.error(e.response.data.message || "Something went wrong");
          setFormData();
          setIsCompanyAdded("");
          localStorage.removeItem("newlyAddedCompany");
          props.onUpdateFormLoading(false);
        });
    }
  }, []);

  useEffect(
    () => () => {
      setFormData();
      setLogoData();
      setIsCompanyAdded("");
      localStorage.removeItem("newlyAddedCompany");
    },
    []
  );

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
              HeaderText={"Product Details"}
              Breadcrumb={[
                { name: "Products", navigate: "#" },
                { name: "Products List", navigate: "/products" },
                { name: "Product Details", navigate: "#" },
              ]}
            />

            <div className="tab-component">
              <div className="card">
                <div className="">
                  {props.updateFormLoading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="parent" title="PARENT">
                      <Parent activeKey={key} />
                    </Tab>
                    <Tab eventKey="variants" title="VARIANTS">
                      <Variant activeKey={key} />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ LoadingReducer }) => ({
  updateFormLoading: LoadingReducer.updateFormLoading,
});
export default connect(mapStateToProps, { onUpdateFormLoading })(ManageProduct);
