import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import "./SuppilerList.css";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import Select from "react-select";
import apiRequest from "../ApiPath";
import { API_PATH } from "../ApiPath/Apipath";

function SuppilerList(props) {
  const [supplierList, setSupplierList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(5);

  const history = useHistory();

  useEffect(() => {
    props.onLoading(true);
    getSupplierInfo(currentPage, dataLimit)
      .then((response) => {
        setSupplierList(response.data);
        setTotalPages(Math.ceil(response.totalCount / dataLimit));
      })
      .finally(() => {
        props.onLoading(false);
      });
  }, [currentPage, dataLimit]);



  const getSupplierInfo = (currentPage, dataLimit) => {
    try {
      return axios.get(
          `${API_PATH.GET_SUPPLIER_LIST}?page=${currentPage}&limit=${dataLimit}`
        )
        .then((response) => response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const activateDeactivate = (event, id) => {
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
          .post(
            `${process.env.REACT_APP_API_URL}/company/company-status/${id}`,
            { status }
          )
          .then((res) => {
            toast.success(res.data.message);
            
            props.onLoading(false);
          })
          .catch((e) => {
            toast.error("Something Went Wrong");
            
            props.onLoading(false);
          });
      }
    });
  };
  let filterList = [
    { label: "All", value: "all" },
    { label: "Activate", value: "active" },
    { label: "Deactivate", value: "deactivate" },
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
            HeaderText="Suppiler List"
            Breadcrumb={[
              { name: "Manage", navigate: "" },
              { name: "Suppiler List", navigate: "" },
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
                      
                      defaultValue={filterList[0]}
                    />
                  </div>
                  <Link className="link-btn" to={`/manage-suppiler`}>
                    Add Supplier
                  </Link>
                </div>

                <div className="data-table">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Supplier Name</th>
                        <th>Logo</th>
                        <th>Prefix Name</th>
                        <th>Last Update</th>
                        {props.user.permissions.update_company ? (
                          <>
                            <th>Activate / Deactivate</th>
                            <th>Action</th>
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {supplierList.map((supplier) => (
                        <tr key={supplier.id}>
                          <td>{supplier.name}</td>

                          <td>
                            {supplier.logo ? (
                              supplier.logo
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>
                          <td>{supplier.prefixName}</td>
                          <td>{supplier.lastUpdate}</td>
                          {props.user.permissions.update_company ? (
                            <>
                            <td><Form.Check
                            type="switch"
                            id={`${supplier.id}`}
                            checked={supplier.status}
                            onChange={(e) => activateDeactivate(e, supplier.id)}

                        /></td>

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
                                      supplier.suplirName
                                    );

                                    history.push(
                                      `/manage-suppiler`
                                    );
                                  }}
                                ></i>
                              </td>
                            </>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination-wrapper">
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onPageChange={setCurrentPage}
                    />
                    <select
                      name="companyOwner"
                      className="form-control"
                      onChange={(e) => {
                        setCurrentPage(1);
                        setdataLimit(e.target.value);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
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
