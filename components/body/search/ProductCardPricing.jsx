import { Box, Chip, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React from "react";

const ProductCardPricing = ({ normalPrice, discountedPrice }) => {
  const calculateTotalDiscountPercentage = () => {
    return Math.round(((normalPrice - discountedPrice) / normalPrice) * 100);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        fontFamily="helvetica"
        sx={{
          color: grey[800],
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          <Typography
            variant="span"
            sx={{
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            &#x20B9;
          </Typography>
          {discountedPrice}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: grey[500],
            px: 1,
          }}
        >
          <del>&#x20B9;{normalPrice}</del>
        </Typography>
      </Box>
      <Chip
        label={`${calculateTotalDiscountPercentage()}% off`}
        variant="filled"
        sx={{
          fontWeight: "600",
          background: green[700],
          color: grey[300],
        }}
      />
    </Box>
  );
};

export default ProductCardPricing;
