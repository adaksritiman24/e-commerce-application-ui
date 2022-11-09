import { Badge, Box, Button, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { grey } from '@mui/material/colors';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AuthContext from '../../../auth/AuthContext';
import { CartContext } from '../../../cart/CartProvider';
import { useRouter } from 'next/router';

const MoreNavigation=({
    setLoginModalOpen
})=> {
    const router = useRouter();
    const isDesktop  = useMediaQuery('(min-width:1200px)');

    const {user, handleLogout} = useContext(AuthContext);
    const {numberOfItems} = useContext(CartContext);


    const handleNavigateToCartPage = ()=>{
        router.push("/cart");
    }
  return (
    user != null ? (
        <Box
        sx={{
            py:"13px",
            "& svg": {
                fontSize: isDesktop ? "30px" : "23px"
            },
            fontFamily:"arial",
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
                <Box
                    sx={{
                        fontSize : isDesktop ? "17px" : "14px"
                    }}
                >Ship To</Box>
                <Box>
                    <b style={{ fontSize: isDesktop ? "22px" : "18px"}}>{user.address.city}</b>, 
                    <span style={{ fontSize : isDesktop ? "18px" : "14px"}}> {user.address.country}</span>
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
                <Typography variant='div'>
                    <Typography variant='p'
                        sx={{
                            display : "block",
                            fontSize : "13px",
                        }}
                    >
                        Hello
                    </Typography>
                    <b>{user.name.split(" ")[0]}</b>
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
                    onClick={handleNavigateToCartPage}
                >
                    <Badge badgeContent={numberOfItems} color="primary">
                    <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip title="Logout">   
                <IconButton 
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                    onClick={handleLogout}
                >
                    <LogoutIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
    ):(
        <Box
        sx={{
            py:"13px",
            "& svg": {
                fontSize: isDesktop ? "30px" : "23px"
            },
            fontFamily:"arial",
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
            <Box fontFamily="arial">
                
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
                <Tooltip title="Sign Up">
                    <Button variant='contained' sx={{
                        fontWeight : "bold",
                        textTransform : "none",
                        bgcolor : grey[800],
                        "&: hover" : {
                            bgcolor : grey[900]
                        }
                    }}>
                        Sign Up
                    </Button>
                </Tooltip>
            </Box>

            <Tooltip title="Login">
                <IconButton 
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                    onClick={()=>setLoginModalOpen(true)}
                >
                    <LoginIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Your Cart">
                <IconButton
                    sx={{
                        ml : 1,
                        color : grey[900]
                    }}
                    onClick={handleNavigateToCartPage}
                >
                    <Badge badgeContent={numberOfItems} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
    )
  )
}

export default MoreNavigation;