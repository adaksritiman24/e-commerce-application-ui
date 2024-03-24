import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import { SignupModalContext } from "./SignupModalProvider";
import AuthContext from "../../auth/AuthContext";
import { animated, useSpring } from "@react-spring/web";
import Logo from "../../components/common/Logo";
import GlobalLoader from "../../components/common/GlobalLoader";

const AnimatedCollapseAlert = animated(Collapse);

const ErrorNotification = ({ open, setSuccess, errorText }) => {
  const aStyle = useSpring({
    from: { y: 0 },
    to: { y: 240 },
  });
  return (
    <AnimatedCollapseAlert
      style={{
        position: "fixed",
        top: "-200px",
        right: "50%",
        transform: "translate(50%, 0%)",
        zIndex: 6000,
        ...aStyle,
      }}
      in={open}
    >
      <Alert
        style={{
          background: "rgb(251,200,200)",
        }}
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setSuccess(true);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {errorText}
      </Alert>
    </AnimatedCollapseAlert>
  );
};

const style = {
  position: "absolute",
  top: "15px",
  left: "50%",
  transform: "translateX(-50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

const SignupForm = ({ signupModalOpen, setSignupModalOpen }) => {
  const { signupRequest, setSignupRequest } = useContext(SignupModalContext);
  const { handleSignupThroughModal } = useContext(AuthContext);
  const [helperText, setHelperText] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestSubmit = async () => {
    if (signupRequest.password.length < 8) {
      setHelperText("Password must be atleast 8 characters!");
      setIsButtonEnabled(false);
      document.getElementById("pwd").focus();
      return;
    }
    if (signupRequest.password !== signupRequest.confirmPassword) {
      setHelperText("Passwords are not matching!");
      setIsButtonEnabled(false);
      document.getElementById("cnf-pwd").focus();
      return;
    }
    setLoading(true);
    handleSignupThroughModal(
      signupRequest,
      setSuccess,
      setErrorMessage,
      setSignupModalOpen,
      setLoading,
      setSignupRequest
    );
  };

  const handleInput = (field, value) => {
    setSignupRequest((signupRequest) => {
      switch (field) {
        //Personal Information
        case "name":
          return { ...signupRequest, name: value };
        case "username":
          return { ...signupRequest, username: value };
        case "email":
          return { ...signupRequest, email: value };
        case "phoneNumber":
          return { ...signupRequest, phoneNumber: value };

        //Address
        case "house":
          return {
            ...signupRequest,
            address: { ...signupRequest.address, house: value },
          };
        case "locality":
          return {
            ...signupRequest,
            address: { ...signupRequest.address, locality: value },
          };
        case "city":
          return {
            ...signupRequest,
            address: { ...signupRequest.address, city: value },
          };
        case "country":
          return {
            ...signupRequest,
            address: { ...signupRequest.address, country: value },
          };
        case "pincode":
          return {
            ...signupRequest,
            address: { ...signupRequest.address, pincode: value },
          };

        //Password
        case "password":
          return { ...signupRequest, password: value };
        case "confirmPassword":
          return { ...signupRequest, confirmPassword: value };

        default:
          return address;
      }
    });
  };

  const validateForm = () => {
    setHelperText("");
    if (
      signupRequest.name == "" ||
      signupRequest.email == "" ||
      signupRequest.username == "" ||
      signupRequest.phoneNumber == "" ||
      signupRequest.address.city == "" ||
      signupRequest.address.country == "" ||
      signupRequest.address.house == "" ||
      signupRequest.address.locality == "" ||
      signupRequest.address.pincode == "" ||
      signupRequest.confirmPassword == "" ||
      signupRequest.password == ""
    ) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  };

  
  var expansion = keyframes`
    0% {
      opacity: 0.5;
      top: -250px;
    }
    100% {
      opacity: 1;
    }
  `;

  useEffect(() => {
    validateForm();
  }, [signupRequest]);

  return (
    <>
      {loading && <GlobalLoader />}
      {!success && (
        <ErrorNotification
          open={!success}
          setSuccess={setSuccess}
          errorText={errorMessage}
        />
      )}
      <Modal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        aria-labelledby="sign-modal-title"
        aria-describedby="sign-modal-description"
        sx={{
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        <Box
          sx={{
            ...style,
            "& h2, h3": {
              fontFamily: "Trebuchet MS",
              margin: "0",
            },
            animation: `${expansion} 300ms ease-out`,
            width: {
              lg: "640px",
              sm: "540px",
              xs: "320px",
            },
            boxSizing: "border-box",
          }}
        >
          <Box
            style={{
              margin: "0",
              padding: "18px",
              paddingLeft: "24px",
              marginBottom: "6px",
              color: deepPurple[50],
              background: deepPurple[800],
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Box
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Trebuchet MS",
              }}
            >
              Sign Up
            </Box>
            <Logo isSecondary={true} variant={"subtitle1"}/>
          </Box>
          <Box
            sx={{
              p: {
                lg: 3,
                sm: 2,
                xs: 2,
              },

              pt: {
                lg: 1,
                sm: 1,
                xs: 1,
              },
              "& .MuiPaper-root": {
                background: grey[50],
                borderRadius: 1,
                px: "8px",
                pb: "8px",
                pt: "8px",
                mb: "10px",
              },
              "& .MuiFormControl-root": {
                mt: {
                  xs: "10px",
                  lg: "0",
                },
              },
            }}
          >
            <Paper className="personal-info" elevation={2}>
              <h3>Personal Information</h3>
              <Stack spacing={1} mt={1} direction={{ lg: "row" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.name}
                  onChange={(e) => handleInput("name", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.username}
                  onChange={(e) => handleInput("username", e.target.value)}
                />
              </Stack>
              <Stack spacing={1} mt={1} direction={{ lg: "row" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  sx={{
                    flexGrow: 1,
                  }}
                  type="email"
                  value={signupRequest.email}
                  onChange={(e) => handleInput("email", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Phone No."
                  sx={{
                    flexGrow: 1,
                  }}
                  type="number"
                  value={signupRequest.phoneNumber}
                  onChange={(e) => handleInput("phoneNumber", e.target.value)}
                />
              </Stack>
            </Paper>

            <Paper className="address-info" elevation={2}>
              <h3>Address</h3>
              <Stack spacing={1} mt={1} direction={{ lg: "row" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="House No."
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.address.house}
                  onChange={(e) => handleInput("house", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Locality"
                  sx={{
                    flexGrow: 2,
                  }}
                  value={signupRequest.address.locality}
                  onChange={(e) => handleInput("locality", e.target.value)}
                />
              </Stack>
              <Stack spacing={1} mt={1} direction={{ lg: "row" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="City"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.address.city}
                  onChange={(e) => handleInput("city", e.target.value)}
                />
                <Select
                  labelId="d-country"
                  id="d-country"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.address.country}
                  onChange={(e) => handleInput("country", e.target.value)}
                >
                  <MenuItem value={"India"}>India (IN)</MenuItem>
                  <MenuItem value={"United States"}>
                    United States (US)
                  </MenuItem>
                  <MenuItem value={"China"}>China (CN)</MenuItem>
                </Select>
                <TextField
                  required
                  id="outlined-required"
                  label="Pincode"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.address.pincode}
                  onChange={(e) => handleInput("pincode", e.target.value)}
                />
              </Stack>
            </Paper>

            <div className="password-info">
              <Stack spacing={1} direction={{ lg: "row" }}>
                <TextField
                  id="pwd"
                  label="Password"
                  required
                  type="password"
                  variant="filled"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.password}
                  onChange={(e) => handleInput("password", e.target.value)}
                />
                <TextField
                  id="cnf-pwd"
                  required
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                  sx={{
                    flexGrow: 1,
                  }}
                  value={signupRequest.confirmPassword}
                  onChange={(e) =>
                    handleInput("confirmPassword", e.target.value)
                  }
                />
              </Stack>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                disabled={!isButtonEnabled}
                onClick={handleRequestSubmit}
              >
                Sign Up
              </Button>
              <Typography
                variant="subtitle1"
                color={"red"}
                fontSize="13px"
                textAlign={"center"}
                ml={1}
              >
                {helperText}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignupForm;
