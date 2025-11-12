import {
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useContext } from "react";
import AuthContext from "../../../../auth/AuthContext";
import { CartContext } from "../../../../cart/CartProvider";
import { useRouter } from "next/router";
import { SignupModalContext } from "../../../../modals/payments/SignupModalProvider";
import LoggedInNavigationControls from "./LoggedInNavigationControls";
import GuestNavigationControls from "./GuestNavigationControls";
import { GiftCardsModalContext } from "../../../../modals/GiftCardsModalProvider";

const MoreNavigation = ({ setLoginModalOpen }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:1200px)");

  const { user, handleLogout } = useContext(AuthContext);
  const { numberOfItems, addDeliveryAddress, cartData } = useContext(CartContext);
  const { setSignupModalOpen } = useContext(SignupModalContext);
  const { setGiftCardsModalOpen } = useContext(GiftCardsModalContext);


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
    <LoggedInNavigationControls
      isDesktop={isDesktop}
      handleLogout={handleLogout}
      handleNavigateToCartPage={handleNavigateToCartPage}
      handleNavigateToOrdersPage={handleNavigateToOrdersPage}
      numberOfItems={numberOfItems}
      getInitials={getInitials}
      addDeliveryAddress={addDeliveryAddress}
      setGiftCardsModalOpen={setGiftCardsModalOpen}
      cartData={cartData}
      user={user}
    />
  ) : (
    <GuestNavigationControls
      isDesktop={isDesktop}
      handleNavigateToCartPage={handleNavigateToCartPage}
      setSignupModalOpen={setSignupModalOpen}
      setLoginModalOpen={setLoginModalOpen}
      numberOfItems={numberOfItems}
    />
  );
};


export default MoreNavigation;
