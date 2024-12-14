import React, { useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLoginButton = ({ handleLoginModelOpen, setHelperText }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const { handleGoogleLogin } = useContext(AuthContext);

  const handleGoogleLoginOAuth = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Error while google login: ", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log("Profile: ", res.data);
          handleGoogleLogin(
            res.data.email,
            res.data.family_name,
            res.data.given_name,
            handleLoginModelOpen,
            setHelperText
          );
        })
        .catch((error) => {
          console.log("Error while fetching user data from google: ", error);
        });
    }
  }, [user]);

  return (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      onClick={handleGoogleLoginOAuth}
      sx={{
        borderRadius: 10,
      }}
      startIcon={<GoogleIcon/>}
    >
      Log In with Google
    </Button>
  );
};

export default GoogleLoginButton;
