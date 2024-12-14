import React from "react";

const authDetails = {
    token : null,
    user : null,
    handleLoginThroughModal : (username, password, setUsername, setPassword, setHelperText, setLoginModalOpen)=> {},
    handleLogout : ()=>{},
    anonymousAuthSessionId: null,
    handleSignupThroughModal : (signupRequest, setSuccess, setErrorMessage, setModalOpen, setLoading, setSignupRequest)=>{},
    handleGoogleLogin: ()=> {},
}
const AuthContext = React.createContext(authDetails);
export default AuthContext;