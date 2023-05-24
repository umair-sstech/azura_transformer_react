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
  const [fileError, setFileError] = useState("");;
  const [autoId, setAutoId] = useState(1);

  const startIndex = (currentPage - 1) * dataLimit + 1

  const history = useHistory();

  const getSupplierInfo = async (currentPage, dataLimit) => {
    props.onLoading(true);

    try {
      const response = await axios.post(
        `${API_PATH.GET_LIST}`,
        {
          page: currentPage,
          limit: dataLimit,
          type: type,
          status: status !== "all" ? (status === "active" ? 1 : 0) : null,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);

      return null;
    }
  };

  useEffect(() => {
    const fetchSupplierIfo = async () => {
      const response = await getSupplierInfo(currentPage, dataLimit);
      if (response) {
        let totalPage = Math.ceil(response.totlaRecord / response.limit);
        setTotalPages(totalPage);
        if (status === "deactive") {
          setSupplierList(
            response.data.filter((supplier) => supplier.status === 0)
          );
        } else if (status === "all") {
          setSupplierList(response.data);
        } else {
          setSupplierList(
            response.data.filter((supplier) => supplier.status === 1)
          );
          if (currentPage === 1) {
            setAutoId((currentPage - 1) * dataLimit + 1);
          }
        }
        setType(type);

        props.onLoading(false);
      }
    };
    fetchSupplierIfo();
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
              (market_place) => market_place.id === supplierId
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
  })

  const handleFileInputChange = () => {
    setFileError("");
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
                  <div style={{ minWidth: "210px" }} className="supplier__dropdown">
                    <Select
                      options={chooseSupplierList}
                      onChange={(data) => {
                        setSupplier(data.value);
                      }}
                      defaultValue={{ label: "Select Supplier" }}
                    />
                  </div>
                  <div className="file__select">
                    <input
                      className="form-control"
                      type="file"
                      name="csvfile"
                      accept=".csv"
                      onChange={handleFileInputChange}
                    />
                    {fileError && <p style={{ color: "red" }}>{fileError}</p>}
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
                        <th>Id</th>
                        <th>Supplier Name</th>

                        <th>Import Date /Time UTC</th>
                        <th>File Name</th>
                        <th>Import Type</th>
                        <th>Lines</th>
                        {props.user.permissions.update_company ? (
                          <>
                            <th>Status</th>
                            <th>Download</th>
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {supplierList.map((market_place, idx) => (
                        <tr key={market_place.id}>
                          <td>{startIndex + idx}</td>
                          <td>
                            {market_place.logo ? (
                              <img
                                src={market_place.logo}
                                alt={market_place.name}
                                className="list-logo"
                              />
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>

                          <td>{market_place.name}</td>
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
                            <td>
                              <Form.Check
                                type="switch"
                                id={`${market_place.id}`}
                                checked={market_place.status}
                                onChange={(e) =>
                                  activateDeactivate(e, market_place.id)
                                }
                              />
                            </td>

                            <td className="action-group">
                              <i
                                data-placement="top"
                                title="Edit"
                                className="fa fa-solid fa-download"
                                onClick={() => {
                                  localStorage.setItem(
                                    "marketPlaceId",
                                    market_place.id
                                  );
                                  localStorage.setItem(
                                    "marketPlaceName",
                                    market_place.name
                                  );

                                  history.push(`/manage-marketPlace`);
                                }}
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
const mapStateToProps = ({ LoadingReducer, loginReducer }) => ({
  loading: LoadingReducer.isLoading,
  user: loginReducer.user,
});
export default connect(mapStateToProps, { onLoading })(FileUpload);
