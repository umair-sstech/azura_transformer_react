import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import { onLoading } from "../../actions";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./userList.css";
import Select from "react-select";

const UserList = (props) => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [searchText, setSearchText] = useState("active");
  const history = useHistory();
  const [autoId, setAutoId] = useState(1);

  const startIndex = (currentPage - 1) * dataLimit + 1;

  useEffect(() => {
    getDataFromApi(searchText);
  }, [currentPage, dataLimit]);

  const getDataFromApi = (search = "active") => {
    props.onLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_USER_SERVICE}/user/get-all-user?page=${currentPage}&limit=${dataLimit}&searchText=${search}`
      )
      .then((res) => {
        let totlePage = Math.ceil(res.data.totlaRecord / res.data.limit);
        setTotalPages(totlePage);
        setUserList(res.data.users);
        if (currentPage === 1) {
          setAutoId((currentPage - 1) * dataLimit + 1);
        }
        props.onLoading(false);
      })
      .catch((e) => {
        setUserList([]);
        props.onLoading(false);
      });
  };

  const updateUserHandler = (id) => {
    localStorage.setItem("newlyAddedUser", id);
    history.push("/manage-user");
  };

  const permissionManage = (id) => {
    localStorage.setItem("idForUserPermission", id);
    history.push("/user-permission");
  };

  const activateDeactivate = (event, id) => {
    const status = event.target.checked;
    Swal.fire({
      title: `${status ? "Activate" : "Deactivate"} User?`,
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
            `${process.env.REACT_APP_USER_SERVICE}/user/user-status/${id}`,
            { status }
          )
          .then((res) => {
            toast.success(res.data.message);
            getDataFromApi(searchText);
            setTimeout(() => {
              props.onLoading(false);
            }, 2000);
          })
          .catch((e) => {
            toast.error("Something Went Wrong");
            getDataFromApi(searchText);
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
            HeaderText="User List"
            Breadcrumb={[{ name: "User List", navigate: "#" }]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {/* <div className='d-flex justify-content-between align-items-center'> */}
                  <div className="mr-2" style={{ minWidth: "110px" }}>
                    <Select
                      options={filterList}
                      onChange={(data) => {
                        setSearchText(data.value);
                        getDataFromApi(data.value);
                      }}
                      defaultValue={filterList[1]}
                    />
                  </div>
                  {/* </div> */}
                  {props.user.permissions.add_user ? (
                    <Link className="link-btn" to={`/manage-user`}>
                      Add User
                    </Link>
                  ) : null}
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
                        <th>User Code</th>
                        <th>User Name</th>
                        <th>Company</th>
                        <th>Retailer</th>
                        <th>Last Login DT/TM (UTC )</th>
                        <th>Status</th>
                        {props.user.permissions.update_user ? (
                          <>
                            <th>Activate / Deactivate</th>
                            <th>Action</th>
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((data, idx) => {
                        return (
                          <tr key={data._id}>
                            <td>{startIndex + idx}</td>
                            <td>{data.user_code || "N/A"}</td>
                            <td>{data.name}</td>
                            <td>{data.company?.name || "N/A"}</td>
                            <td>{data.retailer?.name || "N/A"}</td>
                            <td>
                              {data.last_login
                                ? moment(data.last_login).format(
                                    "MM/DD/YYYY hh:mm a"
                                  )
                                : "N/A"}
                            </td>
                            <td>{data.status ? "Activate" : "Deactivated"}</td>
                            {props.user.permissions.update_user ? (
                              <>
                                <td>
                                  <Form.Check
                                    type="switch"
                                    id={`${data._id}`}
                                    checked={data.status}
                                    onChange={(e) =>
                                      activateDeactivate(e, data._id)
                                    }
                                  />
                                </td>
                                <td className="action-group">
                                  <i
                                    data-placement="top"
                                    title="Permissions"
                                    className="fa fa-lock lock mr-2"
                                    aria-hidden="true"
                                    onClick={() => permissionManage(data._id)}
                                  ></i>
                                  <i
                                    data-placement="top"
                                    title="Edit"
                                    className="fa fa-edit edit"
                                    onClick={() => updateUserHandler(data._id)}
                                  ></i>
                                </td>
                              </>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {userList?.length === 0 && (
                    <h4 className="no-data" style={{color: props.loading ? 'white' : '#8b8a8a'}}>No Data Found</h4>
                  )}
                  {userList?.length > 0 && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ LoadingReducer, loginReducer }) => ({
  loading: LoadingReducer.isLoading,
  user: loginReducer.user,
});
export default connect(mapStateToProps, { onLoading })(UserList);
