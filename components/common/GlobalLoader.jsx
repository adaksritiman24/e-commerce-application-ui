import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";

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
      <CircularProgress thickness={6} size={50} sx={{
        [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
      }}/>
    </Box>
  );
};

export default GlobalLoader;
