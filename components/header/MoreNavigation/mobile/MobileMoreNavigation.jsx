import { Box, Button, Drawer } from "@mui/material";
import React, { useCallback, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { deepPurple, grey } from "@mui/material/colors";
import { useContext } from "react";
import AuthContext from "../../../../auth/AuthContext";
import { CartContext } from "../../../../cart/CartProvider";
import { useRouter } from "next/router";
import { SignupModalContext } from "../../../../modals/payments/SignupModalProvider";
import LoggedInMobileNavControls from "./LoggedInMobileNavControls";
import GuestMobileNavControls from "./GuestMobileNavControls";
import { GiftCardsModalProvider } from "../../../../modals/GiftCardsModalProvider";

const MobileSideDrawer = (props) => {
  const router = useRouter();
  const { setSignupModalOpen } = useContext(SignupModalContext);

  const handleNavigateToCartPage = () => {
    router.push("/cart");
  };
  const handleNavigateToOrdersPage = () => {
    router.push("/my-orders");
  };

  const { user } = useContext(AuthContext);
  const { handleLogout } = useContext(AuthContext);
  const { drawerOpen, setDrawerOpen, setLoginModalOpen, numberOfItemsInCart } =
    props;

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

  return (
    <Drawer
      open={drawerOpen}
      anchor="right"
      onClose={() => setDrawerOpen(false)}
      sx={{
        "& svg": {
          fontSize: "30px",
          mr: "5px",
        },
        "& .MuiPaper-root": {
          bgcolor: deepPurple[200],
          width: "250px",
        },
        "& .MuiButtonBase-root": {
          display: "flex",
          justifyContent: "flex-start",
          textTransform: "none",
        },
      }}
    >
      {user != null ? (
        <GiftCardsModalProvider>
          <LoggedInMobileNavControls
            user={user}
            getInitials={getInitials}
            handleNavigateToCartPage={handleNavigateToCartPage}
            handleNavigateToOrdersPage={handleNavigateToOrdersPage}
            handleLogout={handleLogout}
            numberOfItemsInCart={numberOfItemsInCart}
            setDrawerOpen={setDrawerOpen}
          />
        </GiftCardsModalProvider>
      ) : (
        <GuestMobileNavControls
          handleNavigateToCartPage={handleNavigateToCartPage}
          setDrawerOpen={setDrawerOpen}
          numberOfItemsInCart={numberOfItemsInCart}
          setSignupModalOpen={setSignupModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
    </Drawer>
  );
};

const MobileMoreNavigation = ({ setLoginModalOpen }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { numberOfItems } = useContext(CartContext);
  return (
    <Box
      sx={{
        "& svg": {
          fontSize: "30px",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Button
        sx={{
          ml: 1,
          color: grey[900],
          display: "flex",
          justifyContent: "flex-end",
          "& svg": {
            border: `1px solid ${deepPurple[800]}`,
            borderRadius: "4px",
            p: "4px",
          },
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </Button>
      <MobileSideDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setLoginModalOpen={setLoginModalOpen}
        numberOfItemsInCart={numberOfItems}
      />
    </Box>
  );
};

export default MobileMoreNavigation;
