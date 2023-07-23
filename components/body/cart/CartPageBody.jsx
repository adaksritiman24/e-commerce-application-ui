import { Box, Paper, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import React from "react";
import useCart from "../hooks/useCart";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import { CartContext } from "../../../cart/CartProvider";
import CartProductActions from "./CartProductActions";
import ShhippingAndTotal from "./ShippingAndTotal";
import CartProductImage from "./CartProductImage";
import AuthContext from "../../../auth/AuthContext";

const CartPageBody = () => {
  const { setNumberOfItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const {
    productsData,
    totalAmount,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
  } = useCart(setNumberOfItems, user != null,  user?.username);

  if (productsData.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign="center">
          <Box>
            <ShoppingCartIcon
              sx={{
                fontSize: "100px",
              }}
            />
          </Box>
          <Typography variant="h4" fontWeight="bold">
            Your cart is empty
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        my: "20px",
        mx: {
          lg: "160px",
          md: "20px",
          xs: "14px",
        },
        p: {
          lg: "30px",
          md: "22px",
          xs: "10px",
        },
        borderRadius : "15px",
      }}
    >
      <Typography variant="h4" ml="10px" borderBottom="0.4px solid grey">
        Your Cart
      </Typography>
      {productsData.map((product) => (
        <Box
          sx={{
            m: "10px",
            p: "14px",
            borderBottom: "1px solid grey",
            display: "flex",
            flexDirection: {
              md: "row",
              xs: "column",
            },
            flexWrap: "wrap",
          }}
        >
          <CartProductImage images={product.images} />
          <Box
            sx={{
              flexGrow: "1",
              mt: {
                md: "0px",
                xs: "4px",
              },
            }}
          >
            <Typography variant="h6">{product.name}</Typography>
            <Typography
              sx={{
                fontFamily: "Trebuchet MS",
                fontWeight: "bold",
                fontSize: "16px",
                color: grey[700],
              }}
            >
              {product.brand}
            </Typography>
            <CartProductActions
              product={product}
              increaseCartQuantityBy1={increaseCartQuantityBy1}
              decreaseCartQuantityBy1={decreaseCartQuantityBy1}
              removeFromCart={removeFromCart}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection : "column",
              mt: {
                lg: "4px",
                xs: "8px",
              },
            }}
          >
            <Stack
              sx={{
                alignSelf : "flex-end"
              }}
            >
              <Typography
                sx={{
                  textAlign: {
                    lg: "right",
                  },
                  color: grey[500],
                }}
              >
                Unit Price
              </Typography>
              <Typography variant="h5">
                {getFormattedPrice(product.discountedPrice)}
              </Typography>
            </Stack>
            <hr/>
            <Stack
              sx={{
                alignSelf : "flex-end"
              }}
            >
              <Typography
                sx={{
                  textAlign: {
                    lg: "right",
                  },
                  color: grey[500],
                }}
              >
                Total Price
              </Typography>
              <Typography variant="h5">
                {getFormattedPrice(product.totalPrice)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      ))}
      <ShhippingAndTotal totalAmount={totalAmount} />
    </Paper>
  );
};

export default CartPageBody;
