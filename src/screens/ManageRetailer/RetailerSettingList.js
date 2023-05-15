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
import { Form } from "react-bootstrap";

function RetailerSettingList(props) {
  const [retailerSetting, setRetailerSetting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(5);
  const [status, setStatus] = useState("active");

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
            HeaderText="Retailer Setting List"
            Breadcrumb={[
              { name: "Retailer", navigate: "#" },
              { name: "Retailer Setting List", navigate: "#" },
            ]}
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
                  <Link className="link-btn" to={`/setting-retailer`}>
                    Add Setting
                  </Link>
                </div>

                <div className="data-table">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="table w-100 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th> Name</th>

                        <th>Last Update(UTC)</th>
                       
                       
                            <th>Action</th>
                       
                       
                      </tr>
                    </thead>
                    <tbody>
                      {retailerSetting.map((market_place) => (
                        <tr key={market_place.id}>
                          <td>
                            {market_place.logo ? (
                              <img
                                src={market_place.logo}
                                className="list-logo"
                              />
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>
                          <td>{market_place.name}</td>

                          <td>{market_place.prefixName}</td>
                          <td>
                            {market_place.updatedAt
                              ? moment(market_place.updated_on).format(
                                  "MM/DD/YYYY hh:mm a"
                                )
                              : "N/A"}
                          </td>

                          <>
                            <td className="action-group">
                              <i
                                data-placement="top"
                                title="Edit"
                                className="fa fa-edit edit"
                              ></i>
                            </td>
                          </>
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

export default RetailerSettingList;
