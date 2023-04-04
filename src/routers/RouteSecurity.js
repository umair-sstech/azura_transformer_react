import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";

const Protected = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return false;
        // return <Redirect to={`/login`} />
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return children;
};
export default Protected;