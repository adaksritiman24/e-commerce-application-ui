import { Box, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React, { useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useRouter } from "next/router";
import { getFormattedPrice } from "../../common/utils/helpers";
import Summary from "../../common/Summary";

const OrderShippingAndTotal = ({ totalAmount, deliveryAddress }) => {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          m: "10px",
          background: deepPurple[50],
          p: "15px",
        }}
      >
        <Box>
          <Typography variant="h5" mr={1} fontWeight={600}>
            Shipping Details
          </Typography>

          <hr />
          <Typography variant="h6">{deliveryAddress.name}</Typography>
          <Box color={grey[800]}>
            <Box
              sx={{
                display: "flex",
                mb: "4px",
              }}
            >
              <FmdGoodIcon
                sx={{
                  mr: "4px",
                }}
              />
              <Box>
                <Typography>
                  {deliveryAddress.house}, {deliveryAddress.locality}
                </Typography>
                <Typography>
                  {deliveryAddress.city}, {deliveryAddress.country}
                </Typography>
                <Typography>Pin code: {deliveryAddress.pincode}</Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalPhoneIcon
                sx={{
                  mr: "4px",
                }}
              />{" "}
              {deliveryAddress.phone}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailIcon
                sx={{
                  mr: "4px",
                }}
              />{" "}
              {deliveryAddress.email}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              md: "0",
              xs: "14px",
            },
          }}
        >
          <Summary total={totalAmount} subtotal={totalAmount} tax={0} shippingCost={0}/>
        </Box>
      </Box>
    </>
  );
};

export default OrderShippingAndTotal;
