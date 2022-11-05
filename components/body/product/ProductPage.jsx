import { Box, Grid, Rating, styled, Typography } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import React from "react";
import {
  calculateTotalDiscountPercentage,
  getFormattedPrice,
} from "../../common/utils/helpers";
import useProduct from "../hooks/useProduct";
import AddToCart from "./AddToCart";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import { useContext } from "react";
import { CartContext } from "../../../cart/CartProvider";
import AssociatedProduct from "./AssociatedProducts";

const StyledPricingContainer = styled(Box)({
  pl: 0.5,
  mt: 1,
});

function ProductPage({
  product
}) {
  const {setNumberOfItems} = useContext(CartContext);
  
  const {
    quantityInCart,
    addToCartWithQuantity1,
    decreaseCartQuantityBy1,
    removeFromCart,
  } = useProduct(product, setNumberOfItems);

  return (

    <Grid px={{ md: 3, lg: 10 }} mt={2}>
      {product && (
        <>
        <Grid container>
          <Grid item md={6} xs={12}>
            <ProductImage images={product.images}/>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              pt: "10px",
              px: {
                lg: "30px",
                md: "16px",
                xs: "25px",
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: "22px",
                  md: "30px",
                },
                fontWeight: "600",
                fontFamily: "Trebuchet Ms",
              }}
            >
              {product.name}
            </Typography>
            <Typography fontWeight="bold" color={orange[700]}>
              {product.brand}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                height: "40px",
                mt: "5px",
                "& .MuiRating-readyOnly": {
                  fontSize: {
                    lg: "34px",
                    md: "30px",
                    xs: "32px",
                  },
                },
              }}
            >
              <Rating
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                size="large"
              />
              <p
                style={{
                  margin: "0px 8px",
                  fontFamily: "Trebuchet Ms",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                {product.rating}
              </p>
            </Box>
            <StyledPricingContainer>
              <Typography color={grey[500]}>
                <del>{getFormattedPrice(product.normalPrice)}</del>
              </Typography>
              <Box display="flex">
                <Typography
                  variant="p"
                  pr={2}
                  fontFamily="Arial"
                  fontSize="18px"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  color={grey[800]}
                >
                  Price:
                </Typography>
                <Typography
                  variant="p"
                  fontFamily="Arial"
                  fontWeight="bold"
                  fontSize="28px"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    lineHeight: "25px",
                  }}
                  color={grey[900]}
                >
                  {getFormattedPrice(product.discountedPrice)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: grey[600],
                  mt: 0.5,
                }}
              >
                You Save:
                <Box fontSize="20px" color={grey[800]} pl={1}>
                  {calculateTotalDiscountPercentage(
                    product.normalPrice,
                    product.discountedPrice
                  )}
                  %
                </Box>
              </Box>
            </StyledPricingContainer>
            <Typography py={3}>
              Sold by <b>{product.seller}</b>
            </Typography>
            <AddToCart
              quantityInCart={quantityInCart}
              addToCartWithQuantity1={addToCartWithQuantity1}
              decreaseCartQuantityBy1={decreaseCartQuantityBy1}
              removeFromCart={removeFromCart}
            />
            <Box py={4}>
              <ProductDetails details={product.productDetails} />
            </Box>
          </Grid>
        </Grid>
        <AssociatedProduct productIds={product.associatedProducts}/>
        </>
      )}
    </Grid>
    
  );
}

export default ProductPage;
