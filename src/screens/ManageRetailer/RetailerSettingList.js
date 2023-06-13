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
import { API_PATH } from "../ApiPath/Apipath";

function RetailerSettingList(props) {
  const [retailerSetting, setRetailerSetting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [autoId, setAutoId] = useState(1);

  const history = useHistory();
  const startIndex = (currentPage - 1) * dataLimit + 1;


  const getSupplierInfo = async (currentPage, dataLimit) => {
    props.onLoading(true);

    try {
      const retailerId=localStorage.getItem("newlyAddedRetailer")
      const response = await axios.post(`${API_PATH.GET_RETAILER_INTEGRATION_LIST}`, {
        page: currentPage,
        limit: dataLimit,
        status: status !== "all" ? (status === "active" ? 1 : 0) : null,
        retailerId:retailerId
      });
      return response.data;
    } catch (error) {
      console.log("error", error);

      return null;
    }
  };

  useEffect(() => {
    const fetchSupplierInfo = async () => {
      const response = await getSupplierInfo(currentPage, dataLimit);
      console.log("responsedata",response.totalRecord)
      if (response) {
        let totalPage = Math.ceil(response.totalRecord / response.limit);
        console.log("totalPage",totalPage)
        setTotalPages(totalPage);
        if (status === "deactive") {
          setRetailerSetting(
            response.data.filter((retailer) => retailer.status === 0)
          );
        } else if (status === "all") {
          setRetailerSetting(response.data);
        } else {
          setRetailerSetting(
            response.data.filter((retailer) => retailer.status === 1)
          );
          if (currentPage === 1) {
            setAutoId((currentPage - 1) * dataLimit + 1);
          }
          
        }
      }
      props.onLoading(false);

    };
    fetchSupplierInfo();
  }, [currentPage, dataLimit, status]);

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
          .post(`${API_PATH.CHANGE_STATUS}`
          , {
            id: id,
            status: status,
          })
          .then((res) => {
            toast.success(res.data.message);

            const index = retailerSetting.findIndex(
              (supplier) => supplier.id === id
            );

            setRetailerSetting((prevState) => [
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
            HeaderText="Retailer Setting List"

            Breadcrumb={[
              { name: "Retailer", navigate: "/retailer", items: ["newlyAddedRetailer","currentPage"] },
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
                  <table className="table w-100 table-responsive-md">
                    <thead>
                      <tr>
                      <th>id</th>
                        <th>Supplier Name</th>
                        <th>Currency</th>
                        <th>MarketPlace/Integrator</th>
                        <th>Last Update(UTC)</th>
                            <th>Status</th>
                            <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {retailerSetting.map((retailer,index) => (
                        <tr key={retailer.id}>
                        <td>{startIndex + index}</td>
                          <td>{retailer.supplierNames?.join(" / ")}</td>
                          <td>{retailer.currencyNames}</td>
                          <td>{retailer.marketPlaceNames}</td>
                          
                          <td>
                          {retailer.updated
                            ? moment(retailer.updated_on).format(
                              "MM/DD/YYYY hh:mm a"
                            )
                            : moment(retailer.created_on).format(
                              "MM/DD/YYYY hh:mm a"
                            )}
                        </td>

                          <>
                          <td>
                            <Form.Check
                              type="switch"
                              id={`${retailer.id}`}
                              checked={retailer.status}
                              onChange={(e) =>
                                activateDeactivate(e, retailer.id)
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
                                  "retailerIntegrationId",
                                  retailer.id
                                );
                                localStorage.setItem("supplierSettingId",retailer.supplierId)
                                localStorage.setItem(
                                  "selectedSupplierName",
                                 retailer.supplierNames
                                );

                                history.push(`/setting-retailer`);
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
export default connect(mapStateToProps, { onLoading })(RetailerSettingList);
