import React, { createContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onUpdateFormLoading } from "../../actions";
import moment from "moment";
import "./Products.css";
import { Accordion, Card, Col, Form, Image, Row } from "react-bootstrap";
import ProductAttributes from "./ProductAttributes";
import CustomFields from "./CustomFields";
import ProductOptions from "./ProductOptions";
import ProductImages from "./ProductImages";
import ProductDescription from "./ProductDescription";
import ProductIdentifiers from "./ProductIdentifiers";
import ProductTitle from "./ProductTitle";
import ProductParent from "./ProductParent";

export const FormContext = createContext();

const ManageProduct = (props) => {
  const { name } = props;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState();
  const [logoData, setLogoData] = useState();
  const [isCompanyAdded, setIsCompanyAdded] = useState("");
  const [createdDate, setCreatedDate] = useState("");

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

  const processCancel = () => {
    setFormData();
    setLogoData();
    setIsCompanyAdded("");
    localStorage.removeItem("newlyAddedCompany");
    history.push("/products");
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

                  <div className="product__container">
                    {/* Left Div */}
                    <div className="left">
                      <div className="product__header">
                        <h3>
                          PARENT SKU : <strong>GU7761-D_32F</strong>
                        </h3>
                        <div className="product__header2">
                          <h3>
                            <strong>1/1</strong>
                          </h3>
                          <p>Variants In Stock</p>
                        </div>
                      </div>

                      <ProductTitle />
                      <br />

                      {/* Identifiers                         */}
                      <ProductIdentifiers />
                      <br />

                      {/* Description                           */}
                      <ProductDescription />
                      <br />

                      {/* Image */}
                      <ProductImages />
                      <br />

                      {/* Options   */}
                      <ProductOptions />
                      <br />

                      {/* Attributes */}
                      <ProductAttributes />
                      <br />

                      {/* Custom Fields */}
                      <CustomFields />
                    </div>

                    {/* Right Div */}
                    <div className="right">
                        <ProductParent />
                    </div>
                  </div>
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
