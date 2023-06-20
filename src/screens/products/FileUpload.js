import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import "./FileUpload.css";
import { Form } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";

function FileUpload(props) {
  const [supplierList, setSupplierList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("Supplier");
  const [supplier, setSupplier] = useState([]);
  const [chooseSupplierList, setChooseSupplierList] = useState([]);
  const [autoId, setAutoId] = useState(1);
  const [fileData, setFileData] = useState([]);

  const startIndex = (currentPage - 1) * dataLimit + 1;

  const history = useHistory();

  useEffect(() => {
    getSupplierList();
  }, []);

  const getSupplierList = async () => {
    try {
      const response = await axios.post(`${API_PATH.GET_LIST}`, {
        type: "Supplier",
      });
      const suppliers = response.data.data;
      setSupplier(suppliers);
      const supplierNames = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }));
      setChooseSupplierList(supplierNames);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const getFileList = async (currentPage, dataLimit, search, supplierId) => {
    props.onLoading(true);

    try {
      const response = await axios.post(`${API_PATH.GET_FILE_UPLOAD}`, {
        page: currentPage,
        limit: dataLimit,
        status: status !== "all" ? (status === "active" ? 1 : 0) : null,
        search: search,
        supplierId: supplierId,
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  useEffect(() => {
    const getProductData = async () => {
      const response = await getFileList(
        currentPage,
        dataLimit,
        null,
        supplier.value
      );
      if (response) {
        let totalPage = Math.ceil(response.totalRecord / response.limit);
        setTotalPages(totalPage);
        if (status === "deactive") {
          setFileData(response.data.filter((product) => product.status === 0));
        } else if (status === "all") {
          setFileData(response.data);
        } else {
          setFileData(response.data.filter((product) => product.status === 1));
          if (currentPage === 1) {
            setAutoId((currentPage - 1) * dataLimit + 1);
          }
        }
        setType(type);
        props.onLoading(false);
      }
    };

    getProductData();
  }, [currentPage, dataLimit, status, supplier]);

  const downloadFile = (localPath, fileName) => {
    const link = document.createElement("a");
    link.href = localPath;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.addEventListener("error", (event) => {
      console.error("Error occurred while downloading the file.", event);
    });
  };

  const downloadErrorFile = (errorCsvPath, fileName) => {
    const link = document.createElement("a");
    link.href = errorCsvPath;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.addEventListener("error", (event) => {
      console.error("Error occurred while downloading the file.", event);
    });
  };

  
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
            HeaderText="File Upload"
            Breadcrumb={[{ name: "File Upload", navigate: "#" }]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="mb-3 top__header">
                  <div style={{ minWidth: "210px" }}>
                    <Select
                      options={chooseSupplierList}
                      onChange={(data) => {
                        setSupplier(data);
                      }}
                      defaultValue={{ label: "Select Supplier" }}
                    />
                  </div>
                  <div
                    style={{ minWidth: "145px" }}
                    className="supplier__dropdown"
                  >
                    <Link className="link-btn" to={`/upload-failed-data`}>
                      Upload Failed Data
                    </Link>
                  </div>
                </div>
                <div className="data-table">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="table w-100 table-responsive-md">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Supplier Name</th>
                        <th>Import Time(UTC)</th>
                        <th>File Name</th>
                        <th>Import Type</th>
                        <th>Total Count</th>
                        <th>Failed Count</th>
                        <th>Original File</th>
                        <th>Failed Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileData.map((filedata, idx) => (
                        <tr key={filedata.id}>
                          <td>{startIndex + idx}</td>
                          <td>{filedata.supplierName}</td>

                          <td>{filedata.startDate}</td>
                          <td>{filedata.fileName}</td>

                          <td>{filedata.protocol}</td>
                          <td className="text-success">{filedata.rowCount}</td>
                          <td className="text-danger">{filedata.failCount}</td>

                          <td className="action-group">
                          {filedata.localPath !== null && (
                            <i
                              data-placement="top"
                              title="Download"
                              style={{ color: "#49c5b6", cursor: "pointer" }}
                              className="fa fa-solid fa-download"
                              onClick={() => downloadFile(filedata.localPath, filedata.fileName)}
                            ></i>
                          )}
                          
                          </td>
                          <td className="action-group">

                          {filedata.errorCsvPath !== null && (
                            <i
                            data-placement="top"
                            title="Download1"
                            style={{ color: "#49c5b6", cursor: "pointer" }}
                            className="fa fa-solid fa-download"
                            onClick={() =>
                              downloadErrorFile(
                                filedata.errorCsvPath,
                                filedata.fileName
                              )
                            }
                          ></i>
                          )}
                           
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination-wrapper">
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onPageChange={setCurrentPage}
                      maxWidth={400}
                    />
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
export default connect(mapStateToProps, { onLoading })(FileUpload);
