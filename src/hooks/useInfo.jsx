import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const useInfo = () => {
    const authInfo = use(AuthContext)
    return authInfo;
};

export default useInfo;