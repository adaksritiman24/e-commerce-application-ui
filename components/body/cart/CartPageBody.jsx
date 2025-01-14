import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import { CartContext } from "../../../cart/CartProvider";
import CartProductActions from "./CartProductActions";
import ShhippingAndTotal from "./ShippingAndTotal";
import CartProductImage from "./CartProductImage";
import Link from "next/link";
import { DeliverAddressModelProvider } from "../../../modals/DeliveryAddressModalProvider";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { update } from "@react-spring/web";

const CartPageBody = () => {
  const {
    cartData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
    addDeliveryAddress,
    placeOrderUsingBankCard,
    updateCartPageProducts,
  } = useContext(CartContext);

  const router = useRouter();
  
  useEffect(()=>{
    updateCartPageProducts();
  }, []);

  if (cartData.cartEntryList == null || cartData.cartEntryList.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          flexGrow: 1,
        }}
      >
        <Box textAlign="center">
          <Box>
            <BackHandOutlinedIcon
              sx={{ transform: "rotateY(180deg)", fontSize: "30px" }}
            />
            <SentimentDissatisfiedIcon
              sx={{
                fontSize: "60px",
              }}
            />
            <BackHandOutlinedIcon sx={{ fontSize: "30px" }} />
            <hr />
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="h6" fontFamily={"arial"}>
              Your cart is empty
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 1, borderRadius: 5, textTransform: "none" }}
            color="warning"
            onClick={() => {
              router.push("/");
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          my: "20px",
          mx: {
            lg: "200px",
            md: "50px",
            xs: "14px",
          },
          px: {
            lg: "130px",
            md: "75px",
            xs: "10px",
          },
          py: {
            lg: "50px",
            md: "22px",
            xs: "10px",
          },
          borderRadius: "4px",
          background: "white",
        }}
      >
        <Typography
          variant="h4"
          mx="10px"
          sx={{
            p: 2,
            display: "flex",
            alignItems: "flex-end",
            background: deepPurple[50],
            borderRadius: 2,
            border: `1px solid ${deepPurple[800]}`,
            justifyContent: "center",
          }}
        >
          <ShoppingCartOutlinedIcon fontSize="32px" sx={{ p: "4px" }} /> Your
          Cart
        </Typography>
        {cartData.cartEntryList != null &&
          cartData.cartEntryList.map((product) => (
            <Paper
              sx={{
                m: "10px",
                mb: "18px",
                p: "14px",
                border: `0.5px solid ${grey[400]}`,
                borderRadius: "4px",
                display: "flex",
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
                flexWrap: "no-wrap",
                background: "white",
              }}
              key={product.id}
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
                <Box
                  sx={{
                    "& a": {
                      fontFamily: "Trebuchet MS",
                      fontSize: "20px",
                      color: grey[800],
                    },
                  }}
                >
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </Box>

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
                <Typography
                  variant="subtitle1"
                  fontSize={"14px"}
                  style={{ color: grey[600] }}
                >
                  Seller : <strong>{product.seller}</strong>
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
                  flexDirection: "column",
                  mt: {
                    lg: "4px",
                    xs: "8px",
                  },
                }}
              >
                <Stack
                  sx={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      textAlign: {
                        lg: "right",
                        xs: "right",
                      },
                      color: grey[500],
                    }}
                  >
                    Item Price
                  </Typography>
                  <Typography variant="subtitle1">
                    {getFormattedPrice(product.discountedPrice)}
                  </Typography>
                </Stack>
                <hr />
                <Stack
                  sx={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: {
                        lg: "right",
                        xs: "right",
                      },
                      color: grey[500],
                    }}
                  >
                    Total Price
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {getFormattedPrice(product.totalPrice)}
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          ))}
        <DeliverAddressModelProvider addDeliveryAddress={addDeliveryAddress}>
          <ShhippingAndTotal
            totalAmount={cartData.totalPrice}
            deliveryAddress={cartData.deliveryAddress}
            placeOrderUsingBankCard={placeOrderUsingBankCard}
          />
        </DeliverAddressModelProvider>
      </Paper>
    </Box>
  );
};

export default CartPageBody;
