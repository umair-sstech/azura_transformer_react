import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu";
import Page404 from "./screens/Auth/Page404";
import { onLoggedin, getUser } from "./actions";
import Private404 from "./screens/private404/Private404";
import Protected from "./routers/RouteSecurity";
import Dashbord from "./screens/Dashbord/Dashbord";
import Login from "./screens/Login";
import demographic from "./screens/Dashbord/Demographic";
import ioT from "./screens/Dashbord/IoT";
import appInbox from "./screens/App/Inbox";
import appChat from "./screens/App/Chat";
import appCalendar from "./screens/App/Calendar";
import appContact from "./screens/App/Contact";
import appTaskbar from "./screens/App/Taskbar";
import filemanagerdashboard from "./screens/FileManager/Dashboard";
import filedocuments from "./screens/FileManager/Documents";
import filemedia from "./screens/FileManager/Media";
import fileimages from "./screens/FileManager/Images";
import blognewPost from "./screens/Blog/NewPost";
import blogdetails from "./screens/Blog/BlogDetails";
import bloglist from "./screens/Blog/BlogList";
import uitypography from "./screens/UIElements/Typography";
import uitabs from "./screens/UIElements/Tabs";
import uibuttons from "./screens/UIElements/Button";
import bootstrapui from "./screens/UIElements/BootstrapUI";
import uiicons from "./screens/UIElements/Icons";
import uinotifications from "./screens/UIElements/Notifications";
import uicolors from "./screens/UIElements/Colors";
import uilistgroup from "./screens/UIElements/ListGroup";
import uimediaobject from "./screens/UIElements/MediaObject";
import uimodal from "./screens/UIElements/Modals";
import uiprogressbar from "./screens/UIElements/ProgressBar";
import widgetsdata from "./screens/Widgets/Data";
import widgetsweather from "./screens/Widgets/Weather";
import widgetsblog from "./screens/Widgets/Blog";
import widgetsecommers from "./screens/Widgets/ECommers";
import registration from "./screens/Auth/Registration";
import lockscreen from "./screens/Auth/Lockscreen";
import forgotpassword from "./screens/Auth/ForgotPassword";
import page404 from "./screens/Auth/Page404";
import page403 from "./screens/Auth/Page403";
import page500 from "./screens/Auth/Page500";
import page503 from "./screens/Auth/Page503";
import blankpage from "./screens/Pages/BlankPage";
import profilev1page from "./screens/Pages/ProfileV1";
import profilev2page from "./screens/Pages/ProfileV2";
import imagegalleryprofile from "./screens/Pages/ImageGallery";
import timeline from "./screens/Pages/TimeLine";
import pricing from "./screens/Pages/Pricing";
import invoices from "./screens/Pages/Invoices";
import invoicesv2 from "./screens/Pages/InvoicesV2";
import searchresult from "./screens/Pages/SearchResults";
import helperclass from "./screens/Pages/HelperClass";
import teamsboard from "./screens/Pages/TeamsBoard";
import projectslist from "./screens/Pages/ProjectsList";
import maintanance from "./screens/Pages/Maintanance";
import testimonials from "./screens/Pages/Testimonials";
import faqs from "./screens/Pages/Faqs";
import formvalidation from "./screens/Forms/FormValidation";
import basicelements from "./screens/Forms/BasicElements";
import tablenormal from "./screens/Tables/TableNormal";
import echart from "./screens/Charts/Echart";
import leafletmap from "./screens/Maps/GoogleMaps";
import ManageCompany from "./screens/ManageCompany/ManageCompany";
import ResetPassword from "./screens/Auth/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CompanyList from "./screens/CompanyList/CompanyList";
import RetailerList from "./screens/RetailerList/RetailerList";
import ManageRetailer from "./screens/ManageRetailer/ManageRetailer";
import UserList from "./screens/userList/UserList";
import ManageUser from "./screens/ManageUser/ManageUser";
import ManageUserPermission from "./screens/ManageUser/ManageUserPermission";
import PublicRoute from "./routers/PublicRoute";
import UpdateProfile from "./screens/UpdateProfile/UpdateProfile";
import RetailerProfile from "./screens/RetailerProfile/RetailerProfile";
import SupplierList from "./screens/SuppilerList/SuppilerList";
import ManageSuppiler from "./screens/ManageSuppiler/ManageSuppiler";
import IntegrationType from "./screens/Integrations/IntegrationType";
import ManageMarketPlace from "./screens/ManageMarketPlace/ManageMarketPlace";
import MarketPlaceList from "./screens/ManageMarketPlace/MarketPlaceList";
import IntegratorList from "./screens/ManageIntegrator/IntegratorList";
import ManageIntegrator from "./screens/ManageIntegrator/ManageIntegrator";
import ManageRetailerSetting from "./screens/ManageRetailer/ManageRetailerSetting";
import ProductsList from "./screens/products/ProductsList";
import FileUpload from "./screens/products/FileUpload";
import ManageProduct from "./screens/ManageProduct/ManageProduct";
window.__DEV__ = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
    };
    const token = localStorage.getItem("token");
    if (token) {
      this.props.onLoggedin(true);
      this.props.getUser(token);
    } else {
      this.props.onLoggedin(false);
    }
  }
  render() {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? res : "/";
    const activeKey1 = res;

    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div
          className="page-loader-wrapper"
          style={{ display: this.props.systemLoading ? "block" : "none" }}
        >
          <div className="loader">
            <div className="m-t-30">
              <img
                src={require("./assets/images/logo-icon.svg")}
                width="48"
                height="48"
                alt="Lucid"
              />
            </div>
            <p>Please wait...</p>
          </div>
        </div>
        <PublicRoute>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route exact path={`/forgotpassword`} component={forgotpassword} />
            <Route path={`/reset-password`} component={ResetPassword} />
            <Route exact path={`/page404`} component={page404} />
            <Route exact path={`/page403`} component={page403} />
            <Route exact path={`/page500`} component={page500} />
            <Route exact path={`/page503`} component={page503} />
            <Route exact path={`/lockscreen`} component={lockscreen} />
            <Route exact path={`/maintanance`} component={maintanance} />
            <Route exact path="*" component={page404} />
            {/* <Route exact path={`/registration`} component={registration} /> */}
          </Switch>
        </PublicRoute>

        <Switch>
          <Protected>
            <NavbarMenu />
            <div id="wrapper">
              {/* <Redirect exact from="/" to={'/dashboard'} /> */}
              <Route exact path={`/dashboard`} component={Dashbord} />
              <Route exact path={`/`} component={Dashbord} />
              <Route exact path={`/demographic`} component={demographic} />
              <Route exact path={`/ioT`} component={ioT} />
              <Route exact path={`/appinbox`} component={appInbox} />
              <Route exact path={`/appchat`} component={appChat} />
              <Route exact path={`/appcalendar`} component={appCalendar} />
              <Route exact path={`/appcontact`} component={appContact} />
              <Route exact path={`/apptaskbar`} component={appTaskbar} />
              <Route
                exact
                path={`/filemanagerdashboard`}
                component={filemanagerdashboard}
              />
              <Route exact path={`/filedocuments`} component={filedocuments} />
              <Route exact path={`/filemedia`} component={filemedia} />
              <Route exact path={`/fileimages`} component={fileimages} />
              <Route exact path={`/blognewpost`} component={blognewPost} />
              <Route exact path={`/blogdetails`} component={blogdetails} />
              <Route exact path={`/bloglist`} component={bloglist} />
              <Route exact path={`/uitypography`} component={uitypography} />
              <Route exact path={`/uitabs`} component={uitabs} />
              <Route exact path={`/bootstrapui`} component={bootstrapui} />
              <Route exact path={`/uiicons`} component={uiicons} />
              <Route
                exact
                path={`/uinotifications`}
                component={uinotifications}
              />
              <Route exact path={`/uicolors`} component={uicolors} />
              <Route exact path={`/uilistgroup`} component={uilistgroup} />
              <Route exact path={`/uimediaobject`} component={uimediaobject} />
              <Route exact path={`/uimodal`} component={uimodal} />
              <Route exact path={`/uibuttons`} component={uibuttons} />
              <Route exact path={`/uiprogressbar`} component={uiprogressbar} />
              <Route exact path={`/widgetsdata`} component={widgetsdata} />
              <Route
                exact
                path={`/widgetsweather`}
                component={widgetsweather}
              />
              <Route exact path={`/widgetsblog`} component={widgetsblog} />
              <Route
                exact
                path={`/widgetsecommers`}
                component={widgetsecommers}
              />
              <Route exact path={`/blankpage`} component={blankpage} />
              <Route exact path={`/profilev1page`} component={profilev1page} />
              <Route exact path={`/profilev2page`} component={profilev2page} />
              <Route
                exact
                path={`/imagegalleryprofile`}
                component={imagegalleryprofile}
              />
              <Route exact path={`/timeline`} component={timeline} />
              <Route exact path={`/pricing`} component={pricing} />
              <Route exact path={`/invoices`} component={invoices} />
              <Route exact path={`/invoicesv2`} component={invoicesv2} />
              <Route exact path={`/searchresult`} component={searchresult} />
              <Route exact path={`/helperclass`} component={helperclass} />
              <Route exact path={`/teamsboard`} component={teamsboard} />
              <Route exact path={`/projectslist`} component={projectslist} />
              <Route exact path={`/testimonials`} component={testimonials} />
              <Route exact path={`/faqs`} component={faqs} />
              <Route
                exact
                path={`/formvalidation`}
                component={formvalidation}
              />
              <Route exact path={`/basicelements`} component={basicelements} />
              <Route exact path={`/tablenormal`} component={tablenormal} />
              <Route exact path={`/echart`} component={echart} />
              <Route exact path={`/leafletmap`} component={leafletmap} />
              <Route
                exact
                path={`/company-profile`}
                component={UpdateProfile}
              />
              <Route
                exact
                path={`/retailer-profile`}
                component={RetailerProfile}
              />
              {this.props.user?.data.role == "SUPER_ADMIN" ? (
                <>
                  <Route exact path={`/company`} component={CompanyList} />
                  <Route
                    exact
                    path={`/manage-company`}
                    component={ManageCompany}
                  />
                </>
              ) : null}

              {this.props.user?.data.role == "SUPER_ADMIN" ||
              this.props.user?.data.role == "COMPANY_ADMIN" ? (
                <>
                  <Route exact path={`/retailer`} component={RetailerList} />
                  {this.props.user?.permissions.update_retailer ||
                  this.props.user?.permissions.add_retailer ? (
                    <>
                    <Route
                    exact
                    path={`/manage-retailer`}
                    component={ManageRetailer}
                  />
                  <Route
                  exact
                  path={`/setting-retailer`}
                  component={ManageRetailerSetting}
                />
                    </>
                   
                  ) : null}
                </>
              ) : null}

              {this.props.user?.data.role == "SUPER_ADMIN" ||
              this.props.user?.data.role == "COMPANY_ADMIN" ||
              this.props.user?.data.role == "RETAILER_ADMIN" ? (
                <>
                  <Route exact path={`/user`} component={UserList} />
                  {this.props.user?.permissions.update_retailer ||
                  this.props.user?.permissions.add_retailer ? (
                    <Route exact path={`/manage-user`} component={ManageUser} />
                  ) : null}
                  {this.props.user?.permissions.update_user ? (
                    <Route
                      exact
                      path={`/user-permission`}
                      component={ManageUserPermission}
                    />
                  ) : null}
                </>
              ) : null}
              {this.props.user?.data.role == "SUPER_ADMIN" ? (
                <>
                  <Route
                    exact
                    path={`/integration`}
                    component={IntegrationType}
                  />
                </>
              ) : null}
              {this.props.user?.data.role == "SUPER_ADMIN" ? (
                <>
                  <Route exact path={`/supplier`} component={SupplierList} />
                  <Route
                    exact
                    path={`/manage-suppiler`}
                    component={ManageSuppiler}
                  />
                </>
                ) : null}
              
              {this.props.user?.data.role == "SUPER_ADMIN" ? (
                <>
                  <Route
                    exact
                    path={`/market-place`}
                    component={MarketPlaceList}
                  />
                  <Route
                    exact
                    path={`/manage-marketPlace`}
                    component={ManageMarketPlace}
                  />
                </>
              ) : null}
              {this.props.user?.data.role == "SUPER_ADMIN" ? (
                <>
                  <Route exact path={`/integrator`} component={IntegratorList} />
                  <Route exact path={`/manage-integrator`} component={ManageIntegrator} />

                </>
              ) : null}

              {this.props.user?.data.role === "SUPER_ADMIN" ? (
                <>
                  <Route exact path={`/products`} component={ProductsList} />
                  <Route exact path={`/product-details`} component={ManageProduct}/>
                  <Route exact path={`/file-upload`} component={FileUpload} />

                </>
              ) : null}
            </div>
          </Protected>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ loginReducer, LoadingReducer }) => ({
  isLoggedin: loginReducer.isLoggedin,
  user: loginReducer.user,
  systemLoading: LoadingReducer.systemLoading,
});

export default withRouter(
  connect(mapStateToProps, { onLoggedin, getUser })(App)
);
