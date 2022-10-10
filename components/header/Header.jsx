import { Box, Grid, Typography } from '@mui/material';
import { grey} from '@mui/material/colors';
import React from 'react'
import Logo from '../common/Logo';
import SearchBox from './SearchBox';


const Header=()=> {
  return (
    <Box sx={{
      bgcolor : grey[400],
    }}>
      <Grid container>
        <Grid item md={2}
          sx= {{display : "flex"}}
        >
          <Logo/>
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