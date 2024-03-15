import {
  Box,
  Button,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

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
  return (
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
          width: {
            lg: "640px",
            sm: "540px",
            xs: "320px",
          },
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: "0",
            padding: "18px",
            paddingLeft: "24px",
            marginBottom: "6px",
            color: grey[100],
            background: grey[900],
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Sign Up
        </h2>
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
              background: grey[100],
              borderRadius: 1,
              px: "8px",
              pb: "8px",
              pt: "8px",
              mb: "10px",
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
              />
              <TextField
                required
                id="outlined-required"
                label="Username"
                sx={{
                  flexGrow: 1,
                }}
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
              />
              <TextField
                required
                id="outlined-required"
                label="Phone No."
                sx={{
                  flexGrow: 1,
                }}
              />
            </Stack>
          </Paper>

          <Paper className="personal-info" elevation={2}>
            <h3>Address</h3>
            <Stack spacing={1} mt={1} direction={{ lg: "row" }}>
              <TextField
                required
                id="outlined-required"
                label="House No."
                sx={{
                  flexGrow: 1,
                }}
                F
              />
              <TextField
                required
                id="outlined-required"
                label="Locality"
                sx={{
                  flexGrow: 2,
                }}
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
              />
              <Select
                labelId="d-country"
                id="d-country"
                value={"India"}
                sx={{
                  flexGrow: 1,
                }}
              >
                <MenuItem value={"India"}>India (IN)</MenuItem>
                <MenuItem value={"United States"}>United States (US)</MenuItem>
                <MenuItem value={"China"}>China (CN)</MenuItem>
              </Select>
              <TextField
                required
                id="outlined-required"
                label="Pincode"
                sx={{
                  flexGrow: 1,
                }}
              />
            </Stack>
          </Paper>

          <div className="password-info">
            <Stack spacing={1} direction={{ lg: "row" }}>
              <TextField
                id="pwd"
                label="Password"
                type="password"
                variant="filled"
                sx={{
                  flexGrow: 1,
                }}
              />
              <TextField
                id="cnf-pwd"
                label="Confirm Password"
                type="password"
                variant="filled"
                sx={{
                  flexGrow: 1,
                }}
              />
            </Stack>
          </div>
          <Box>
            <Button variant="contained" sx={{ mt: 1 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignupForm;
