import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

const PublicRoute = ({children}) => {
    const token = localStorage.getItem('token')

    if(token){
        return false;
        // return <Redirect to={`/dashboard`} />
    }

    axios.defaults.headers.common['Authorization'] = ""

    return children;
    
}

export default PublicRoute;
