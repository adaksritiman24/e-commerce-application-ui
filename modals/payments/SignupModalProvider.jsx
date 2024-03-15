import React, { useState } from "react";
import SignupForm from "./SignupForm";

const SignupModalContext = React.createContext({
  setSignupModalOpen: () => {},
  signupModalOpen: false,
  helper: {
    field: "",
    text: "",
  },
  setHelper: () => {},
});

export { SignupModalContext };

const SignupModalProvider = ({ children }) => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [helper, setHelper] = useState(null);

  const contextValues = {
    signupModalOpen,
    setSignupModalOpen,
    helper,
    setHelper,
  };

  return (
    <SignupModalContext.Provider value={contextValues}>
      {children}
      {signupModalOpen && (
        <SignupForm
          signupModalOpen={signupModalOpen}
          setSignupModalOpen={setSignupModalOpen}
        />
      )}
    </SignupModalContext.Provider>
  );
};

export default SignupModalProvider;
