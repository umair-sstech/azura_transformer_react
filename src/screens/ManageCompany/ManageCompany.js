import React, { createContext, useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Tab, Tabs } from 'react-bootstrap';
import CompanyInfo from './CompanyInfo';
import CompanySocialInfo from './CompanySocialInfo';
import CompanyGeneralInfo from './CompanyGeneralInfo';
import CompanyChangelog from './CompanyChangelog';
import CompanyIntegration from './CompanyIntegration';
import axios from "axios"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import { onUpdateFormLoading } from '../../actions';
import moment from 'moment';

export const FormContext = createContext();

const ManageCompany = (props) =>
{
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState();
    const [logoData, setLogoData] = useState();
    const [isCompanyAdded, setIsCompanyAdded] = useState('');
    const [createdDate, setCreatedDate] = useState("");

    const history = useHistory()

    useEffect(() => {
        const id = localStorage.getItem("newlyAddedCompany")
        if (id) {
            props.onUpdateFormLoading(true)
            setIsCompanyAdded(id)
            axios.get(`${process.env.REACT_APP_COMPANY_SERVICE}/company-by-Id/${id}`)
                .then(res => {
                    const data = res.data.companyData
                    setFormData(data)
                    props.onUpdateFormLoading(false)
                    setCreatedDate(data.created_on)
                })
                .catch(e => {
                    toast.error(e.response.data.message || "Something went wrong")
                    setFormData()
                    setIsCompanyAdded('')
                    localStorage.removeItem("newlyAddedCompany")
                    props.onUpdateFormLoading(false)
                })
        }
    }, []);

    useEffect(() => () => {
        setFormData()
        setLogoData()
        setIsCompanyAdded('')
        localStorage.removeItem("newlyAddedCompany")
    }, []);

    const processCancel = () => {
        setFormData()
        setLogoData()
        setIsCompanyAdded('')
        localStorage.removeItem("newlyAddedCompany")
        history.push('/company')
    }

    return (
        <>
            <div
                style={{ flex: 1 }}
                onClick={() => {
                    document.body.classList.remove("offcanvas-active");
                }}
            >
                <div>

                    <div className="container-fluid">
                        <PageHeader
                            HeaderText={isCompanyAdded ? "Company Update" : "Company Add"}
                            Breadcrumb={[
                                { name: "Manage", navigate: "#" },
                                { name: "Company List", navigate: "/company" },
                                { name: isCompanyAdded ? "Company Update" : "Company Add", navigate: "#" },
                            ]}
                        />
                        <div className='tab-component'>
                            <div className='card'>
                                <div className='body'>
                                    {props.updateFormLoading ? <div className='loader-wrapper' >
                                        <i className="fa fa-refresh fa-spin"></i>
                                    </div> : null}
                                    {createdDate ? <div className='date-wrapper' style={{ textAlign: "right" }}>
                                        <span>Created on: {moment(createdDate).format("MM/DD/YYYY hh:mm a")}</span>
                                    </div> : null}
                                    <FormContext.Provider value={{
                                        setIsCompanyAdded,
                                        isCompanyAdded,
                                        activeStepIndex,
                                        setActiveStepIndex,
                                        formData,
                                        setFormData,
                                        setLogoData,
                                        logoData,
                                        processCancel,
                                    }}>
                                        <Tabs defaultActiveKey="companyInformation">
                                            <Tab eventKey="companyInformation" title="Company Information">
                                                <CompanyInfo initData={formData} />
                                            </Tab>
                                            <Tab eventKey="mediaSocial" title="Media / Social" disabled={isCompanyAdded ? false : true}>
                                                <CompanySocialInfo initData={formData} />
                                            </Tab>
                                            <Tab eventKey="general" title="General" disabled={isCompanyAdded ? false : true}>
                                                <CompanyGeneralInfo />
                                            </Tab>
                                            <Tab eventKey="integration" title="Integration" disabled={isCompanyAdded ? false : true}>
                                                <CompanyIntegration />
                                            </Tab>
                                            <Tab eventKey="changeLog" title="Change Log" disabled={isCompanyAdded ? false : true}>
                                                <CompanyChangelog />
                                            </Tab>
                                        </Tabs>
                                    </FormContext.Provider>
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
    updateFormLoading: LoadingReducer.updateFormLoading
});
export default connect(mapStateToProps, { onUpdateFormLoading })(ManageCompany);
