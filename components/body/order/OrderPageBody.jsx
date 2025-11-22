import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { deepPurple, green, grey } from "@mui/material/colors";
import React from "react";
import { useContext } from "react";
import Link from "next/link";
import OrderShippingAndTotal from "./OrderShippingAndTotal";
import { CartContext } from "../../../cart/CartProvider";
import { getFormattedPrice } from "../../common/utils/helpers";
import CartProductImage from "../cart/CartProductImage";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import Head from "next/head";
import Summary from "../../common/Summary";

const getOrderStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "created":
      return <TaskAltIcon />;
    case "dispatched":
      return <FlightTakeoffSharpIcon />;
    case "shipped":
      return <FlightLandIcon />;
    case "out_for_delivery":
      return <LocalShippingIcon />;
    case "delivered":
      return <CheckCircleSharpIcon />;
    default:
      return <TaskAltIcon />;
  }
};

const OrderPageBody = ({ orderData }) => {
  const { setNumberOfItems } = useContext(CartContext);
  const router = useRouter();
  const searchType = router.query.searchType;
  setNumberOfItems(0);

  if (orderData == undefined || orderData == null) {
    return (
      <>
        <Head>
          <title>Order Not Found</title>
        </Head>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ReportProblemIcon
              sx={{
                fontSize: "70px",
              }}
            />
            <Typography fontWeight={600}>Order Not Found!</Typography>
          </Stack>
        </Box>
      </>
    );
  }

  return (
    <>
      {searchType === undefined || searchType === null ? (
        <Head>
          <title>Order Confirmation</title>
        </Head>
      ) : (
        <Head>
          <title>Order</title>
        </Head>
      )}
      <Paper
        elevation={2}
        sx={{
          my: "30px",
          mx: {
            lg: "70px",
            md: "50px",
            xs: "14px",
          },
          p: {
            lg: "30px",
            md: "22px",
            xs: "10px",
          },
          px: {
            lg: "100px",
          },
          borderRadius: "4px",
          background: "white",
        }}
      >
        <Box
          sx={{
            mx: "10px",
          }}
        >
          {(searchType === undefined || searchType === null) && (
            <>
              <Typography variant="h4">
                <DoneIcon
                  sx={{ color: green[800], fontWeight: "bold", pr: 1 }}
                />
                Your order is confirmed!
              </Typography>
              <Typography variant="subtitle1">
                Thank you for shopping with Buzz.
              </Typography>
            </>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                sm: "row",
                xs: "column",
              },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">
                Order Number: <strong>{orderData.id}</strong>
              </Typography>
              <Box
                sx={{
                  color: grey[700],
                }}
              >
                <Typography variant="subtitle1">
                  Date: <strong>{orderData.orderDate}</strong>
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Chip
                variant="filled"
                icon={getOrderStatusIcon(orderData.status)}
                label={`${orderData.status}`}
                color="success"
                sx={{
                  background:
                    orderData.status.toLowerCase() === "delivered"
                      ? green[600]
                      : deepPurple[400],
                  fontSize: "20px",
                  p: 1,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Stack
          sx={{
            display: "flex",
            mt: 1,
          }}
          direction={{
            lg: "row",
            md: "column",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
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
                      mt: 1,
                      background: deepPurple[50],
                      display: "flex",
                      borderRadius: "4px",
                      flexDirection: {
                        sm: "row",
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
                        flexBasis: "min-content",
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
                        <Link href={`/product/${product.id}`}>
                          {product.name}
                        </Link>
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
                  </Box>
                ))}
            </Box>
            <OrderShippingAndTotal
              totalAmount={orderData.totalPrice}
              deliveryAddress={orderData.deliveryAddress}
            />
          </Box>
          <Box
            sx={{
              m: {
                xs: "10px",
              },
            }}
          >
            <Summary
              total={orderData.totalPrice}
              subtotal={orderData.totalPrice}
              tax={0}
              shippingCost={0}
            />
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default OrderPageBody;
