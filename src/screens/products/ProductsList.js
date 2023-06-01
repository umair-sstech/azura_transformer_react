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
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";
import "./ProductsList.css";

function ProductsList(props) {
  const [productList, setProductList] = useState([]);
  console.log("productList",productList)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [dataLimit, setdataLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("MarketPlace");
  const [search, setSearch] = useState("");
  const [autoId, setAutoId] = useState(1);

  const startIndex = (currentPage - 1) * dataLimit + 1;

  const history = useHistory();

  useEffect(() => {
    // getProductList()
  }, []);


  const getProductList = async (currentPage, dataLimit, search) => {
    props.onLoading(true);

    try {

      const response = await axios.post(

        `${API_PATH.GET_PRODUCT_LIST}`,
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
      const response = await getProductList(currentPage, dataLimit, search);
      if (response) {
        let totalPage = Math.ceil(response.totalRecord / response.limit);
        setTotalPages(totalPage);
        if (status === "deactive") {
          setProductList(
            response.data.filter((product) => product.status === 0)
          );
        } else if (status === "all") {
          setProductList(response.data);
        } else {
          setProductList(
            response.data.filter((product) => product.status === 1)
          );
          if (currentPage === 1) {
            setAutoId((currentPage - 1) * dataLimit + 1);
          }
        }
        setType(type);
        props.onLoading(false);
      }
    };

    getProductData();
  }, [currentPage, dataLimit, status,search]);

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

            const index = productList.findIndex(
              (product) => product.id === supplierId
            );

            setProductList((prevState) => [
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

  const handleSearch = (event) => {
  const { value } = event.target;
  setSearch(value);
  setCurrentPage(1); // Reset the current page when a new search is performed
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
            HeaderText="Products List"
            Breadcrumb={[
              { name: "Products List", navigate: "#" },
            ]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="mb-3 top__header">
                  {/*<div style={{ minWidth: "130px" }}>
                    <Select
                      options={filterList}
                      onChange={(data) => {
                        setStatus(data.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={filterList[0]}
                    />
                    </div>*/}
                  <InputGroup>
                    <InputGroup.Text id="search">Search</InputGroup.Text>
                    <FormControl
                      type="search"
                      className=""
                      placeholder="Search Products by SKU Number, Parent SKU Number, Name, Category or Supplier..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </div>

                <div className="data-table">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="w-100 table-responsive-md">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Supplier Name</th>
                        <th>Logo</th>
                        <th>Grand Parent SKU</th>
                        <th>Parent SKU</th>
                        <th>Variant SKU</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Cost Price</th>
                        <th>Retail Price</th>
                        <th>Last Update(UTC)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList?.map((product, idx) => (
                        <tr key={product.id}>
                          <td>{startIndex + idx}</td>
                          <td>{product.Supplier}</td>
                          <td>
                            {product.Image_Parent_1_original ? (
                              <img src={product.Image_Parent_1_original} className="list-logo" />
                            ) : (
                              <div className="list-logo placeholder">N/A</div>
                            )}
                          </td>

                          <td>{product.Grandparent_SKU}</td>

                          <td>{product.Parent_SKU}</td>

                          <td>{product.Variant_SKU}</td>
                          <td>{product.Brand}</td>

                          <td>{product.Azura_Category_Tree}</td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td>
                            {product.updatedAt
                              ? moment(product.updated_on).format(
                                  "MM/DD/YYYY hh:mm a"
                                )
                              : "N/A"}
                          </td>

                          <>
                            {/*<td>
                            <Form.Check
                              type="switch"
                              id={`${product.id}`}
                              checked={product.status}
                              onChange={(e) =>
                                activateDeactivate(e, product.id)
                              }
                            />
                            </td>*/}

                            <td className="action-group">
                              <i
                                data-placement="top"
                                title="Edit"
                                className="fa fa-eye"
                                onClick={() => {
                                  localStorage.setItem(
                                    "marketPlaceId",
                                    product.id
                                  );
                                  localStorage.setItem(
                                    "marketPlaceName",
                                    product.name
                                  );

                                  history.push(`/product-details`);
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
export default connect(mapStateToProps, { onLoading })(ProductsList);
