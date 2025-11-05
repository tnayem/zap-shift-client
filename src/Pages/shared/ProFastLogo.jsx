import React from 'react';
import logo from "./../../assets/logo.png"
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to="/" className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-3xl -ms-4 font-extrabold text-[#303030]'>Profast</p>
        </Link>
    );
};

export default ProFastLogo;