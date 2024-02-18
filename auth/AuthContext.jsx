import React from "react";

const authDetails = {
    token : null,
    user : null,
    handleLoginThroughModal : (username, password, setUsername, setPassword, setHelperText, setLoginModalOpen)=> {},
    handleLogout : ()=>{},
    anonymousAuthSessionId: null,
}
const AuthContext = React.createContext(authDetails);
export default AuthContext;