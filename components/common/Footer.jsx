import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'

const Footer =()=> {
  return (
    <Box
        sx={{
            bottom: "0",  
            textAlign: "center",
            background : grey[500],
            fontFamily : "helvetica",
            fontSize: "24px",
            color: "white",
            py: 2,
            mt: 2
        }}
    >
        Copyright@ www.buzz.co.in
    </Box>
  )
}

export default Footer;