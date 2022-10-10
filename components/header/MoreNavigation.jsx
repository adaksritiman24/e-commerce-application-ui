import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { color, display, margin } from '@mui/system';
import { grey } from '@mui/material/colors';

const MoreNavigation=()=> {
  return (
    <Box
        sx={{
            py:"10px",
            "& svg": {
                fontSize: "38px"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mx : "10px",
        }}
    >
        <Box 
            mx={2}
            sx={{
                display : "flex"
            }}
        >
            <LocationOnIcon/>
            <Box>
                <Box>Ship To</Box>
                <Box>
                    <b style={{ fontSize: "22px"}}>Kolkata</b>, India
                </Box>
            </Box>
        </Box>

        <Box>
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
    </Box>
  )
}

export default MoreNavigation;