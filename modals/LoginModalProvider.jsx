import { createContext, useState } from "react";
import LoginModal from "../components/header/authentication-ui/LoginModal";

const modalValues = {
  loginModalOpen: false,
  setLoginModalOpen: () => {},
};

export const LoginContext = createContext(modalValues);

const LoginModalProvider = ({ children }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const loginContextValues = { loginModalOpen, setLoginModalOpen };

  return (
    <LoginContext.Provider value={loginContextValues}>
      <>
        {children}
        <LoginModal
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        ></LoginModal>
      </>
    </LoginContext.Provider>
  );
};

export default LoginModalProvider;
