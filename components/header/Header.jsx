import { Box, Grid, Typography } from '@mui/material';
import { blue, green, grey} from '@mui/material/colors';
import React from 'react'
import SearchBox from './SearchBox';
import classes from "./Header.module.css";

const Header=()=> {
  return (
    <Box sx={{
      bgcolor : green[500],
    }}>
      <Grid container>
        <Grid item md={2}
          sx= {{display : "flex"}}
        >
          <Typography variant='h4' sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding : "5px",
            ml:"12px",
            color : grey[100],
          }}> 
            <span className={classes["brand"]}><b>MART</b></span>
            <span className={classes["brand-sub"]}><b><i>FIX</i></b></span>
            <span className={classes["brand-sub-arrow"]} style={{paddingLeft : "5px"}}><b> &#11014;</b></span>
          </Typography>
        </Grid>
        <Grid item md={6}>
          <SearchBox />
        </Grid>
        <Grid item md={4}>
      
        </Grid>
      </Grid>
     
    </Box>
  )
}

export default Header;