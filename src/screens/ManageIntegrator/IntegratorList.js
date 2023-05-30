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
import { API_PATH } from "../ApiPath/Apipath";
import { Form } from "react-bootstrap";

function IntegratorList(props) {
  const [integratorList, setIntegratorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("Integrator");
  const history = useHistory();
  const [autoId, setAutoId] = useState(1);

  const startIndex = (currentPage - 1) * dataLimit + 1

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
    const fetchMarketPlaceInfo = async () => {
      const response = await getSupplierInfo(currentPage, dataLimit);
      if (response) {
        let totalPage = Math.ceil(response.totlaRecord / response.limit);
        setTotalPages(totalPage);
        if (status === "deactive") {
          setIntegratorList(
            response.data.filter((integrator) => integrator.status === 0)
          );
        } else if (status === "all") {
          setIntegratorList(response.data);
        } else {
          setIntegratorList(
            response.data.filter((integrator) => integrator.status === 1)
          );
          if (currentPage === 1) {
            setAutoId((currentPage - 1) * dataLimit + 1);
          }
        }
        setType(type);

        props.onLoading(false);
      }
    };
    fetchMarketPlaceInfo();
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

            // Find the index of the supplier object in the array
            const index = integratorList.findIndex(
              (integrator) => integrator.id === supplierId
            );

            // Update the status property of the supplier object
            setIntegratorList((prevState) => [
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
              { name: "Integration", navigate: "/integration" },
              { name: "Integrator List", navigate: "#" },
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
                  <table className="table w-100 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Logo</th>
                        <th>Integrator Name</th>

                        <th>Prefix Name</th>
                        <th>Last Update(UTC)</th>
                            <th>Status</th>
                            <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {integratorList.map((integrator, idx) => (
                        <tr key={integrator.id}>
                          <td>{startIndex + idx}</td>
                          <td>
                            {integrator.logo ? (
                              <img
                                src={integrator.logo}
                                alt={integrator.name}
                                className="list-logo"
                              />
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>
                          <td>{integrator.name}</td>


                          <td>{integrator.prefixName}</td>
                          <td>
                            {integrator.updatedAt
                              ? moment(integrator.updated_on).format(
                                "MM/DD/YYYY hh:mm a"
                              )
                              : "N/A"}
                          </td>

                          <>
                            <td>
                              <Form.Check
                                type="switch"
                                id={`${integrator.id}`}
                                checked={integrator.status}
                                onChange={(e) =>
                                  activateDeactivate(e, integrator.id)
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
                                    "integratorId",
                                    integrator.id
                                  );
                                  localStorage.setItem(
                                    "integratorName",
                                    integrator.name
                                  );
                                  history.push(
                                    `/manage-integrator`
                                  );
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
export default connect(mapStateToProps, { onLoading })(IntegratorList);
