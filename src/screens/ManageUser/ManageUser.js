import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify'
import countryList from '../../Data/countryList';
import timeZoneData from '../../Data/timeZone';
import PageHeader from '../../components/PageHeader';
import Select from 'react-select';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useCompanyList } from '../../Hooks/useCompanyList';
import { useRetailerList } from '../../Hooks/useRetailerList';
import { connect } from 'react-redux';
import { onLoading, onUpdateFormLoading } from '../../actions';
import { useHistory } from 'react-router-dom';

const ManageUser = (props) => {
  const history = useHistory();

  const [initFormData, setInitFormData] = useState({
    name: "",
    country: "",
    email: "",
    timeZone: "",
    password: "",
    role: "",
    retailer: "",
    company: "",
  });
  const [error, setError] = useState(false);

  const [updateUserId, setUpdateUserId] = useState("");
  console.log("userId",updateUserId)

  const roleList = [
    {
      label: "Company Admin",
      value: "COMPANY_ADMIN",
    },
    {
      label: "Retailer Admin",
      value: "RETAILER_ADMIN",
    },
  ];

  const companyList = useCompanyList(props.user.data.role);

  const retailerList = useRetailerList();

  const Schema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Insert Vaid Email")
      .required("This field is required"),
    country: Yup.object().required("This field is required"),
    timeZone: Yup.object().required("This field is required"),
    password: Yup.string().required("This field is required"),
    role: Yup.object().required("This field is required"),
    retailer: Yup.object(),
    company: Yup.object(),
  });

  const updateSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Insert Vaid Email")
      .required("This field is required"),
    country: Yup.object().required("This field is required"),
    timeZone: Yup.object().required("This field is required"),
    password: Yup.string(),
    role: Yup.object().required("This field is required"),
    retailer: Yup.object(),
    company: Yup.object(),
  });

  const retailerUserSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Insert Vaid Email")
      .required("This field is required"),
    country: Yup.object().required("This field is required"),
    timeZone: Yup.object().required("This field is required"),
    password: Yup.string(),
    retailer: Yup.object(),
    company: Yup.object(),
  });


  useEffect(() => {
    const id = localStorage.getItem("newlyAddedUser");
    if (id) {
      setUpdateUserId(id);
      getUserDetailForUpdate(id);
    }
  }, [retailerList, companyList]);

  const getUserDetailForUpdate = (id) =>
  {
    props.onUpdateFormLoading(true)
    axios
      .get(`${process.env.REACT_APP_USER_SERVICE}/user/user-by-id/${id}`)
      .then((res) => {
        const data = res.data.user;
        let timeZone = timeZoneData.find((tz) => tz.abbr == data.time_zone);
        let role = roleList.find((rData) => rData.value == data.role);
        let retailer = retailerList?.find((rData) => rData._id == data.retailer);
        let company = companyList?.find((cData) => cData._id == data.company);

        setInitFormData({
          name: data.name,
          country: {
            value: data.country,
            label: data.country,
          },
          email: data.email,
          timeZone: {
            value: timeZone.abbr,
            label: timeZone.text,
          },
          password: "",
          role: data.role === "RETAILER_USER" ? { label: "Retailer User", value: "RETAILER_USER" } : role,
          retailer: {
            value: retailer?._id,
            label: retailer?.name,
          },
          company: {
            value: company?._id,
            label: company?.name,
          },
        });
        props.onUpdateFormLoading(false) 
      })
      .catch((e) => {
        console.log(e);
        props.onUpdateFormLoading(false) 
      });
  };

  useEffect(
    () => () => {
      setUpdateUserId("");
      localStorage.removeItem("newlyAddedUser");
    },
    []
  );

  const processCancel = () => {
    setUpdateUserId("");
    localStorage.removeItem("newlyAddedUser");
    history.push("/user");
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
          HeaderText={updateUserId ? "User Update" : "User Add"}

            Breadcrumb={[
              { name: "User List", navigate: "/user" },
              { name: updateUserId ? "User Update" : "User Add", navigate: "#" },
            ]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                {props.updateFormLoading ? <div className='loader-wrapper' >
                  <i className="fa fa-refresh fa-spin"></i>
                </div> : null}
                <Formik
                  initialValues={initFormData}
                  enableReinitialize
                  validationSchema={updateUserId ? updateSchema : props.user.data.role === "RETAILER_ADMIN" || props.user.data.role === "COMPANY_ADMIN" ? retailerUserSchema : Schema}
                  onSubmit={(data, { resetForm }) => {
                    data.res =
                      data.role.value == "RETAILER_ADMIN"
                        ? data.retailer
                        : data.company;

                    if (data.res || props.user.data.role === "RETAILER_ADMIN" || props.user.data.role === "COMPANY_ADMIN") {
                      setError(false);
                      props.onLoading(true);
                      
                        if (updateUserId) {
                            const reqBody = {
                                    name: data.name,
                                    email: data.email,
                                    country: data.country.value,
                                    password: data.password || undefined,
                                    time_zone: data.timeZone.value,
                            };
                          axios.post(`${process.env.REACT_APP_USER_SERVICE}/user/update-user/${updateUserId}`, reqBody)
                                .then((res) => {
                                    toast.success(res.data.message);
                                    props.onLoading(false);
                            })
                        .catch((e) => {
                          props.onLoading(false);
                          toast.error(e.response.data.message || "Something went wrong");
                        });
                        } else {
                            const reqBody = {
                        name: data.name,
                        email: data.email,
                        country: data.country.value,
                        password: data.password,
                        time_zone: data.timeZone.value,
                        role: data.role.value,
                        company:
                          data.role.value === "COMPANY_ADMIN"
                            ? data.res.value
                            : null,
                        retailer:
                          data.role.value === "RETAILER_ADMIN"
                            ? data.retailer.value
                            : null,
                            };

                          if (props.user.data.role === "RETAILER_ADMIN") {
                            reqBody.retailer = props.user.data.retailer
                            reqBody.role = "RETAILER_USER"
                          }
                          if (props.user.data.role === "COMPANY_ADMIN") {
                            reqBody.role = "RETAILER_ADMIN"
                            reqBody.retailer = data.retailer.value
                          }

                          axios.post(`${process.env.REACT_APP_USER_SERVICE}/user/create-user`, reqBody)
                            .then((res) => {
                                toast.success(res.data.message);
                                props.onLoading(false);
                                resetForm({
                                    name: "",
                                    country: "",
                                    email: "",
                                    timeZone: "",
                                    password: "",
                                    role: "",
                                    retailer: "",
                                    company: "",
                                });
                              history.push('/user')
                            })
                        .catch((e) => {
                          props.onLoading(false);
                          toast.error(e.response.data.message || "Something went wrong");
                        });
                        }
                    } else {
                      setError(true);
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    touched,
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="form-group">
                            <label>
                              Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              placeholder="Enter User Name"
                            />
                            {errors.name && touched.name ? (
                              <span className="error" style={{ color: "red" }}>
                                {errors.name}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label>
                              Country <span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              options={countryList?.map((data) => {
                                return {
                                  value: data.name,
                                  label: data.name,
                                };
                              })}
                              placeholder="Select Country"
                              value={values.country}
                              onBlur={(e) => handleBlur(e)}
                              onChange={(data) => {
                                if (data) {
                                  let event = {
                                    target: { name: "country", value: data },
                                  };
                                  handleChange(event);
                                }
                              }}
                            />
                            {errors.country && touched.country ? (
                              <span className="error" style={{ color: "red" }}>
                                {errors.country}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Email Address{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                placeholder="Enter Email Address"
                              />
                              {errors.email && touched.email ? (
                                <span
                                  className="error"
                                  style={{ color: "red" }}
                                >
                                  {errors.email}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Password {updateUserId? null : <span style={{ color: "red" }}>*</span>} 
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                placeholder="Enter Password"
                              />
                              {errors.password && touched.password ? (
                                <span
                                  className="error"
                                  style={{ color: "red" }}
                                >
                                  {errors.password}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>
                            TimeZone <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            options={timeZoneData?.map((data) => {
                              return {
                                value: data.abbr,
                                label: data.text,
                              };
                            })}
                            placeholder="Select TimeZone"
                            value={values.timeZone}
                            onBlur={(e) => handleBlur(e)}
                            onChange={(data) => {
                              if (data) {
                                let event = {
                                  target: { name: "timeZone", value: data },
                                };
                                handleChange(event);
                              }
                            }}
                          />
                          {errors.timeZone && touched.timeZone ? (
                            <span className="error" style={{ color: "red" }}>
                              {errors.timeZone}
                            </span>
                          ) : null}
                        </div>
                        {props.user.data.role === "RETAILER_ADMIN" ? null : <Row>
                          {props.user.data.role == "COMPANY_ADMIN" ? null : <Col md={6}>
                            <div className="form-group">
                              <label>
                                User Type{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <Select
                                options={roleList}
                                placeholder="Select User Type"
                                value={values.role}
                                onBlur={(e) => handleBlur(e)}
                                onChange={(data) =>
                                {
                                  if (data) {
                                    let event = {
                                      target: { name: "role", value: data },
                                    };
                                    handleChange(event);
                                  }
                                }}
                                isDisabled={updateUserId ? true : false}
                              />
                              {errors.role && touched.role ? (
                                <span
                                  className="error"
                                  style={{ color: "red" }}
                                >
                                  {errors.role}
                                </span>
                              ) : null}
                            </div>
                          </Col>}
                          <Col md={6}>
                            <div className="form-group">
                              {values?.role?.value == "COMPANY_ADMIN" ? (
                                <>
                                  <label>
                                    Select Company{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Select
                                    options={companyList?.map((data) => {
                                      return {
                                        value: data._id,
                                        label: data.name,
                                      };
                                    })}
                                    placeholder="Select Company"
                                    value={values.company}
                                    onBlur={(e) => handleBlur(e)}
                                    onChange={(data) => {
                                      if (data) {
                                        let event = {
                                          target: {
                                            name: "company",
                                            value: data,
                                          },
                                        };
                                        handleChange(event);
                                      }
                                    }}
                                    isDisabled={updateUserId ? true : false}
                                  />
                                </>
                              ) : null}
                              {values?.role?.value == "RETAILER_ADMIN" || props.user.data.role == "COMPANY_ADMIN" ? (
                                <>
                                  <label>
                                    Select Retailer{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Select
                                    options={retailerList?.map((data) => {
                                      return {
                                        value: data._id,
                                        label: data.name,
                                      };
                                    })}
                                    placeholder="Select Retailer"
                                    value={values.retailer}
                                    onBlur={(e) => handleBlur(e)}
                                    onChange={(data) => {
                                      if (data) {
                                        let event = {
                                          target: {
                                            name: "retailer",
                                            value: data,
                                          },
                                        };
                                        handleChange(event);
                                      }
                                    }}
                                    isDisabled={updateUserId ? true : false}
                                  />
                                </>
                              ) : null}
                              {error ? (
                                <span
                                  className="error"
                                  style={{ color: "red" }}
                                >
                                  This fiel is require
                                </span>
                              ) : null}
                            </div>
                          </Col>
                        </Row>}
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-12">
                            <div className="d-flex">
                              <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" disabled={props.loading} >

                                {props.loading ? (<>
                                  <Spinner animation="border" size="sm" /> Please wait...
                                </>) : updateUserId ? 'Update' : 'Save'}
                              </button>
                              {updateUserId ? (
                                <button
                                  className="btn btn-secondary"
                                  onClick={processCancel}
                                  disabled={props.loading}
                                >
                                  Cancel
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
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
  updateFormLoading: LoadingReducer.updateFormLoading
});

export default connect(mapStateToProps, { onLoading, onUpdateFormLoading })(ManageUser);
