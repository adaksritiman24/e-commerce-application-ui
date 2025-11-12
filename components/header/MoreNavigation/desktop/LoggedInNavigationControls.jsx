import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getColorCoding } from "../../../common/utils/helpers";
import Image from "next/image";
import {
    DeliverAddressModelProvider
} from "../../../../modals/DeliveryAddressModalProvider";
import ShipToSection from "../ShipToSection";


const LoggedInNavigationControls = ({
    isDesktop,
    handleLogout,
    handleNavigateToCartPage,
    handleNavigateToOrdersPage,
    numberOfItems,
    getInitials,
    addDeliveryAddress,
    cartData,
    user
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
            <DeliverAddressModelProvider addDeliveryAddress={addDeliveryAddress}>
                <ShipToSection user={user} isDesktop={isDesktop} deliveryAddress={cartData.deliveryAddress} />
            </DeliverAddressModelProvider>

            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box display="flex" alignItems="center">
                    {null == user.profilePicture ? (
                        <>
                            <Avatar
                                sx={{
                                    bgcolor: getColorCoding(user.name),
                                    width: 32,
                                    height: 32,
                                    fontSize: "12px",
                                    mr: 1,
                                }}
                                variant="rounded"
                            >
                                {getInitials(user.name)}
                            </Avatar>
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    mr: 1,
                                }}
                            >
                                <Image
                                    width={32}
                                    height={32}
                                    src={user.profilePicture}
                                    style={{
                                        borderRadius: 5,
                                    }}
                                />
                            </Box>
                        </>
                    )}
                    <Typography variant="div">
                        <Typography
                            variant="p"
                            sx={{
                                display: "block",
                                fontSize: "13px",
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
                            ml: 1,
                            color: grey[900],
                        }}
                        onClick={handleNavigateToOrdersPage}
                    >
                        <InventoryIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <IconButton
                        sx={{
                            ml: 1,
                            color: grey[900],
                        }}
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItems} showZero color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                    <IconButton
                        sx={{
                            ml: 1,
                            color: grey[900],
                        }}
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default LoggedInNavigationControls;