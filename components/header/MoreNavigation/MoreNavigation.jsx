import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import AuthContext from "../../../auth/AuthContext";
import { CartContext } from "../../../cart/CartProvider";
import { useRouter } from "next/router";
import { SignupModalContext } from "../../../modals/payments/SignupModalProvider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getColorCoding } from "../../common/utils/helpers";
import Image from "next/image";
import {
  DeliverAddressModelProvider
} from "../../../modals/DeliveryAddressModalProvider";
import ShipToSection from "./ShipToSection";

const MoreNavigation = ({ setLoginModalOpen }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:1200px)");


  const { user, handleLogout } = useContext(AuthContext);
  const { numberOfItems, addDeliveryAddress, cartData } = useContext(CartContext);
  const { setSignupModalOpen } = useContext(SignupModalContext);


  const handleNavigateToCartPage = () => {
    router.push("/cart");
  };
  const handleNavigateToOrdersPage = () => {
    router.push("/my-orders");
  };
  const getInitials = useCallback(
    (name) => {
      var initials = "";
      var names = name.split(" ");
      for (let n of names) {
        initials += n[0];
      }
      return initials;
    },
    [user]
  );


  return user != null ? (
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
        <ShipToSection user={user} isDesktop={isDesktop} deliveryAddress={cartData.deliveryAddress}/>
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
  ) : (
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
  );
};

export default MoreNavigation;
