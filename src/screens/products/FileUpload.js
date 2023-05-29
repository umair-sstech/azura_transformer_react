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
import "./FileUpload.css";
import { Form } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";

function FileUpload(props) {
  const [supplierList, setSupplierList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(5);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("Supplier");
  const [supplier, setSupplier] = useState("Choose Supplier");
  console.log("supplier",supplier)
  const [fileError, setFileError] = useState("");
  const [autoId, setAutoId] = useState(1);
  const [fileData, setFileData] = useState([]);

  const startIndex = (currentPage - 1) * dataLimit + 1;

  const history = useHistory();

  useEffect(() => {
    // getFileList();
  }, []);

  const getFileList = async (currentPage, dataLimit, search) => {
    props.onLoading(true);

    try {
      const response = await axios.post(
        `${API_PATH.GET_FILE_UPLOAD}`,
        {
          page: currentPage,
          limit: dataLimit,
          status: status !== "all" ? (status === "active" ? 1 : 0) : null,
          search: search,
        }
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  useEffect(() => {
    const getProductData = async () => {
      const response = await getFileList(currentPage, dataLimit);
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
          .post(`${API_PATH.CHANGE_STATUS}`, {
            supplierId: supplierId,
            status: status,
          })
          .then((res) => {
            toast.success(res.data.message);

            const index = supplierList.findIndex(
              (filedata) => filedata.id === supplierId
            );

            setSupplierList((prevState) => [
              ...prevState.slice(0, index),
              {
                ...prevState[index],
                status: status,
              },
              ...prevState.slice(index + 1),
            ]);

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
    { label: "Activate", value: "active" },
    { label: "Deactivate", value: "deactive" },
    { label: "All", value: "all" },
  ];

  let chooseSupplierList = supplierList.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  const downloadFile = async (filePath) => {
    console.log("filepath",filePath)
    try {
      const response = await axios.get(filePath, {
        responseType: 'blob', 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath.substring(filePath.lastIndexOf('/') + 1));
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log('error', error);
    }
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
            Breadcrumb={[
              { name: "Products", navigate: "#" },
              { name: "File Upload", navigate: "#" },
            ]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="mb-3 top__header">
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
                  <div
                    style={{ minWidth: "210px" }}
                    className="supplier__dropdown"
                  >
                    <Select
                      options={chooseSupplierList}
                      onChange={(data) => {
                        setSupplier(data.value);
                      }}
                      defaultValue={{ label: "Select Supplier" }}
                    />
                  </div>
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
                        <th>Supplier Name</th>

                        <th>Import Date /Time UTC</th>
                        <th>File Name</th>
                        <th>Import Type</th>

                        <th>Download</th>
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
                          <td className="action-group">
                            <i
                              data-placement="top"
                              title="Edit"
                              className="fa fa-solid fa-download"
                              onClick={() => downloadFile(filedata.localPath)}
                            ></i>
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
export default connect(mapStateToProps, { onLoading })(FileUpload);
