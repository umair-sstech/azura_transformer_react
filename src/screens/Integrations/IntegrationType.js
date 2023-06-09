import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../components/PageHeader";
import { Link, useHistory } from "react-router-dom";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import { Form, Pagination } from "react-bootstrap";
import "../Integrations/IntegrationType.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { API_PATH } from "../ApiPath/Apipath";
import { toast } from "react-toastify";

function IntegrationType(props) {
  const options = [
    { value: "Supplier", label: "Supplier" },
    { value: "market_place", label: "Market Place" },
    { value: "Shopping Cart", label: "Shopping Cart", isDisabled: true },
    { value: "Carrier", label: "Carrier", isDisabled: true },
    { value: "TMS", label: "TMS", isDisabled: true },
    { value: "WMS", label: "WMS", isDisabled: true },
    { value: "Integrator", label: "Integrator" },
  ];
  const [supplierList, setSupplierList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");

  const history = useHistory();

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value === "Supplier") {
      history.push("/supplier");
    }
    if (selectedOption.value === "market_place") {
      history.push("/market-place");
    }
    if (selectedOption.value === "Integrator") {
      history.push("/integrator");
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getSupplierInfo = async () => {
    props.onLoading(true);
    try {
      const response = await axios.post(`${API_PATH.GET_LIST}`, {
        page: currentPage,
        limit: dataLimit,
        status: status !== "all" ? (status === "active" ? 1 : 0) : null,
      });

      if (response.data.success) {
        setSupplierList(response.data.data);
        setTotalPages(Math.ceil(response.data.totalRecord / dataLimit));
      } else {
        setSupplierList([]);
      }
      props.onLoading(false);
    } catch (error) {
      console.log("error", error);
      props.onLoading(false);
    }
  };

  useEffect(() => {
    getSupplierInfo();
  }, [currentPage, dataLimit, status]);

  const getIntegrationTypes = (id) => {
    const type = supplierList.filter((data) => data.id === id);
    return type;
  };

  const redirectToIntegration = (id) => {
    const arr = getIntegrationTypes(id);
    const type = arr[0].type;
    if (type === "Supplier") {
      localStorage.setItem("supplierId", arr[0].id);
      localStorage.setItem("supplierName", arr[0].name);
      history.push("/manage-supplier");
    } else if (type === "Integrator") {
      localStorage.setItem("integratorId", arr[0].id);
      localStorage.setItem("integratorName", arr[0].name);
      history.push("/manage-integrator");
    } else {
      localStorage.setItem("marketPlaceId", arr[0].id);
      localStorage.setItem("marketPlaceName", arr[0].name);
      history.push("/manage-marketPlace");
    }
  };

  const activateDeactivate = (event, supplierId) => {
    const status = event.target.checked;
    Swal.fire({
      title: `${status ? "Activate" : "Deactivate"} Supplier?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status ? "Activate" : "Deactivate"} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.onLoading(true);
        axios
          .post(`${API_PATH.CHANGE_SUPPLIER_STATUS}`, {
            supplierId: supplierId,
            status: status,
          })
          .then((res) => {
            toast.success(res.data.message);

            // const index = supplierList.findIndex(
            //   (supplier) => supplier.id === supplierId
            // );

            // setSupplierList((prevState) => [
            //   ...prevState.slice(0, index),
            //   {
            //     ...prevState[index],
            //     status: status,
            //   },
            //   ...prevState.slice(index + 1),
            // ]);
            getSupplierInfo();
            setTimeout(() => {
              props.onLoading(false);
            }, 2000);
          })
          .catch((e) => {
            toast.error("Something Went Wrong");

            props.onLoading(false);
          });
      }
    });
  };

  let filterList = [
    { label: "Activate", value: "active" },
    { label: "Deactivate", value: "deactive" },
    { label: "All", value: "all" },
  ];
  return (
    <>
      <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div className="container-fluid">
          <PageHeader
            HeaderText={"Integration List"}
            Breadcrumb={[{ name: "Integrations List", navigate: "#" }]}
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

                <div className="select__container">
                  <label htmlFor="combo-box-demo">Select Integration</label>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    isDisabled={false}
                    className="select-option customSelect"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 w-50">
                  <Select
                    options={filterList}
                    onChange={(data) => {
                      setStatus(data.value);
                      setCurrentPage(1);
                    }}
                    defaultValue={filterList[0]}
                  />
                </div>

                <div className="data-table mt-4">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="table w-100 table-responsive-lg">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Logo</th>
                        <th> Name</th>
                        <th>Prefix Name</th>
                        <th>Last Update(UTC)</th>
                        <>
                          <th>Status</th>
                          <th>Action</th>
                        </>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierList?.map((supplier) => (
                        <tr key={supplier.id} className="custom-border-table">
                          <td>{supplier.id}</td>
                          <td>
                            {supplier.logo ? (
                              <div className="image-container">
                                <img src={supplier.logo} alt={supplier.name} />
                              </div>
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>
                          <td>{supplier.name}</td>

                          <td>{supplier.prefixName}</td>
                          <td>
                            {supplier.updatedAt
                              ? moment(supplier.updated_on).format(
                                "MM/DD/YYYY hh:mm a"
                              )
                              : "N/A"}
                          </td>

                          <>
                            <td>
                              <Form.Check
                                type="switch"
                                id={`${supplier.id}`}
                                checked={supplier.status}
                                onChange={(e) =>
                                  activateDeactivate(e, supplier.id)
                                }
                              />
                            </td>
                            <td className="action-group">
                              <i
                                data-placement="top"
                                title="Edit"
                                className="fa fa-edit edit"
                                onClick={() =>
                                  redirectToIntegration(supplier.id)
                                }
                              ></i>
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {supplierList?.length === 0 && (
                    <h4
                      className="no-data"
                      style={{ color: props.loading ? "white" : "#8b8a8a" }}
                    >
                      No Data Found
                    </h4>
                  )}
                  {supplierList?.length > 0 && (
                    <div className="pagination-wrapper">
                    <ul className="pagination">
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            &laquo;
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            className={`page-item ${currentPage === index + 1 ? "active" : ""
                              }`}
                            key={index + 1}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            &raquo;
                          </button>
                        </li>
                            </ul>
                      <select
                        name="companyOwner"
                        className="form-control"
                        onChange={(e) => {
                          setCurrentPage(1);
                          setdataLimit(e.target.value);
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  )}
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
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(IntegrationType);
