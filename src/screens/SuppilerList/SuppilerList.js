import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import "../SuppilerList/SuppilerList.css";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { API_PATH } from "../ApiPath/Apipath";

function SuppilerList(props) {
  const [supplierList, setSupplierList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("Supplier");
  const [autoId, setAutoId] = useState(1);

  const history = useHistory();

  const getSupplierInfo = async () => {
    props.onLoading(true);
    try {
      const response = await axios.post(`${API_PATH.GET_LIST}`, {
        page: currentPage,
        limit: dataLimit,
        type,
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let filterList = [
    { label: "Activate", value: "active" },
    { label: "Deactivate", value: "deactive" },
    { label: "All", value: "all" },
  ];

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
            HeaderText="Supplier List"
            Breadcrumb={[
              { name: "Integration", navigate: "/integration" },
              { name: "Supplier List", navigate: "#" },
            ]}
            style={{ position: "sticky", top: 0, zIndex: 999 }}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div style={{ minWidth: "110px" }}>
                    <Select
                      options={filterList}
                      onChange={(data) => {
                        setStatus(data.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={filterList[0]}
                    />
                  </div>
                  <Link className="link-btn" to={`/manage-supplier`}>
                    Add Supplier
                  </Link>
                </div>

                <div className="data-table">
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
                        <th>Supplier Name</th>

                        <th>Prefix Name</th>
                        <th>Last Update(UTC)</th>

                        <>
                          <th>Status</th>
                          <th>Action</th>
                        </>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierList?.length > 0 && supplierList?.map((supplier) => (
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
                            {supplier.updated
                              ? moment(supplier.updated_on).format(
                                  "MM/DD/YYYY hh:mm a"
                                )
                              : moment(supplier.created_on).format(
                                  "MM/DD/YYYY hh:mm a"
                                )}
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
                                onClick={() => {
                                  localStorage.setItem(
                                    "supplierId",
                                    supplier.id
                                  );
                                  localStorage.setItem(
                                    "supplierName",
                                    supplier.name
                                  );

                                  history.push(`/manage-supplier`);
                                }}
                              ></i>
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {
                    supplierList?.length === 0 && (
                      <h4 className="no-data" style={{color: props.loading ? 'white' : '#8b8a8a'}}>No Data Found</h4>
                    )
                  }
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
    </div>
  );
}
const mapStateToProps = ({ LoadingReducer, loginReducer }) => ({
  loading: LoadingReducer.isLoading,
  user: loginReducer.user,
});
export default connect(mapStateToProps, { onLoading })(SuppilerList);
