import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useRouter } from 'next/router';
import React from 'react'
import classes from "./Logo.module.css";

const Logo=()=> {
  const router = useRouter();
  const handleLogoClick = ()=> {
    router.push("/");
  }
  return (
    <Box
      onClick={handleLogoClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding : "5px",
        ml:"12px",
        cursor : "pointer",
        color : grey[100],
      }}
    >
      <Typography 
        variant='h4' 
        sx={{
          m : 0,
          p : 0
        }}
        > 
          <span className={classes["brand"]}><b>B</b></span>
          <span className={classes["brand-sub"]}><b>UZZ</b></span>
        </Typography>
    </Box>
  )
}

export default Logo