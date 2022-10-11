import { Drawer, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';

const MobileMoreNavigation=()=> {
    const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <>
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
    </>
  )
}

export default MobileMoreNavigation