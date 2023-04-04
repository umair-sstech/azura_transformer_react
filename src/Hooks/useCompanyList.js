import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCompanyList = (role) =>
{
    const [companyList, setCompanyList] = useState([]);

    const getCompanies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/company/get-company-list`)
            .then(res => {
                setCompanyList(res.data.companies)
            })
            .catch(e => console.log(e))
    }

    useEffect(() =>
    {
        if (role === "SUPER_ADMIN") {
            getCompanies()
        }
    }, [role]);

    return companyList
}