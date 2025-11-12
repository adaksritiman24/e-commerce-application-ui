import { Badge, Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { deepPurple, grey } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Close } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';


const GuestMobileNavControls = ({
    handleNavigateToCartPage,
    numberOfItemsInCart,
    setDrawerOpen,
    setSignupModalOpen,
    setLoginModalOpen
}) => {
    return (
        <>
            <Stack padding={2} color={grey[200]} borderBottom="1px solid black" bgcolor={deepPurple[800]} >
                <Stack direction="row"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button variant='contained' sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            bgcolor: deepPurple[600],
                            "&: hover": {
                                bgcolor: deepPurple[700]
                            }
                        }}
                            onClick={() => setLoginModalOpen(true)}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            "& svg": {
                                fontSize: "26px",
                                m: "0",
                                transform: "translateY(4px)"
                            },
                        }}
                    >
                        <Close
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => setDrawerOpen(false)}
                        />
                    </Box>
                </Stack>
            </Stack>

            <Stack spacing={2} padding={2}>
                <Tooltip title="Logout">
                    <Button
                        sx={{
                            color: grey[900],
                        }}
                        onClick={() => setSignupModalOpen(true)}
                    >
                        <PersonIcon />
                        <Typography variant='p'>
                            Sign Up
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <Button
                        sx={{
                            color: grey[900],
                        }}
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItemsInCart} showZero color="error" >
                            <ShoppingCartIcon />
                        </Badge>
                        <Typography variant='p'>
                            Your Cart
                        </Typography>
                    </Button>
                </Tooltip>

            </Stack>
        </>
    )
}

export default GuestMobileNavControls;