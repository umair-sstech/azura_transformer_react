import React, { createContext, useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Tab, Tabs } from 'react-bootstrap';
import axios from "axios"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom"
import RetailerInfo from './RetailerInfo';
import RetailerSocialInfo from './RetailerSocialInfo';
import RetailerGeneralInfo from './RetailerGeneralInfo';
import RetailerIntegration from './RetailerIntegration';
import RetailerChangeLog from './RetailerChangeLog';
import { connect } from 'react-redux';
import { onUpdateFormLoading } from '../../actions';

export const FormContext = createContext();

const ManageRetailer = (props) =>
{
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState();
    const [logoData, setLogoData] = useState();
    const [isRetailerAdded, setIsRetailerAdded] = useState('');

    const history = useHistory()


    useEffect(() => {
        const id = localStorage.getItem("newlyAddedRetailer")
        if (id) {
            props.onUpdateFormLoading(true)
            setIsRetailerAdded(id)
            axios.get(`${process.env.REACT_APP_API_URL}/retailer/retailer-by-Id/${id}`)
                .then(res => {
                    const data = res.data.retailerData
                    setFormData(data)
                    props.onUpdateFormLoading(false)
                })
                .catch(e => {
                    toast.error(e.response.data.message || "Something went wrong")
                    setFormData()
                    setIsRetailerAdded('')
                    localStorage.removeItem("newlyAddedRetailer")
                    props.onUpdateFormLoading(false)
                })
        }
    }, []);

    useEffect(() => () => {
        setFormData()
        setLogoData()
        setIsRetailerAdded('')
        localStorage.removeItem("newlyAddedRetailer")
    }, []);

    const processCancel = () => {
        setFormData()
        setLogoData()
        setIsRetailerAdded('')
        localStorage.removeItem("newlyAddedRetailer")
        history.push('/retailer')
    }


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
                        HeaderText={isRetailerAdded ? "Retailer Edit" : "Retailer Add"}
                        Breadcrumb={[
                            { name: "Manage", navigate: "" },
                            { name: "Retailer List", navigate: "" },
                            { name: isRetailerAdded ? "Retailer Edit" : "Retailer Add", navigate: "" },
                        ]}
                    />
                    <div className='tab-component'>
                        <div className='card'>
                            <div className='body'>
                                {props.updateFormLoading ? <div className='loader-wrapper' >
                                    <i className="fa fa-refresh fa-spin"></i>
                                </div> : null}
                                <FormContext.Provider value={{
                                    setIsRetailerAdded,
                                    isRetailerAdded,
                                    activeStepIndex,
                                    setActiveStepIndex,
                                    formData,
                                    setFormData,
                                    setLogoData,
                                    logoData,
                                    processCancel
                                }}>
                                    <Tabs defaultActiveKey="profile">
                                        <Tab eventKey="profile" title="Profile">
                                            <RetailerInfo />
                                        </Tab>
                                        <Tab eventKey="mediaSocial" title="Media / Social" disabled={isRetailerAdded ? false : true}>
                                            <RetailerSocialInfo />
                                        </Tab>
                                        <Tab eventKey="general" title="General" disabled={isRetailerAdded ? false : true}>
                                            <RetailerGeneralInfo />
                                        </Tab>
                                        <Tab eventKey="integration" title="Integration" disabled={isRetailerAdded ? false : true}>
                                            <RetailerIntegration />
                                        </Tab>
                                        <Tab eventKey="changeLog" title="Change Log" disabled={isRetailerAdded ? false : true}>
                                            <RetailerChangeLog />
                                        </Tab>
                                    </Tabs>
                                </FormContext.Provider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({ LoadingReducer }) => ({
    updateFormLoading: LoadingReducer.updateFormLoading
});
export default connect(mapStateToProps, { onUpdateFormLoading })(ManageRetailer);
