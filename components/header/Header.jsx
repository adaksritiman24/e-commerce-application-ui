import { Box, Grid, Typography } from '@mui/material';
import { grey} from '@mui/material/colors';
import React from 'react'
import Logo from '../common/Logo';
import MoreNavigation from './MoreNavigation/MoreNavigation';
import SearchBox from './SearchBox';


const Header=()=> {
  return (
    <Box sx={{
      bgcolor : grey[400],
    }}>
      <Grid container>
        <Grid item md={2} xs={12}
          sx= {{display : "flex"}}
        >
          <Logo/>
        </Grid>
        <Grid item md={5} xs={11}>
          <SearchBox />
        </Grid>
        <Grid item md={5} xs={1}>
          <MoreNavigation/>
        </Grid>
      </Grid>
     
    </Box>
  )
}

export default Header;