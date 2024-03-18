import { Avatar, Badge, Box, Button, Drawer, Stack, Tooltip, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange, grey } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Close } from '@mui/icons-material';
import { useContext } from 'react';
import AuthContext from "../../../auth/AuthContext";
import { CartContext } from '../../../cart/CartProvider';
import { useRouter } from 'next/router';
import { SignupModalContext } from '../../../modals/payments/SignupModalProvider';
import PersonIcon from '@mui/icons-material/Person';
import { getColorCoding } from '../../common/utils/helpers';




const MobileSideDrawer = (props)=>{

    const router = useRouter();
    const {setSignupModalOpen} = useContext(SignupModalContext);

    const handleNavigateToCartPage = ()=>{
        router.push("/cart");
    }
    const handleNavigateToOrdersPage = ()=> {
        router.push('/my-orders');
    }

    const {user} = useContext(AuthContext);
    const {handleLogout} = useContext(AuthContext);
    const {
        drawerOpen,
        setDrawerOpen,
        setLoginModalOpen,
        numberOfItemsInCart
    } = props

    const getInitials = useCallback((name)=> {
        var initials = "";
        var names = name.split(" ");
        for(let n of names) {
            initials+=n[0];
        }
        return initials;
    }, [user]);

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
                    width : "250px"
                },
                "& .MuiButtonBase-root" : {
                    display : "flex",
                    justifyContent : "flex-start",
                    textTransform : "none"
                },
                
            }}
            
        >
            {(user!=null) ? (
                <>
            <Stack padding={2} color={grey[200]} borderBottom="1px solid black" bgcolor={grey[800]} >
                <Stack direction="row"
                    sx={{
                        display : "flex",
                        justifyContent : "space-between"
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar sx={{ bgcolor: getColorCoding(user.name) , width: 32, height: 32 , fontSize: "16px" , mr: 1}} variant='rounded'>
                            {getInitials(user.name)}
                        </Avatar>
                        <Typography variant='h5'>
                             {user.name.split(" ")[0]}
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
                            <b style={{ fontSize: "22px"}}>{user.address.city}</b>, {user.address.country}
                        </Box>
                    </Box>
                </Box>

                <Tooltip title="Your Orders">
                    <Button
                        sx={{
                            ml : 1,
                            color : grey[900]
                        }}
                        onClick={handleNavigateToOrdersPage}
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
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItemsInCart} showZero color="primary">
                        <ShoppingCartIcon/>
                        </Badge>
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
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon/>
                        <Typography variant='p'>
                            Logout
                        </Typography>
                    </Button>
                </Tooltip>
            </Stack>
            </>
            ) : (
                <>
                    <Stack padding={2} color={grey[200]} borderBottom="1px solid black" bgcolor={grey[800]} >
                <Stack direction="row"
                    sx={{
                        display : "flex",
                        justifyContent : "space-between"
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button variant='contained' sx={{
                        fontWeight : "bold",
                        textTransform : "none",
                        bgcolor : grey[600],
                        "&: hover" : {
                            bgcolor : grey[700]
                        }
                        }}
                        onClick={()=>setLoginModalOpen(true)}
                        >
                            Login
                        </Button>
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
                <Tooltip title="Logout">   
                    <Button 
                        sx={{
                            color : grey[900],
                        }}
                        onClick={()=>setSignupModalOpen(true)}
                    >
                        <PersonIcon/>
                        <Typography variant='p'>
                            Sign Up
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <Button
                        sx={{
                            color : grey[900],
                        }}
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItemsInCart} showZero color="primary" >
                            <ShoppingCartIcon/>
                        </Badge>
                        <Typography variant='p'>
                            Your Cart
                        </Typography>
                    </Button>
                </Tooltip>

            </Stack>
                </>
            )}
        </Drawer>
    )
} 

const MobileMoreNavigation=({
    setLoginModalOpen,
})=> {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {numberOfItems} = useContext(CartContext);
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
            setLoginModalOpen={setLoginModalOpen}
            numberOfItemsInCart={numberOfItems}
        />
    </Box>
  )
}

export default MobileMoreNavigation