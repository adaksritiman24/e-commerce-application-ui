import { Box, Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { InsertPhoto } from "@mui/icons-material";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";
import useCart from "../hooks/useCart";
import { getFormattedPrice } from "../../common/utils/helpers";

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
            disabled={product.quantityInCart <= 1}
            onClick={() => decreaseCartQuantityBy1(product.id)}
          >
            -
          </Button>
          <Box
            sx={{
              border: "0.4px solid grey",
              minWidth: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: grey[200],
            }}
          >
            {product.quantityInCart}
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

const CartProductImage = ({ images }) => {
  return (
    <Box
      sx={{
        width: "150px",
        height: "150px",
        border: "0.5px solid grey",
        textAlign: "center",
        p : "5px"
      }}
    >
      {images.length > 0 ? (
        <img
          src={`${IMAGE_SERVER_BASE_URL}${images[0]["url"]}`}
          alt="NF"
          height="100%"
        />
      ) : (
        <InsertPhoto
          sx={{
            color: grey[400],
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </Box>
  );
};

const CartPageBody = () => {
  const {
    productsData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
  } = useCart();

  if (productsData.length === 0) {
    return <Box>No Items in Cart</Box>;
  }

  return (
    <Paper
    elevation={4}
    sx={{
        "& .MuiBox-root:last-child" : {
            borderBottom : "none",
        },
        my :"20px",
        mx : "40px",
        p : "30px",
    }}
    >
        <Typography
            variant="h4"
            ml = "10px"
            borderBottom= "0.4px solid grey"
            >
                Your Cart
        </Typography>
      {productsData.map((product) => (
        <Box
          sx={{
            m: "10px",
            p: "14px",
            borderBottom: "1px solid grey",
            display: "flex",
            flexWrap : "wrap",
          }}
        >
          <CartProductImage images={product.images} />
          <Box
            sx={{
              pl: "14px",
              flexGrow : "1",
            }}
          >
            <Typography variant="h6">{product.name}</Typography>
            <Typography
                sx={{
                    fontFamily : "Trebuchet MS",
                    fontWeight : "bold",
                    fontSize : "16px",
                    color : grey[700]
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
                display : "flex",
                alignItems : "center"
            }}
          >
            <Stack>
                <Typography
                    sx={{
                        textAlign : "right",
                        color : grey[500]
                    }}
                >
                    Price
                </Typography>
                <Typography variant="h5">
                    {getFormattedPrice(product.totalPrice)}
                </Typography>
            </Stack>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default CartPageBody;
