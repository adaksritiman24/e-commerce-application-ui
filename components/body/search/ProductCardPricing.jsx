import { Box, Chip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { calculateTotalDiscountPercentage, getFormattedPrice } from "../../common/utils/helpers";

const ProductCardPricing = ({ normalPrice, discountedPrice , offer}) => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection : {
          xs : "column",
          lg : "row"
        }
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
            
          </Typography>
          {getFormattedPrice(discountedPrice)}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: grey[500],
            px: 1,
          }}
        >
          <del>{getFormattedPrice(normalPrice)}</del>
        </Typography>
      </Box>
      <Box>
        <Chip
          label={`${calculateTotalDiscountPercentage(normalPrice, discountedPrice)}% off`}
          variant="outline"

          sx={{
            fontWeight: "600",
            background: grey[800],
            color: grey[300],
            borderRadius : "4px",
            px : "5px",
            my : {
              md : "5px",
              xs : "5px",
              lg : "0"
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductCardPricing;
