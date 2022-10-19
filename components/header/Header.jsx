import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { grey} from '@mui/material/colors';
import React from 'react'
import Logo from '../common/Logo';
import CategoriesSection from './CategoriesSection';
import MobileMoreNavigation from './MoreNavigation/MobileMoreNavigation';
import MoreNavigation from './MoreNavigation/MoreNavigation';
import SearchBox from './SearchBox';


const Header=()=> {
  const isDesktop  = useMediaQuery('(min-width:900px)');

  return (
    <Box sx={{
      bgcolor : grey[400],
    }}>
      <Grid container 
        sx= {{
          px: !isDesktop ? "8px" : "0",
        }}
      >
        {
        isDesktop && 
        <Grid item md={2} xs={0}
          sx= {{display : "flex"}}
          >
            <Logo/>
        </Grid>
        }
        
        <Grid item 
          md={4} 
          xs={10}
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <SearchBox />
        </Grid>
        <Grid item md={6} xs={2} sx= {{display : "flex"}}>

          {isDesktop ?<MoreNavigation/> : <MobileMoreNavigation/>}
        </Grid>
      </Grid>
      <CategoriesSection/>
    </Box>
  )
}

export default Header;