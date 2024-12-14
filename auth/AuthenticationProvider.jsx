import React, { useEffect } from "react";
import AuthContext from "./AuthContext";
import useAuth from "./useAuth";
import {v4 as uuidV4} from "uuid";
import { CookiesProvider, useCookies } from "react-cookie";

const REMEMBER_ME = "rememberMe";
const COOKIE_MAX_AGE = 7;

const AuthenticationProvider = (props) => {

  const [cookies, setCookie] = useCookies([REMEMBER_ME]);

  let anonymousAuthSessionId;
  if(cookies.rememberMe == undefined || cookies.rememberMe == null) {
 
    const authSessionId = uuidV4()
    setCookie(REMEMBER_ME, authSessionId, {path : "/"});
    anonymousAuthSessionId = authSessionId;
  }
  else {
    anonymousAuthSessionId = cookies.rememberMe;
  }

  const { user, token, handleLoginThroughModal, handleLogout, handleSignupThroughModal, handleGoogleLogin } = useAuth(anonymousAuthSessionId);
  


  const AuthContextValue = {
    user,
    token,
    handleLoginThroughModal,
    handleSignupThroughModal,
    handleLogout,
    anonymousAuthSessionId,
    handleGoogleLogin,
  };

  return (
      <CookiesProvider>
        <AuthContext.Provider value={AuthContextValue}>
          {props.children}
        </AuthContext.Provider>
      </CookiesProvider>
      
  );
};

export default AuthenticationProvider;
