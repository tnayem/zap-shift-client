import React from 'react';
import useInfo from '../hooks/useInfo';
import { Navigate, useLocation } from 'react-router';

const PrivateRouts = ({children}) => {
    const location = useLocation()
    console.log(location);
    const {user,loading} = useInfo()
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRouts;