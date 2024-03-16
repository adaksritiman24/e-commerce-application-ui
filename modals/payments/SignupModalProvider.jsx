import React, { useState } from "react";
import SignupForm from "./SignupForm";

export const SignupModalContext = React.createContext({
  setSignupModalOpen: () => {},
  signupModalOpen: false,
  helper: {
    field: "",
    text: "",
  },
  setHelper: () => {},
  signupRequest: {
    name: "",
    username: "",
    email: "",
    address: {
      house: "",
      locality: "",
      city: "",
      country: "India",
      pincode: "",
    },
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  },
  setSignupRequest: () => {},
});

const SignupModalProvider = ({ children }) => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupRequest, setSignupRequest] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      house: "",
      locality: "",
      city: "",
      country: "India",
      pincode: "",
    },
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [helper, setHelper] = useState(null);

  const contextValues = {
    signupModalOpen,
    setSignupModalOpen,
    helper,
    setHelper,
    signupRequest,
    setSignupRequest,
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
