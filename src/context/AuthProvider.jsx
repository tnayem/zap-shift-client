import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const[user,setUser] = useState(null)
    const[loading,setLoading]=useState(true)
    // Create User With email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login 
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    // Sign Out
    const logOut = ()=>{
        return signOut(auth)
    }
    
    // Observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])
    const authInfo = {
        createUser,
        user,
        setUser,
        loading,
        login,
        logOut,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;