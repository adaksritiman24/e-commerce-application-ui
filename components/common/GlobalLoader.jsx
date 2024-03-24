import {
  Box,
  CircularProgress,
  ThemeProvider,
  circularProgressClasses,
  createTheme,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

const theme = createTheme({
  palette: {
    primary: { main: deepPurple[500] },
    secondary: { main: deepPurple[700] },
  },
});

const GlobalLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(0, 0, 0, 0.2)",
        zIndex: "3000",
      }}
    >
      <ThemeProvider theme={theme}>
        <CircularProgress
          thickness={6}
          color="primary"
          size={50}
          sx={{
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
        />
      </ThemeProvider>
    </Box>
  );
};

export default GlobalLoader;
