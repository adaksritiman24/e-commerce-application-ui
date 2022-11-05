import React from 'react'
import AuthContext from './AuthContext';
import useAuth from './useAuth'

const AuthenticationProvider =(props)=> {
    
    const {user, token, handleLoginThroughModal, handleLogout} = useAuth();

    const AuthContextValue = {user, token, handleLoginThroughModal, handleLogout}
  return (
    <AuthContext.Provider value={AuthContextValue}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider