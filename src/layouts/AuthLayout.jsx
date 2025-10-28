import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from "./../assets/authImage.png"
import ProFastLogo from '../Pages/shared/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="bg-base-200 w-11/12 mx-auto py-12">
            <Link to="/"><ProFastLogo></ProFastLogo></Link>
            <div className="hero-content flex-col lg:flex-row">
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img
                    src={authImg}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;