import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";

function ApiLogs(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(5);
  const [searchText, setSearchText] = useState("active");
  const [autoId, setAutoId] = useState(1);
  const [apiLog, setApiLog] = useState([]);

  const startIndex = (currentPage - 1) * dataLimit + 1;

  useEffect(() => {
    getAPILogList(searchText);
  }, [currentPage, dataLimit]);

  useEffect(() => {
    getAPILogList(searchText);
  }, [searchText]);

  const getAPILogList = (search = "active") => {
    props.onLoading(true);
    axios
      .get(
        `${API_PATH.GET_API_LOG}?page=${currentPage}&limit=${dataLimit}&searchText=${search}`
      )
      .then((res) => {
        let totlePage = Math.ceil(res.data.totlaRecord / res.data.limit);
        setTotalPages(totlePage);
        setApiLog(res.data.apiLog);
        if (currentPage === 1) {
          setAutoId((currentPage - 1) * dataLimit + 1);
        }
        props.onLoading(false);
      })
      .catch((e) => {
        setApiLog([]);
        props.onLoading(false);
      });
  };

  let filterList = [
    { label: "Success", value: "success" },
    { label: "Failed", value: "failed" },
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
            HeaderText="Api Logs"
            Breadcrumb={[{ name: "Api Logs", navigate: "#" }]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="mb-3 top__header">
                  <div style={{ minWidth: "140px" }}>
                    <Select
                      options={filterList}
                      onChange={(data) => {
                        setCurrentPage(1);
                      }}
                      defaultValue={filterList[0]}
                    />
                  </div>
                </div>

                <div className="data-table">
                  {props.isLoading ? (
                    <div className="loader-wrapper">
                      {" "}
                      <i className="fa fa-refresh fa-spin"></i>
                      {" "}
                    </div>
                  ) : null}
                  {" "}
                  <table className="table w-100 table-responsive-md">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Method</th>

                        <th>URL</th>
                        <th>Status Code</th>
                        <th>Status</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiLog?.map((apiLog, idx) => (
                        <tr key={apiLog._id}>
                          <td>{startIndex + idx}</td>
                          <td>{apiLog.method}</td>
                          <td>{apiLog.url}</td>
                          <td>{apiLog.statusCode}</td>
                          <td>{apiLog.status}</td>
                          <td>{apiLog.message}</td>
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
const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(ApiLogs);
