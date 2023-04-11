import axios from 'axios';
import { useEffect, useState } from 'react';

export const useRetailerList = () => {

    const [retailerList, setRetailerList] = useState([]);

    const getCompanies = () => {
        axios.get(`${process.env.REACT_APP_RETAILER_SERVICE}/get-retailer-list`)
            .then(res => {
                setRetailerList(res.data.retailers)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getCompanies()
    }, []);

    return retailerList
}