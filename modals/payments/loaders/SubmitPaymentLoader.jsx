import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const SubmitPaymentLoader =()=> {
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
            zIndex : "5000",
        }}
    >
        <CircularProgress thickness={6} size={50} />
    </Box>
  )
}

export default SubmitPaymentLoader;