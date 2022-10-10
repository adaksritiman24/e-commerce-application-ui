import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import classes from "./Logo.module.css";

const Logo=()=> {
  return (
    <Typography variant='h4' sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding : "5px",
        ml:"12px",
        color : grey[100],
      }}> 
        <span className={classes["brand"]}><b>M</b></span>
        <span className={classes["brand-sub"]}><b>FIX</b></span>
        <span className={classes["brand-sub-arrow"]} style={{paddingLeft : "5px"}}><b> &#11000;</b></span>
      </Typography>
  )
}

export default Logo