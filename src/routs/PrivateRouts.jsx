import React from 'react';
import useInfo from '../hooks/useInfo';
import { Navigate, useLocation } from 'react-router';

const PrivateRouts = ({children}) => {
    const location = useLocation()
    console.log(location);
    const {user,loading} = useInfo()
    if(loading){
        return <div className='flex items-center justify-center h-screen'><span className="loading loading-bars loading-xl"></span></div>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRouts;