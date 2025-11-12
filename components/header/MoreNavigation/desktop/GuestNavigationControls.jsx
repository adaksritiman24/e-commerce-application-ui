import {
    Badge,
    Box,
    Button,
    IconButton,
    Tooltip,
} from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepPurple, grey } from "@mui/material/colors";
import AccountBoxIcon from "@mui/icons-material/AccountBox";



const GuestNavigationControls = ({
    isDesktop,
    handleNavigateToCartPage,
    setSignupModalOpen,
    setLoginModalOpen,
    numberOfItems
}) => {
    return (
        <Box
            sx={{
                py: "13px",
                "& svg": {
                    fontSize: isDesktop ? "30px" : "23px",
                },
                fontFamily: "arial",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mx: "10px",
                width: "100%",
            }}
        >
            <Box
                mx={2}
                sx={{
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <LocationOnIcon />
                </Box>
                <Box fontFamily="arial"></Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box display="flex" alignItems="center">
                    <Tooltip title="Sign Up">
                        <Button
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                textTransform: "none",
                                bgcolor: deepPurple[800],
                                "&: hover": {
                                    bgcolor: deepPurple[900],
                                },
                            }}
                            onClick={() => setSignupModalOpen(true)}
                        >
                            Sign Up
                        </Button>
                    </Tooltip>
                </Box>

                <Tooltip title="Login">
                    <IconButton
                        sx={{
                            color: grey[900],
                        }}
                        onClick={() => setLoginModalOpen(true)}
                    >
                        <AccountBoxIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <IconButton
                        sx={{
                            color: grey[900],
                        }}
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItems} showZero color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default GuestNavigationControls;