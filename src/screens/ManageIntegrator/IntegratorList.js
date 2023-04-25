import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Select from "react-select";

function IntegratorList(props) {
  const [integratorPlaceList, setIntegratorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(5);

  useEffect(() => {
    props.onLoading(true);
    
    getDataFromApi();
  }, [currentPage, dataLimit]);

  const getDataFromApi = (search = "active") => {
    props.onLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_COMPANY_SERVICE}/get-company-list?page=${currentPage}&limit=${dataLimit}&searchText=${search}`
      )
      .then((res) => {
        let totlePage = Math.ceil(res.data.totlaRecord / res.data.limit);
        setTotalPages(totlePage);

        props.onLoading(false);
      })
      .catch((e) => {
        props.onLoading(false);
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
            HeaderText="Integrator List"
            Breadcrumb={[
              { name: "Manage", navigate: "" },
              { name: "Integrator List", navigate: "" },
            ]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div style={{ minWidth: "110px" }}>
                    <Select options={filterList} defaultValue={filterList[0]} />
                  </div>
                  <Link className="link-btn" to={`/manage-integrator`}>
                    Add Integrator
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
                        <th>Integrator Name</th>
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
                    {/* <tbody>
                    {supplierList.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.suplirName}</td>

                        <td>
                          {supplier.supplireLogo ? (
                            supplier.supplireLogo
                          ) : (
                            <div className="list-logo placeholder">N/A</div>
                          )}
                        </td>
                        <td>{supplier.prefixName}</td>
                        <td>{supplier.lastUpdate}</td>
                        {props.user.permissions.update_company ? (
                          <>
                            <td>
                              {supplier.status == 1 ? "Active" : "Inactive"}
                            </td>

                            <td className="action-group">
                              <i
                                data-placement="top"
                                title="Edit"
                                className="fa fa-edit edit"
                                onClick={() => {

                                  history.push(
                                    `/manage-marketPlace`
                                  );
                                }}
                              ></i>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                              </tbody>*/}
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
export default connect(mapStateToProps, { onLoading })(IntegratorList);
