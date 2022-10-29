import { Box, Button, ButtonGroup, colors, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const AddToCart = ({ addToCartWithQuantity1, quantityInCart, decreaseCartQuantityBy1,removeFromCart }) => {
  const isItemInCart = quantityInCart > 0;
  return (
    <>
      {!isItemInCart && (
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
          }}
          size="large"
          onClick={addToCartWithQuantity1}
        >
          Add To Cart
        </Button>
      )}

      {isItemInCart && (
        <>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            size="large"
            color="warning"
            onClick={removeFromCart}
          >
            Remove From Cart
          </Button>
          <Stack
            sx={{
              fontSize : "22px"
            }}
            spacing={1}
            my={2}
          >
            <Typography>Select Quantity:</Typography>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size="large" color="success">
              <Button
              disabled={quantityInCart <= 1}
              onClick={decreaseCartQuantityBy1}
              >-</Button>
              <Box
                sx={{
                  border : "0.4px solid grey",
                  minWidth : "75px",
                  display : "flex",
                  justifyContent : "center",
                  alignItems : "center",
                  bgcolor : grey[200],
                }}
              >
                {quantityInCart}
                
                </Box>
              <Button
                onClick={addToCartWithQuantity1}
              >+</Button>
            </ButtonGroup>
          </Stack>
        </>
      )}
    </>
  );
};

export default AddToCart;
