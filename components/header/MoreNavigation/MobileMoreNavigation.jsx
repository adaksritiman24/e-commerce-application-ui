import { Box, Button, Drawer, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Close } from '@mui/icons-material';



const MobileSideDrawer = (props)=>{
    const {
        drawerOpen,
        setDrawerOpen
    } = props
    return (
        <Drawer
            open={drawerOpen}
            anchor="right"
            onClose={()=>setDrawerOpen(false)}
            sx={{
                "& svg": {
                    fontSize: "30px",
                    mr : "5px"
                },
                "& .MuiPaper-root" : {
                    bgcolor : grey[400],
                },
                "& .MuiButtonBase-root" : {
                    display : "flex",
                    justifyContent : "flex-start",
                    textTransform : "none"
                }
            }}
            
        >
            <Stack spacing={2} padding={2} color={grey[200]} borderBottom="1px solid black" bgcolor={grey[800]} >
                <Stack direction="row" spacing={4}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <PersonPinIcon/>
                        <Typography variant='h5'>
                            Sritiman
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& svg": {
                                fontSize: "26px",
                                m : "0",
                                transform : "translateY(4px)"
                            },
                        }}
                    >
                        <Close
                            sx={{
                                cursor : "pointer",
                            }}
                            onClick = {()=>setDrawerOpen(false)}
                        />
                    </Box>
                </Stack>
            </Stack>   

            <Stack spacing={2} padding={2}>    
                <Box 
                    sx={{
                        display : "flex",
                        "& svg": {
                            fontSize: "37px",
                        },
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

                <Tooltip title="Your Orders">
                    <Button
                        sx={{
                            ml : 1,
                            color : grey[900]
                        }}
                    >
                        <InventoryIcon/>
                        <Typography variant='p'>
                            Your Orders
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <Button
                        sx={{
                            ml : 1,
                            color : grey[900]
                        }}
                    >
                        <ShoppingCartIcon/>
                        <Typography variant='p'>
                            Your Cart
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Logout">   
                    <Button 
                        sx={{
                            ml : 1,
                            color : grey[900]
                        }}
                    >
                        <LogoutIcon/>
                        <Typography variant='p'>
                            Logout
                        </Typography>
                    </Button>
                </Tooltip>
            </Stack>
        </Drawer>
    )
} 

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
        <Button
            sx={{
                ml : 1,
                color : grey[900],
                display : "flex",
                justifyContent : "flex-end",
                "& svg": {
                    border : "1px solid gray",
                    borderRadius : "4px",
                    p : "4px",
                },

            }}
            onClick={()=>setDrawerOpen(true)}
        >
            <MenuIcon/>   
        </Button>
        <MobileSideDrawer
            drawerOpen = {drawerOpen}
            setDrawerOpen = {setDrawerOpen}
        />
    </Box>
  )
}

export default MobileMoreNavigation