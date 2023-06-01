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
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [autoId, setAutoId] = useState(1);

  const history = useHistory();

  const startIndex = (currentPage - 1) * dataLimit + 1;

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

  useEffect(() => {
    getSupplierInfo();
  }, []);
  const getSupplierInfo = async (currentPage, dataLimit) => {
    props.onLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8001/integration/getIntegrationInfo",
        {
          page: currentPage,
          limit: dataLimit,
          status: status !== "all" ? (status === "active" ? 1 : 0) : null,
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);

      return null;
    }
  };

  useEffect(() => {
    const fetchSupplierInfo = async () => {
      const response = await getSupplierInfo(currentPage, dataLimit);
      if (response) {
        let totalPage = Math.ceil(response.totlaRecord / response.limit);
        console.log("totalpge", totalPage);
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

        props.onLoading(false);
      }
    };
    fetchSupplierInfo();
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
            console.log("response", res.data);
            toast.success(res.data.message);

            const index = supplierList.findIndex(
              (supplier) => supplier.id === supplierId
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
                    className="select-option"
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
                  <table className="table w-100 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Logo</th>
                        <th> Name</th>
                        <th>Prefix Name</th>
                        <th>Last Update(UTC)</th>
                        <>
                          <th>Status</th>
                        </>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierList?.map((supplier, index) => (
                        <tr key={supplier.id}>
                          <td>{startIndex + index}</td>
                          <td>
                            {supplier.logo ? (
                              <img src={supplier.logo} className="list-logo" />
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
    </>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(IntegrationType);
