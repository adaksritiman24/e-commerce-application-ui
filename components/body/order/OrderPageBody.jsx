import { Box, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useContext } from "react";
import Link from "next/link";
import OrderShippingAndTotal from "./OrderShippingAndTotal";
import { CartContext } from "../../../cart/CartProvider";
import { getFormattedPrice } from "../../common/utils/helpers";
import CartProductImage from "../cart/CartProductImage";

const OrderPageBody = ({ orderData }) => {
  const { setNumberOfItems } = useContext(CartContext);
  setNumberOfItems(0);

  if (orderData == undefined || orderData == null) {
    return <></>;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        my: "20px",
        mx: {
          lg: "30px",
          md: "20px",
          xs: "14px",
        },
        p: {
          lg: "30px",
          md: "22px",
          xs: "10px",
        },
        px: {
          lg: "130px",
        },
        borderRadius: "4px",
      }}
    >
      <Box sx={{
        mx: "10px"
      }}>
        <Typography variant="h4">Your order is confirmed!</Typography>
        <Typography variant="subtitle1">
          Thank you for shopping with Buzz.
        </Typography>
        <Typography variant="h6">Order Number: {orderData.id}</Typography>
      </Box>
      <Box
        sx={{
          m: "10px",
        }}
      >
        {orderData.orderEntryList != null &&
          orderData.orderEntryList.map((product) => (
            <Box
              sx={{
                p: "14px",
                mt:1,
                background: grey[200],
                display: "flex",
                borderRadius:"4px", 
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
                flexWrap: "wrap",
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
                <Typography variant="caption" fontSize={16} mt={"18px"}>
                  Quantity: <strong>{product.quantity}</strong>
                </Typography>
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
                        xs: "right"                 
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
                        xs: "right"   
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
            </Box>
          ))}
      </Box>
      <OrderShippingAndTotal
        totalAmount={orderData.totalPrice}
        deliveryAddress={orderData.deliveryAddress}
      />
    </Paper>
  );
};

export default OrderPageBody;