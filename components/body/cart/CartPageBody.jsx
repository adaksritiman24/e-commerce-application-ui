import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { InsertPhoto } from "@mui/icons-material";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";
import useCart from "../hooks/useCart";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import { CartContext } from "../../../cart/CartProvider";
import AuthContext from "../../../auth/AuthContext";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { LoginContext } from "../../../modals/LoginModalProvider";

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
        p: "5px",
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

const ShhippingAndTotal = ({ totalAmount }) => {
  const { setLoginModalOpen } = useContext(LoginContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: "10px",
          background: grey[200],
          p: "15px",
        }}
      >
        {user == null ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setLoginModalOpen(true)}
            >
              Please sign in to proceed
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5">Shipping Details</Typography>
            <hr />
            <Typography variant="h6">{user.name}</Typography>
            <Box color={grey[700]}>
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
                    {user.address.house}, {user.address.locality}
                  </Typography>
                  <Typography>
                    {user.address.city}, {user.address.country}
                  </Typography>
                  <Typography>Pin code: {user.address.pincode}</Typography>
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
                {user.phoneNumber}
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
                {user.email}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: "10px",
              }}
              color="success"
            >
              Proceed to Checkout
            </Button>
          </Box>
        )}
        <Box>
          <Box>Net Payble Amount:</Box>
          <Typography variant="h4">{getFormattedPrice(totalAmount)}</Typography>
        </Box>
      </Box>
    </>
  );
};

const CartPageBody = () => {
  const { setNumberOfItems } = useContext(CartContext);
  const {
    productsData,
    totalAmount,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
  } = useCart(setNumberOfItems);

  if (productsData.length === 0) {
    return <Box>No Items in Cart</Box>;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        "& .MuiBox-root:last-child": {
          borderBottom: "none",
        },
        my: "20px",
        mx: "40px",
        p: "30px",
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
            flexWrap: "wrap",
          }}
        >
          <CartProductImage images={product.images} />
          <Box
            sx={{
              pl: "14px",
              flexGrow: "1",
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
            }}
          >
            <Stack>
              <Typography
                sx={{
                  textAlign: "right",
                  color: grey[500],
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
      <ShhippingAndTotal totalAmount={totalAmount} />
    </Paper>
  );
};

export default CartPageBody;
