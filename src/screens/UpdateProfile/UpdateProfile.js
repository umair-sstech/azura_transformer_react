import axios from 'axios';
import { Tab } from 'bootstrap';
import React, { createContext, useEffect, useState } from 'react';
import { Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import UpdateInfo from './UpdateInfo';
import UpdateSocialInfo from './UpdateSocialInfo';

export const FormContext = createContext();

const UpdateProfile = (props) =>
{

    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState();
    const [logoData, setLogoData] = useState();
    const [isCompanyAdded, setIsCompanyAdded] = useState('');

    const history = useHistory();

    useEffect(() =>
    {
        const id = props.user?.data.company
        if (id) {
            setIsCompanyAdded(id)
            axios.get(`${process.env.REACT_APP_COMPANY_SERVICE}/company-by-Id/${id}`)
                .then(res =>
                {
                    const data = res.data.companyData
                    setFormData(data)
                })
                .catch(e =>
                {
                    toast.error(e.response.data.message || "Something went wrong")
                    setFormData()
                    setIsCompanyAdded('')
                    localStorage.removeItem("newlyAddedCompany")
                })
        }
    }, [props]);

    useEffect(() => () =>
    {
        processCancel()
    }, []);

    const processCancel = () =>
    {
        setFormData()
        setLogoData()
        setIsCompanyAdded('')
        localStorage.removeItem("newlyAddedCompany")
        history.push('/company')
    }
    return (
        <div
            style={{ flex: 1 }}
            onClick={() =>
            {
                document.body.classList.remove("offcanvas-active");
            }}
        >
            <div>

                <div className="container-fluid">
                    <PageHeader
                        HeaderText={"Profile"}
                        Breadcrumb={[
                            { name: "Profile Update", navigate: "" },
                        ]}
                    />
                    <div className='tab-component'>
                        <div className='card'>
                            <div className='body'>
                                <FormContext.Provider value={{
                                    setIsCompanyAdded,
                                    isCompanyAdded,
                                    activeStepIndex,
                                    setActiveStepIndex,
                                    formData,
                                    setFormData,
                                    setLogoData,
                                    logoData,
                                    processCancel
                                }}>
                                    <Tabs defaultActiveKey="companyInformation">
                                        <Tab eventKey="companyInformation" title="Company Information">
                                            <UpdateInfo initData={formData} />
                                        </Tab>
                                        <Tab eventKey="mediaSocial" title="Media / Social">
                                            <UpdateSocialInfo initData={formData} />
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

const mapStateToProps = ({ loginReducer }) => ({
    user: loginReducer.user
});

export default connect(mapStateToProps)(UpdateProfile);
