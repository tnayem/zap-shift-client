import React from 'react';
import logo from "./../../assets/logo.png"

const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-3xl -ms-4 font-extrabold text-[#303030]'>Profast</p>
        </div>
    );
};

export default ProFastLogo;