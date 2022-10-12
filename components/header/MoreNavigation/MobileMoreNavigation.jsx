import { Box, Drawer, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';

const MobileMoreNavigation=()=> {
    const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box 
        sx={{
            "& svg": {
                fontSize: "30px"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width : "100%"
        }}
    >
        <IconButton
            sx={{
                ml : 1,
                color : grey[900]
            }}
            onClick={()=>setDrawerOpen(true)}
        >
            <MenuIcon/>   
        </IconButton>
        <Drawer
            open={drawerOpen}
            anchor="right"
            onClose={()=>setDrawerOpen(false)}
        >
            hello
        </Drawer>
    </Box>
  )
}

export default MobileMoreNavigation