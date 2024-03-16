import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'
import {ThreeDots} from "react-loader-spinner";

const LoadingSpinner =()=> {
  return (
    <Box
        sx={{

            position : "fixed",
            left : 0,
            top : 0,
            width : "100%",
            height : "100%",
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            background : "rgb(0, 0, 0, 0.2)",
            zIndex : "3000",
        }}
    >
        <ThreeDots color={grey[700]}/>
    </Box>
  )
}

export default LoadingSpinner;