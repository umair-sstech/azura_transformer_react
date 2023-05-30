import React from "react";
import { connect } from "react-redux";
import "echarts-gl";
import Fecicon from "../../assets/images/Fevicon.png"
import AwsomeImage from "../../assets/images/blog/blog-page-4.jpg";
import AwsomeImageOt from "../../assets/images/blog/blog-page-2.jpg";
import PageHeader from "../../components/PageHeader";
import {
  saleGaugeOption,
  sparkleCardData,
} from "../../Data/DashbordData";
import {
  toggleMenuArrow,
  onPressTopProductDropDown,
  loadSparcleCard,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
} from "../../actions";
import SparkleCard from "../../components/SparkleCard";
import axios from "axios";
import { API_PATH } from "../ApiPath/Apipath";

var timer = null;
class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      loadingPage: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadDataCard();
  }

  async loadDataCard() {
    try {
      this.setState({ loadingPage: true });
      const response = await axios.get(`${API_PATH.GET_DASHBOARD_DATA}`);
      const data = response.data;

      const updatedCardData = sparkleCardData.map((card) => {
        let count;
        switch (card.heading) {
          case 'SUPPLIER':
            count = data.suppliers;
            break;
          case 'INTEGRATOR':
            count = data.integrators;
            break;
          case 'MARKETPLACE':
            count = data.MarketPlace;
            break;
          case 'PRODUCT':
            count = data.products;
            break;
          default:
            count = 0;
        }

        return {
          ...card,
          money: count,
        };
      });

      this.setState({ cardData: updatedCardData, loadingPage: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loadingPage: false });
    }
  }


  render() {
    const { cardData, loadingPage } = this.state;

    if (loadingPage) {
      return (
        <div className="page-loader-wrapper">
          <div className="loader">
            <div className="m-t-30">
              <img src={Fecicon} style={{ height: "50px"}} alt="Azura" />
            </div>
            <p>Please wait...</p>
          </div>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Dashboard"
              Breadcrumb={[{ name: "Dashboard", navigate: "#" }]}
            />
            <div className="row clearfix">
            {cardData.map((data, i) => (
              <SparkleCard
                index={i}
                key={data.heading}
                Heading={data.heading}
                Money={data.money}
                isRandomUpdate={true}
                mainData={data.sparklineData.data}
                chartColor={data.sparklineData.areaStyle.color}
                ContainerClass="col-lg-3 col-md-6 col-sm-6"
              />
            ))}
            </div>

          {/*  <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card">
                  <div className="header">  
                    <h2>Lucid Activities</h2>
                  </div>
                  <div className="body">
                    <div
                      className="timeline-item green"
                      date-is="20-04-2018 - Today"
                    >
                      <h5>
                        Hello, 'Im a single div responsive timeline without
                        media Queries!
                      </h5>
                      <span>
                        <a>Elisse Joson</a> San Francisco, CA
                      </span>
                      <div className="msg">
                        <p>
                          I'm speaking with myself, number one, because I have a
                          very good brain and I've said a lot of things. I write
                          the best placeholder text, and I'm the biggest
                          developer on the web card she has is the Lorem card.
                        </p>
                        <a className="m-r-20">
                          <i className="icon-heart"></i> Like
                        </a>
                        <a
                          role="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <i className="icon-bubbles"></i> Comment
                        </a>
                        <div className="collapse m-t-10" id="collapseExample">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea
                                  rows="2"
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."
                                ></textarea>
                              </div>
                              <button className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="timeline-item blue"
                      date-is="19-04-2018 - Yesterday"
                    >
                      <h5>Oeehhh, that's awesome.. Me too!</h5>
                      <span>
                        <a title="">Katherine Lumaad</a> Oakland, CA
                      </span>
                      <div className="msg">
                        <p>
                          I'm speaking with myself, number one, because I have a
                          very good brain and I've said a lot of things. on the
                          web by far... While that's mock-ups and this is
                          politics, are they really so different? I think the
                          only card she has is the Lorem card.
                        </p>
                        <div className="timeline_img m-b-20">
                          <img
                            className="w-25"
                            src={AwsomeImage}
                            alt="Awesome Image"
                          />
                          <img
                            className="w-25"
                            src={AwsomeImageOt}
                            alt="Awesome Image"
                          />
                        </div>
                        <a className="m-r-20">
                          <i className="icon-heart"></i> Like
                        </a>
                        <a
                          role="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseExample1"
                        >
                          <i className="icon-bubbles"></i> Comment
                        </a>
                        <div className="collapse m-t-10" id="collapseExample1">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea
                                  rows="2"
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."
                                ></textarea>
                              </div>
                              <button className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item warning" date-is="21-02-2018">
                      <h5>
                        An Engineer Explains Why You Should Always Order the
                        Larger Pizza
                      </h5>
                      <span>
                        <a title="">Gary Camara</a> San Francisco, CA
                      </span>
                      <div className="msg">
                        <p>
                          I'm speaking with myself, number one, because I have a
                          very good brain and I've said a lot of things. I write
                          the best placeholder text, and I'm the biggest
                          developer on the web by far... While that's mock-ups
                          and this is politics, is the Lorem card.
                        </p>
                        <a className="m-r-20">
                          <i className="icon-heart"></i> Like
                        </a>
                        <a
                          role="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseExample2"
                        >
                          <i className="icon-bubbles"></i> Comment
                        </a>
                        <div className="collapse m-t-10" id="collapseExample2">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea
                                  rows="2"
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."
                                ></textarea>
                              </div>
                              <button className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                          </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer,
  navigationReducer,
  analyticalReducer,
}) => ({
  email: loginReducer.email,
  menuArrowToggle: navigationReducer.menuArrowToggle,
  sparkleCardData: analyticalReducer.sparkleCardData,
  topProductDropDown: analyticalReducer.topProductDropDown,
  referralsDropDown: analyticalReducer.referralsDropDown,
  recentChatDropDown: analyticalReducer.recentChatDropDown,
  facebookShowProgressBar: analyticalReducer.facebookShowProgressBar,
  twitterShowProgressBar: analyticalReducer.twitterShowProgressBar,
  affiliatesShowProgressBar: analyticalReducer.affiliatesShowProgressBar,
  searchShowProgressBar: analyticalReducer.searchShowProgressBar,
  loadingPage: analyticalReducer.loadingPage,
});

export default connect(mapStateToProps, {
  toggleMenuArrow,
  loadSparcleCard,
  onPressTopProductDropDown,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
})(Dashbord);
