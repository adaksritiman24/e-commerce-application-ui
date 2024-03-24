import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React from "react";

const CartProductActions = ({
  product,
  increaseCartQuantityBy1,
  decreaseCartQuantityBy1,
  removeFromCart,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        mt: "14px",
      }}
    >
      <Stack
        sx={{
          fontSize: "15px",
        }}
        spacing={1}
      >
        <Typography variant="p" fontFamily="arial" fontSize="14px">
          Selected Quantity
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          size="small"
          color="success"
        >
          <Button
            disabled={product.quantity <= 1}
            onClick={() => decreaseCartQuantityBy1(product.id)}
          >
            -
          </Button>
          <Box
            sx={{
              border: "0.4px solid purple",
              minWidth: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: deepPurple[50],
            }}
          >
            {product.quantity}
          </Box>
          <Button onClick={() => increaseCartQuantityBy1(product.id)}>+</Button>
        </ButtonGroup>
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pl: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
          }}
          onClick={() => removeFromCart(product.id)}
          size="small"
          color="error"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default CartProductActions;
