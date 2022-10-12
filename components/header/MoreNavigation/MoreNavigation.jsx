import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import MobileMoreNavigation from './MobileMoreNavigation';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const MoreNavigation=()=> {
  return (
    <Box
        sx={{
            py:"13px",
            "& svg": {
                fontSize: "30px"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mx : "10px",
            width : "100%"
        }}
    >
        <Box 
            mx={2}
            sx={{
                display : "flex"
            }}
        >
            <Box 
                sx={{
                    display : "flex",
                    alignItems : "center"
                }}
            >
                <LocationOnIcon/>
            </Box>
            <Box>
                <Box>Ship To</Box>
                <Box>
                    <b style={{ fontSize: "22px"}}>Kolkata</b>, India
                </Box>
            </Box>
        </Box>

        <Box
            sx={{
                display : "flex"
            }}
        > 
            <Box
                display="flex"
                alignItems="center"
                
            >
                <PersonPinIcon/>
                <Typography variant='p'>
                    Sritiman
                </Typography>
            </Box>

            <Tooltip title="Your Orders">
                <IconButton 
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                >
                    <InventoryIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Your Cart">
                <IconButton
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                >
                    <ShoppingCartIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Logout">   
                <IconButton 
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                >
                    <LogoutIcon/>
                </IconButton>
            </Tooltip>
        </Box>
        {/* <MobileMoreNavigation/> */}
    </Box>
  )
}

export default MoreNavigation;