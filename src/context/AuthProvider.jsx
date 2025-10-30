import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const[user,setUser] = useState(null)
    const[loading,setLoading]=useState(true)
    // Declare Provider 
    const googleProvider = new GoogleAuthProvider();
    // Google Sign Up 
    const googleSignUp =()=>{
       return signInWithPopup(auth,googleProvider)
    }
    // Create User With email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login 
    const login = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // Sign Out
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    
    // Observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            console.log(currentUser);
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
        googleSignUp,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;