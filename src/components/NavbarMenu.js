import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Nav, Toast, Button, Collapse } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
  onLogOut,
  onLoggedin,
} from "../actions";
import Logo from "../assets/images/logo.svg";
import LogoWhite from "../assets/images/logo-white.svg";
import UserImage from "../assets/images/user.png";
import Avatar4 from "../assets/images/xs/avatar4.jpg";
import Avatar5 from "../assets/images/xs/avatar5.jpg";
import Avatar2 from "../assets/images/xs/avatar2.jpg";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar3 from "../assets/images/xs/avatar3.jpg";
import "./NavbarMenu.css";
import { onSystemLoading } from "../actions";
import { withRouter } from "react-router-dom";

const LogOut = ({ propData }) => {
  const history = useHistory();
  const logoutHandler = () => {
    propData.onSystemLoading(true);
    const token = localStorage.getItem("token");

    const userId = propData.user.data._id;
    propData
      .onLogOut(token, userId)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("company");
        localStorage.removeItem("retailer");
        localStorage.removeItem("newlyAddedRetailer");

        localStorage.removeItem("role");
        propData.onLoggedin(false);
        history.push("/login");
        propData.onSystemLoading(false);
      })
      .catch((e) => {
        console.log(e);
        propData.onLoggedin(false);
        propData.onSystemLoading(false);
      });
  };
  return (
    <button className="icon-menu button-link" onClick={logoutHandler}>
      <i className="icon-login"></i>
    </button>
  );
};

class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.manageDropdown = [
      "/company",
      "/manage-company",
      "/retailer",
      "/manage-retailer",
      "/user",
      "/manage-user",
    ];
  }
  state = {
    linkupdate: false,
    colapsStatue: false,
  };
  componentDidMount() {
    this.props.tostMessageLoad(true);
    var res = window.location.pathname;
    res = res.split("/");
    res = res.length > 4 ? res[4] : "/";
    const { activeKey } = this.props;
    this.activeMenutabwhenNavigate("/" + activeKey);
  }

  logoutHandler = () => {
    this.props.onSystemLoading(true);
    const token = localStorage.getItem("token");

    const userId = this.props.user.data._id;
    this.props
      .onLogOut(token, userId)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("company");
        localStorage.removeItem("retailer");
        localStorage.removeItem("newlyAddedRetailer");

        localStorage.removeItem("role");
        this.props.onLoggedin(false);
        this.props.history.push("/login");
        this.props.onSystemLoading(false);
      })
      .catch((e) => {
        console.log(e);
        this.props.onLoggedin(false);
        this.props.onSystemLoading(false);
      });
  };

  activeMenutabwhenNavigate(activeKey) {
    if (
      activeKey === "/dashboard" ||
      activeKey === "/demographic" ||
      activeKey === "/ioT"
    ) {
      this.activeMenutabContainer("dashboradContainer");
    } else if (
      activeKey === "/appinbox" ||
      activeKey === "/appchat" ||
      activeKey === "/appcalendar" ||
      activeKey === "/appcontact" ||
      activeKey === "/apptaskbar"
    ) {
      this.activeMenutabContainer("AppContainer");
    } else if (
      activeKey === "/filemanagerdashboard" ||
      activeKey === "/filedocuments" ||
      activeKey === "/filemedia"
    ) {
      this.activeMenutabContainer("FileManagerContainer");
    } else if (
      activeKey === "/blognewpost" ||
      activeKey === "/bloglist" ||
      activeKey === "/blogdetails"
    ) {
      this.activeMenutabContainer("BlogContainer");
    } else if (
      activeKey === "/uitypography" ||
      activeKey === "/uitabs" ||
      activeKey === "/uibuttons" ||
      activeKey === "/bootstrapui" ||
      activeKey === "/uiicons" ||
      activeKey === "/uinotifications" ||
      activeKey === "/uicolors" ||
      activeKey === "/uilistgroup" ||
      activeKey === "/uimediaobject" ||
      activeKey === "/uimodal" ||
      activeKey === "/uiprogressbar"
    ) {
      this.activeMenutabContainer("UIElementsContainer");
    } else if (
      activeKey === "/widgetsdata" ||
      activeKey === "/widgetsweather" ||
      activeKey === "/widgetsblog" ||
      activeKey === "/widgetsecommers"
    ) {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (activeKey === "/login") {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (
      activeKey === "/teamsboard" ||
      activeKey === "/profilev2page" ||
      activeKey === "/helperclass" ||
      activeKey === "/searchresult" ||
      activeKey === "/invoicesv2" ||
      activeKey === "/invoices" ||
      activeKey === "/pricing" ||
      activeKey === "/timeline" ||
      activeKey === "/profilev1page" ||
      activeKey === "/blankpage" ||
      activeKey === "/imagegalleryprofile" ||
      activeKey === "/projectslist" ||
      activeKey === "/maintanance" ||
      activeKey === "/testimonials" ||
      activeKey === "/faqs"
    ) {
      this.activeMenutabContainer("PagesContainer");
    } else if (
      activeKey === "/formvalidation" ||
      activeKey === "/basicelements"
    ) {
      this.activeMenutabContainer("FormsContainer");
    } else if (activeKey === "/tablenormal") {
      this.activeMenutabContainer("TablesContainer");
    } else if (activeKey === "/echart") {
      this.activeMenutabContainer("chartsContainer");
    } else if (activeKey === "/leafletmap") {
      this.activeMenutabContainer("MapsContainer");
    }
  }

  // componentWillReceiveProps(){
  //   this.setState({
  //     linkupdate:!this.state.linkupdate
  //   })
  // }

  activeMenutabContainer(id) {
    var parents = document.getElementById("main-menu");
    var activeMenu = document.getElementById(id);

    for (let index = 0; index < parents.children.length; index++) {
      if (parents.children[index].id !== id) {
        parents.children[index].classList.remove("active");
        parents.children[index].children[1].classList.remove("in");
      }
    }
    setTimeout(() => {
      if (activeMenu) {
        activeMenu.classList.toggle("active");
        activeMenu.children[1].classList.toggle("in");
      }
    }, 10);
  }

  render() {
    const {
      addClassactive,
      addClassactiveChildAuth,
      addClassactiveChildMaps,
      themeColor,
      toggleNotification,
      toggleEqualizer,
      sideMenuTab,
      isToastMessage,
      activeKey,
      history,
    } = this.props;
    var path = window.location.pathname;
    document.body.classList.add(themeColor);

    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-btn">
              <button
                className="btn-toggle-offcanvas"
                onClick={() => {
                  this.props.onPressSideMenuToggle();
                }}
              >
                <i className="lnr lnr-menu fa fa-bars"></i>
              </button>
            </div>

            <div className="navbar-brand">
              <Link to="/dashboard">
                <img
                  src="azura-logo.png"
                  alt="Azura Logo"
                  className="img-responsive logo website-logo"
                />
              </Link>
            </div>

            <div className="navbar-right">
              {/*  <form id="navbar-search" className="navbar-form search-form">
                <input
                  className="form-control"
                  placeholder="Search here..."
                  type="text"
                />
                <button type="button" className="btn btn-default">
                  <i className="icon-magnifier"></i>
                </button>
              </form>*/}

              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  {/*    <li>
                    <a
                      href="filedocuments"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="fa fa-folder-open-o"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="appcalendar"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="icon-calendar"></i>
                    </a>
                  </li>
                  <li>
                    <a href="appchat" className="icon-menu d-none d-sm-block">
                      <i className="icon-bubbles"></i>
                    </a>
            </li>
                  <li>
                    <a href="appinbox" className="icon-menu d-none d-sm-block">
                      <i className="icon-envelope"></i>
                      <span className="notification-dot"></span>
                    </a>
                  </li>*/}
                  <li
                    className={
                      toggleNotification ? "show dropdown" : "dropdown"
                    }
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressNotification();
                      }}
                    >
                      <i className="icon-bell"></i>
                      <span className="notification-dot"></span>
                    </a>
                    <ul
                      className={
                        toggleNotification
                          ? "dropdown-menu notifications show"
                          : "dropdown-menu notifications"
                      }
                    >
                      <li className="header">
                        <strong>You have 4 new Notifications</strong>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-warning"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Campaign <strong>Holiday Sale</strong> is nearly
                                reach budget limit.
                              </p>
                              <span className="timestamp">10:00 AM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-like text-success"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Your New Campaign <strong>Holiday Sale</strong>{" "}
                                is approved.
                              </p>
                              <span className="timestamp">11:30 AM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-pie-chart text-info"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Website visits from Twitter is 27% higher than
                                last week.
                              </p>
                              <span className="timestamp">04:00 PM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-danger"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Error on website analytics configurations
                              </p>
                              <span className="timestamp">Yesterday</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer">
                        <a className="more">See all notifications</a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={toggleEqualizer ? "show dropdown" : "dropdown"}
                  >
                    {/* <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressEqualizer();
                      }}
                    >
                      <i className="icon-equalizer"></i>
                    </a>*/}
                    <ul
                      className={
                        toggleEqualizer
                          ? "dropdown-menu user-menu menu-icon show"
                          : "dropdown-menu user-menu menu-icon"
                      }
                    >
                      <li className="menu-heading">ACCOUNT SETTINGS</li>
                      <li>
                        <a>
                          <i className="icon-note"></i> <span>Basic</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-equalizer"></i>{" "}
                          <span>Preferences</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-lock"></i> <span>Privacy</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-bell"></i>{" "}
                          <span>Notifications</span>
                        </a>
                      </li>
                      <li className="menu-heading">BILLING</li>
                      <li>
                        <a>
                          <i className="icon-credit-card"></i>{" "}
                          <span>Payments</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-printer"></i> <span>Invoices</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-refresh"></i> <span>Renewals</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <LogOut propData={this.props} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
          <div className="sidebar-scroll">
            <div className="user-account d-flex align-items-center">
              <img
                src="user2.jpg"
                className="rounded-circle user-photo"
                alt="User Profile Picture"
              />
              <Dropdown>
                {/* <span style={{ display: "flex", marginTop: "10px" }}>
                  {localStorage.getItem("name")}
                </span> */}
                <Dropdown.Toggle
                  variant="none"
                  as="a"
                  id="dropdown-basic"
                  className="user-name"
                  style={{ cursor: "pointer" }}
                >
                  <strong>{this.props.user?.data.name}</strong>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-right account">
                  {/* <Dropdown.Item> */}
                  {this.props.user?.data.role === "SUPER_ADMIN" ? (
                    <Dropdown.Item onClick={() => history.push(`/profile`)}>
                      {/* <Link to="profile"> */}
                      <i className="icon-user"></i> <span>My Profile</span>
                      {/* </Link> */}
                    </Dropdown.Item>
                  ) : null}
                  {this.props.user?.data.role == "COMPANY_ADMIN" ? (
                    <Dropdown.Item
                      onClick={() => history.push(`/company-profile`)}
                    >
                      {/* <Link to="company-profile"> */}
                      <i className="icon-user"></i>My Profile
                      {/* </Link> */}
                    </Dropdown.Item>
                  ) : null}
                  {this.props.user?.data.role == "RETAILER_ADMIN" ? (
                    <Dropdown.Item
                      onClick={() => history.push(`/retailer-profile`)}
                    >
                      {/* <Link to="retailer-profile"> */}
                      <i className="icon-user"></i>My Profile
                      {/* </Link> */}
                    </Dropdown.Item>
                  ) : null}
                  {/* </Dropdown.Item> */}
                  <li className="divider"></li>
                  <Dropdown.Item onClick={this.logoutHandler}>
                    {" "}
                    <i className="icon-power"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <hr />
              {/* <ul className="row list-unstyled">
                <li className="col-4">
                  <small>Sales</small>
                  <h6>456</h6>
                </li>
                <li className="col-4">
                  <small>Order</small>
                  <h6>1350</h6>
                </li>
                <li className="col-4">
                  <small>Revenue</small>
                  <h6>$2.13B</h6>
                </li>
                    </ul>*/}
            </div>
            <Nav id="left-sidebar-nav" className="sidebar-nav">
              <ul id="main-menu" className="metismenu">
                <li className="" id="dashboardDropDown">
                  <a
                    href="#!"
                    className=""
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("dashboardDropDown");
                    }}
                  ></a>
                  <ul>
                    <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="dashboard" className="dashboard">
                        {" "}
                        <div className="row">
                          <div className="col-3">
                            <i
                              className="icon-home"
                              style={{ margin: "-43px", content: "" }}
                            ></i>
                          </div>
                          <div>
                            <span style={{ margin: "-37px", color: "#17191c" }}>
                              Dashboard
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </li>

                {this.props.user?.data.role !== "RETAILER_USER" ? (
                  <li
                    className={
                      this.manageDropdown.includes(this.props.location.pathname)
                        ? "active"
                        : null
                    }
                    id="dataInsertDropDown"
                  >
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        this.activeMenutabContainer("dataInsertDropDown");
                      }}
                    >
                      <i className="icon-plus"></i> <span>Manage</span>
                    </a>
                    <ul
                      className={
                        this.manageDropdown.includes(
                          this.props.location.pathname
                        )
                          ? "in collapse"
                          : "collapse"
                      }
                    >
                      {this.props.user?.data.role == "SUPER_ADMIN" ||
                      this.props.user?.data.role == "COMPANY_ADMIN" ? (
                        <li
                          className={activeKey === "dashboard" ? "active" : ""}
                        >
                          <Link to="company">Company</Link>
                        </li>
                      ) : null}
                      {this.props.user?.data.role == "SUPER_ADMIN" ||
                      this.props.user?.data.role == "COMPANY_ADMIN" ||
                      this.props.user?.data.role == "RETAILER_ADMIN" ? (
                        <li
                          className={activeKey === "dashboard" ? "active" : ""}
                        >
                          <Link
                            to="retailer"
                            onClick={() => {
                              localStorage.removeItem("supplierSettingId");
                              localStorage.removeItem("selectedSupplierName");
                              localStorage.removeItem("marketPlaceSettingId");
                              localStorage.removeItem("marketPlaceSettingName");
                              localStorage.removeItem("retailerIntegrationId");
                              localStorage.removeItem("newlyAddedRetailer");
                            }}
                          >
                            Retailer
                          </Link>
                        </li>
                      ) : null}
                      <li className={activeKey === "dashboard" ? "active" : ""}>
                        <Link to="user">User</Link>
                      </li>
                    </ul>
                  </li>
                ) : null}
                <li className="" id="dataInsertDropDown1">
                  <a
                    href="#!"
                    className="has-arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("dataInsertDropDown1");
                    }}
                  >
                    <i className="icon-plus"></i> <span>Integration</span>
                  </a>
                  <ul className="collapse">
                    {this.props.user?.data.role == "SUPER_ADMIN" ? (
                      <li className={activeKey === "dashboard" ? "active" : ""}>
                        <Link
                          to="integration"
                          onClick={() => {
                            localStorage.removeItem("supplierId");
                            localStorage.removeItem("supplierName");
                            localStorage.removeItem("selectedOption");
                            localStorage.removeItem("marketPlaceId");
                            localStorage.removeItem("marketPlaceName");
                            localStorage.removeItem("integratorId");
                            localStorage.removeItem("integratorName");
                          }}
                        >
                          Manage Integration
                        </Link>
                      </li>
                    ) : null}
                    {/* {this.props.user?.data.role == "SUPER_ADMIN" ? (
                      <li
                        className={activeKey === "dashboard" ? "active" : ""}
                        onClick={() => {
                          localStorage.removeItem("supplierId");
                          localStorage.removeItem("supplierName");
                          localStorage.removeItem("selectedOption");
                        }}
                      >
                        <Link to="supplier">Supplier</Link>
                      </li>
                    ) : null}
                    {this.props.user?.data.role == "SUPER_ADMIN" ? (
                      <li
                        className={activeKey === "dashboard" ? "active" : ""}
                        onClick={() => {
                          localStorage.removeItem("marketPlaceId");
                          localStorage.removeItem("marketPlaceName");
                        }}
                      >
                        <Link to="market-place">Market Place</Link>
                      </li>
                    ) : null}
                    {this.props.user?.data.role == "SUPER_ADMIN" ? (
                      <li
                        className={activeKey === "dashboard" ? "active" : ""}
                        onClick={() => {
                          localStorage.removeItem("integratorId");
                          localStorage.removeItem("integratorName");
                        }}
                      >
                        <Link to="integrator">Integrator</Link>
                      </li>
                    ) : null} */}
                  </ul>
                </li>

                <li className="" id="productDropDown">
                  <a
                    href="#!"
                    className="has-arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("productDropDown");
                    }}
                  >
                    <i className="icon-plus"></i> <span>Products</span>
                  </a>
                  <ul className="collapse">
                    {this.props.user?.data.role === "SUPER_ADMIN" ? (
                      <li className={activeKey === "dashboard" ? "active" : ""}>
                        <Link to="products">Products List</Link>
                      </li>
                    ) : null}
                    {this.props.user?.data.role === "SUPER_ADMIN" ? (
                      <li
                        className={activeKey === "dashboard" ? "active" : ""}
                        onClick={() => {
                          localStorage.removeItem("supplierId");
                          localStorage.removeItem("supplierName");
                        }}
                      >
                        <Link to="file-upload">File Upload</Link>
                      </li>
                    ) : null}
                  </ul>
                </li>

                {/* <li className="" id="reportDropDown">
                  <a
                    href="#!"
                    className="has-arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("reportDropDown");
                    }}
                  >
                    <i className="icon-book-open"></i> <span>Reports</span>
                  </a>
                  <ul className="collapse">
                    <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="logs">Transaction Reports</Link>
                    </li>
                  </ul>
                </li> */}
                <li className="" id="logDropDown">
                  <a
                    href="#!"
                    className="has-arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("logDropDown");
                    }}
                  >
                    <i className="icon-info"></i> <span>Logs</span>
                  </a>
                  <ul className="collapse">
                    <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="/apilogs">API Logs</Link>
                    </li>
                    {/* <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="logs">Change Logs</Link>
                    </li> */}
                  </ul>
                </li>
                {/* <li className="" id="settingsDropDown">
                  <a
                    href="#!"
                    className="has-arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.activeMenutabContainer("settingsDropDown");
                    }}
                  >
                    <i className="icon-equalizer"></i> <span>Settings</span>
                  </a>
                  <ul className="collapse">
                    <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="logs">Global Settings</Link>
                    </li>
                    <li className={activeKey === "dashboard" ? "active" : ""}>
                      <Link to="logs">My Preference</Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </Nav>

            {/* <Button
              onClick={() => this.setState({ colapsStatue: !this.state.colapsStatue })}
              aria-controls="example-collapse-text"
              aria-expanded={this.state.colapsStatue}

            >
              Staging Comoponent
            </Button> */}

            <Collapse in={this.state.colapsStatue}>
              <div id="example-collapse-text">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={
                        sideMenuTab[0] ? "nav-link active" : "nav-link"
                      }
                      data-toggle="tab"
                      onClick={() => {
                        this.props.onPressSideMenuTab(0);
                      }}
                    >
                      Menu
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        sideMenuTab[1] ? "nav-link active" : "nav-link"
                      }
                      data-toggle="tab"
                      onClick={() => {
                        this.props.onPressSideMenuTab(1);
                      }}
                    >
                      <i className="icon-book-open"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        sideMenuTab[2] ? "nav-link active" : "nav-link"
                      }
                      data-toggle="tab"
                      onClick={() => {
                        this.props.onPressSideMenuTab(2);
                      }}
                    >
                      <i className="icon-settings"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        sideMenuTab[3] ? "nav-link active" : "nav-link"
                      }
                      data-toggle="tab"
                      onClick={() => {
                        this.props.onPressSideMenuTab(3);
                      }}
                    >
                      <i className="icon-question"></i>
                    </a>
                  </li>
                </ul>
                <div className="tab-content p-l-0 p-r-0">
                  <div
                    className={
                      sideMenuTab[0] ? "tab-pane active show" : "tab-pane"
                    }
                    id="menu"
                  >
                    {/* <Nav id="left-sidebar-nav" className="sidebar-nav">
                      <ul id="main-menu" className="metismenu">
                        <li className="" id="dashboradContainer">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("dashboradContainer");
                            }}
                          >
                            <i className="icon-home"></i> <span>Dashboard</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "dashboard" ? "active" : ""
                              }
                            >
                              <Link to="dashboard">Analytical</Link>
                            </li>
                            <li
                              className={
                                activeKey === "demographic" ? "active" : ""
                              }
                            >
                              <Link to="demographic">Demographic</Link>
                            </li>
                            <li className={activeKey === "ioT" ? "active" : ""}>
                              <Link to="ioT">IoT</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="AppContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("AppContainer");
                            }}
                          >
                            <i className="icon-grid"></i> <span>App</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "appinbox" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="appinbox">Inbox</Link>
                            </li>
                            <li
                              className={
                                activeKey === "appchat" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="appchat">Chat</Link>
                            </li>
                            <li
                              className={
                                activeKey === "appcalendar" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="appcalendar">Calendar</Link>
                            </li>
                            <li
                              className={
                                activeKey === "appcontact" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="appcontact">Contact Card</Link>
                            </li>
                            <li
                              className={
                                activeKey === "apptaskbar" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="apptaskbar">Taskboard</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="FileManagerContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer(
                                "FileManagerContainer"
                              );
                            }}
                          >
                            <i className="icon-folder"></i>{" "}
                            <span>File Manager</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "filemanagerdashboard"
                                  ? "active"
                                  : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="filemanagerdashboard">Dashboard</Link>
                            </li>
                            <li
                              className={
                                activeKey === "filedocuments" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="filedocuments">Documents</Link>
                            </li>
                            <li
                              className={
                                activeKey === "filemedia" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="filemedia">Media</Link>
                            </li>
                            <li
                              className={
                                activeKey === "fileimages" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="fileimages">Images</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="BlogContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("BlogContainer");
                            }}
                          >
                            <i className="icon-globe"></i> <span>Blog</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "blognewpost" ? "active" : ""
                              }
                            >
                              <Link to="blognewpost">New Post</Link>
                            </li>
                            <li
                              className={
                                activeKey === "bloglist" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="bloglist">Blog List</Link>
                            </li>
                            <li
                              className={
                                activeKey === "blogdetails" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="blogdetails">Blog Detail</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="UIElementsContainer" className="">
                          <a
                            href="#uiElements"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer(
                                "UIElementsContainer"
                              );
                            }}
                          >
                            <i className="icon-diamond"></i>{" "}
                            <span>UI Elements</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "uitypography" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uitypography">Typography</Link>
                            </li>
                            <li
                              className={activeKey === "uitabs" ? "active" : ""}
                              onClick={() => {}}
                            >
                              <Link to="uitabs">Tabs</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uibuttons" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uibuttons">Buttons</Link>
                            </li>
                            <li
                              className={
                                activeKey === "bootstrapui" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="bootstrapui">Bootstrap UI</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uiicons" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uiicons">Icons</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uinotifications" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uinotifications">Notifications</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uicolors" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uicolors">Colors</Link>
                            </li>

                            <li
                              className={
                                activeKey === "uilistgroup" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uilistgroup">List Group</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uimediaobject" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uimediaobject">Media Object</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uimodal" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uimodal">Modals</Link>
                            </li>
                            <li
                              className={
                                activeKey === "uiprogressbar" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="uiprogressbar">Progress Bars</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="WidgetsContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("WidgetsContainer");
                            }}
                          >
                            <i className="icon-puzzle"></i> <span>Widgets</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "widgetsdata" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="widgetsdata">Data</Link>
                            </li>

                            <li
                              className={
                                activeKey === "widgetsweather" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="widgetsweather">Weather</Link>
                            </li>

                            <li
                              className={
                                activeKey === "widgetsblog" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="widgetsblog">Blog</Link>
                            </li>
                            <li
                              className={
                                activeKey === "widgetsecommers" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="widgetsecommers">eCommerce</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="AuthenticationContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer(
                                "AuthenticationContainer"
                              );
                            }}
                          >
                            <i className="icon-lock"></i>{" "}
                            <span>Authentication</span>
                          </a>
                          <ul
                            className={
                              addClassactive[6] ? "collapse in" : "collapse"
                            }
                          >
                            <li
                              className={
                                addClassactiveChildAuth[0] ? "active" : ""
                              }
                            >
                              <a href="login">Login</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[1] ? "active" : ""
                              }
                            >
                              <a href="registration">Register</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[2] ? "active" : ""
                              }
                            >
                              <a href="lockscreen">Lockscreen</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[3] ? "active" : ""
                              }
                            >
                              <a href="forgotpassword">Forgot Password</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[4] ? "active" : ""
                              }
                            >
                              <a href="page404">Page 404</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[5] ? "active" : ""
                              }
                            >
                              <a href="page403">Page 403</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[6] ? "active" : ""
                              }
                            >
                              <a href="page500">Page 500</a>
                            </li>
                            <li
                              className={
                                addClassactiveChildAuth[7] ? "active" : ""
                              }
                            >
                              <a href="page503">Page 503</a>
                            </li>
                          </ul>
                        </li>
                        <li id="PagesContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("PagesContainer");
                            }}
                          >
                            <i className="icon-docs"></i> <span>Pages</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "blankpage" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="blankpage">Blank Page</Link>{" "}
                            </li>
                            <li
                              className={
                                activeKey === "profilev1page" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="profilev1page">
                                Profile{" "}
                                <span className="badge badge-default float-right">
                                  v1
                                </span>
                              </Link>
                            </li>
                            <li
                              className={
                                activeKey === "profilev2page" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="profilev2page">
                                Profile{" "}
                                <span className="badge badge-warning float-right">
                                  v2
                                </span>
                              </Link>
                            </li>
                            <li
                              className={
                                activeKey === "imagegalleryprofile"
                                  ? "active"
                                  : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="imagegalleryprofile">
                                Image Gallery{" "}
                              </Link>{" "}
                            </li>

                            <li
                              className={
                                activeKey === "timeline" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="timeline">Timeline</Link>
                            </li>

                            <li
                              className={
                                activeKey === "pricing" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="pricing">Pricing</Link>
                            </li>
                            <li
                              className={
                                activeKey === "invoices" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="invoices">
                                Invoices
                                <span className="badge badge-default float-right">
                                  v1
                                </span>
                              </Link>
                            </li>
                            <li
                              className={
                                activeKey === "invoicesv2" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="invoicesv2">
                                Invoices{" "}
                                <span className="badge badge-warning float-right">
                                  v2
                                </span>
                              </Link>
                            </li>
                            <li
                              className={
                                activeKey === "searchresult" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="searchresult">Search Results</Link>
                            </li>
                            <li
                              className={
                                activeKey === "helperclass" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="helperclass">Helper Classes</Link>
                            </li>
                            <li
                              className={
                                activeKey === "teamsboard" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="teamsboard">Teams Board</Link>
                            </li>
                            <li
                              className={
                                activeKey === "projectslist" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="projectslist">Projects List</Link>
                            </li>
                            <li
                              className={
                                activeKey === "maintanance" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="maintanance">Maintenance</Link>
                            </li>
                            <li
                              className={
                                activeKey === "testimonials" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="testimonials">Testimonials</Link>
                            </li>
                            <li
                              className={activeKey === "faqs" ? "active" : ""}
                              onClick={() => {}}
                            >
                              <Link to="faqs">FAQ</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="FormsContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("FormsContainer");
                            }}
                          >
                            <i className="icon-pencil"></i> <span>Forms</span>
                          </a>
                          <ul className={"collapse"}>
                            <li
                              className={
                                activeKey === "formvalidation" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="formvalidation">Form Validation</Link>
                            </li>
                            <li
                              className={
                                activeKey === "basicelements" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="basicelements">Basic Elements</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="TablesContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("TablesContainer");
                            }}
                          >
                            <i className="icon-tag"></i> <span>Tables</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "tablenormal" ? "active" : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="tablenormal">Normal Tables</Link>{" "}
                            </li>
                          </ul>
                        </li>
                        <li id="chartsContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("chartsContainer");
                            }}
                          >
                            <i className="icon-bar-chart"></i>{" "}
                            <span>Charts</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={activeKey === "echart" ? "active" : ""}
                              onClick={() => {}}
                            >
                              <Link to="echart">E-chart</Link>{" "}
                            </li>
                          </ul>
                        </li>
                        <li id="MapsContainer" className="">
                          <a
                            href="#!"
                            className="has-arrow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.activeMenutabContainer("MapsContainer");
                            }}
                          >
                            <i className="icon-map"></i> <span>Maps</span>
                          </a>
                          <ul className="collapse">
                            <li
                              className={
                                activeKey === "leafletmap" ||
                                addClassactiveChildMaps[0]
                                  ? "active"
                                  : ""
                              }
                              onClick={() => {}}
                            >
                              <Link to="leafletmap">Leaflet Map</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Nav> */}
                  </div>
                  <div
                    className={
                      sideMenuTab[1]
                        ? "tab-pane p-l-15 p-r-15 show active"
                        : "tab-pane p-l-15 p-r-15"
                    }
                    id="Chat"
                  >
                    <form>
                      <div className="input-group m-b-20">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-magnifier"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                    </form>
                    <ul className="right_chat list-unstyled">
                      <li className="online">
                        <a>
                          <div className="media">
                            <img
                              className="media-object "
                              src={Avatar4}
                              alt=""
                            />
                            <div className="media-body">
                              <span className="name">Chris Fox</span>
                              <span className="message">Designer, Blogger</span>
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="online">
                        <a>
                          <div className="media">
                            <img
                              className="media-object "
                              src={Avatar5}
                              alt=""
                            />
                            <div className="media-body">
                              <span className="name">Joge Lucky</span>
                              <span className="message">Java Developer</span>
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="offline">
                        <a>
                          <div className="media">
                            <img
                              className="media-object "
                              src={Avatar2}
                              alt=""
                            />
                            <div className="media-body">
                              <span className="name">Isabella</span>
                              <span className="message">CEO, Thememakker</span>
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="offline">
                        <a>
                          <div className="media">
                            <img
                              className="media-object "
                              src={Avatar1}
                              alt=""
                            />
                            <div className="media-body">
                              <span className="name">Folisise Chosielie</span>
                              <span className="message">
                                Art director, Movie Cut
                              </span>
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="online">
                        <a>
                          <div className="media">
                            <img
                              className="media-object "
                              src={Avatar3}
                              alt=""
                            />
                            <div className="media-body">
                              <span className="name">Alexander</span>
                              <span className="message">
                                Writter, Mag Editor
                              </span>
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      sideMenuTab[2]
                        ? "tab-pane p-l-15 p-r-15 show active"
                        : "tab-pane p-l-15 p-r-15"
                    }
                    id="setting"
                  >
                    <h6>Choose Mode</h6>
                    <ul className="choose-skin list-unstyled">
                      <li
                        data-theme="white"
                        className={
                          document.body.classList.contains("full-dark")
                            ? ""
                            : "active"
                        }
                        onClick={() => {
                          this.setState({ somethi: false });
                          document.body.classList.remove("full-dark");
                        }}
                      >
                        <div className="white"></div>
                        <span>Light</span>
                      </li>
                      <li
                        data-theme="black"
                        className={
                          document.body.classList.contains("full-dark")
                            ? "active"
                            : ""
                        }
                        onClick={() => {
                          this.setState({ somethi: true });
                          document.body.classList.add("full-dark");
                        }}
                      >
                        <div className="black"></div>
                        <span>Dark</span>
                      </li>
                    </ul>
                    <hr />
                    <h6>Choose Skin</h6>
                    <ul className="choose-skin list-unstyled">
                      <li
                        data-theme="purple"
                        className={
                          themeColor === "theme-purple" ? "active" : ""
                        }
                      >
                        <div
                          className="purple"
                          onClick={() => {
                            if (themeColor !== "theme-purple") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("purple");
                          }}
                        ></div>
                        <span>Purple</span>
                      </li>
                      <li
                        data-theme="blue"
                        className={themeColor === "theme-blue" ? "active" : ""}
                      >
                        <div
                          className="blue"
                          onClick={() => {
                            if (themeColor !== "theme-blue") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("blue");
                          }}
                        ></div>
                        <span>Blue</span>
                      </li>
                      <li
                        data-theme="cyan"
                        // className="active"
                        className={themeColor === "theme-cyan" ? "active" : ""}
                      >
                        <div
                          className="cyan"
                          onClick={() => {
                            if (themeColor !== "theme-cyan") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("cyan");
                          }}
                        ></div>
                        <span>Cyan</span>
                      </li>
                      <li
                        data-theme="green"
                        className={themeColor === "theme-green" ? "active" : ""}
                      >
                        <div
                          className="green"
                          onClick={() => {
                            if (themeColor !== "theme-green") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("green");
                          }}
                        ></div>
                        <span>Green</span>
                      </li>
                      <li
                        data-theme="orange"
                        className={
                          themeColor === "theme-orange" ? "active" : ""
                        }
                      >
                        <div
                          className="orange"
                          onClick={() => {
                            if (themeColor !== "theme-orange") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("orange");
                          }}
                        ></div>
                        <span>Orange</span>
                      </li>
                      <li
                        data-theme="blush"
                        className={themeColor === "theme-blush" ? "active" : ""}
                      >
                        <div
                          className="blush"
                          onClick={() => {
                            if (themeColor !== "theme-blush") {
                              document.body.classList.remove(themeColor);
                            }
                            this.props.onPressThemeColor("blush");
                          }}
                        ></div>
                        <span>Blush</span>
                      </li>
                    </ul>
                    <hr />
                    <h6>General Settings</h6>
                    <ul className="setting-list list-unstyled">
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Report Panel Usag</span>
                        </label>
                      </li>
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Email Redirect</span>
                        </label>
                      </li>
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Notifications</span>
                        </label>
                      </li>
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Auto Updates</span>
                        </label>
                      </li>
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Offline</span>
                        </label>
                      </li>
                      <li>
                        <label className="fancy-checkbox">
                          <input type="checkbox" name="checkbox" />
                          <span>Location Permission</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      sideMenuTab[3]
                        ? "tab-pane p-l-15 p-r-15 show active"
                        : "tab-pane p-l-15 p-r-15"
                    }
                    id="question"
                  >
                    <form>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-magnifier"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                    </form>
                    <ul className="list-unstyled question">
                      <li className="menu-heading">HOW-TO</li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          How to Create Campaign
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Boost Your Sales
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Website Analytics
                        </a>
                      </li>
                      <li className="menu-heading">ACCOUNT</li>
                      <li>
                        <a
                          href="registration"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Cearet New Account
                        </a>
                      </li>
                      <li>
                        <a
                          href="forgotpassword"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Change Password?
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Privacy &amp; Policy
                        </a>
                      </li>
                      <li className="menu-heading">BILLING</li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Payment info
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Auto-Renewal
                        </a>
                      </li>
                      <li className="menu-button m-t-30">
                        <a
                          href="#!"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <i className="icon-question"></i> Need Help?
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  addClassactive: PropTypes.array.isRequired,
  addClassactiveChild: PropTypes.array.isRequired,
  addClassactiveChildApp: PropTypes.array.isRequired,
  addClassactiveChildFM: PropTypes.array.isRequired,
  addClassactiveChildBlog: PropTypes.array.isRequired,
  addClassactiveChildUI: PropTypes.array.isRequired,
  addClassactiveChildWidgets: PropTypes.array.isRequired,
  addClassactiveChildAuth: PropTypes.array.isRequired,
  addClassactiveChildPages: PropTypes.array.isRequired,
  addClassactiveChildForms: PropTypes.array.isRequired,
  addClassactiveChildTables: PropTypes.array.isRequired,
  addClassactiveChildChart: PropTypes.array.isRequired,
  addClassactiveChildMaps: PropTypes.array.isRequired,
  themeColor: PropTypes.string.isRequired,
  generalSetting: PropTypes.array.isRequired,
  toggleNotification: PropTypes.bool.isRequired,
  toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer, loginReducer }) => {
  const {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  } = navigationReducer;

  const { user } = loginReducer;

  return {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
    user,
  };
};

export default connect(mapStateToProps, {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
  onLogOut,
  onLoggedin,
  onSystemLoading,
})(withRouter(NavbarMenu));
