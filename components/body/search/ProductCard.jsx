import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import ProductCardPricing from "./ProductCardPricing";
import { useRouter } from "next/router";
import ProductImageSRP from "./ProductImageSRP";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const handleProductCardClick =(productId)=>{
    router.push(`/product/${productId}`)
  }
  return (
    <Card
      onClick={()=>handleProductCardClick(product.id)}
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "1px solid rgb(200,200,200)",
        },
        transition: "0.3s",
        border: "1px solid transparent",
      }}
      elevation={3}
    >
      <Box
        sx={{
          height: "320px",
        }}
      >
        <ProductImageSRP images={product.images}/>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: "600",
            color: grey[700],
            display : "-webkit-box",
            WebkitLineClamp : 2,
            WebkitBoxOrient : "vertical",
            overflow : "hidden",
            height : "64px",
          }}
        >
          {product.name}
        </Typography>
        <ProductCardPricing
          normalPrice={product.normalPrice}
          discountedPrice={product.discountedPrice}
        />
        {product.rating ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              height: "40px",
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
              fontFamily : "Trebuchet Ms",
              fontSize : "16px"
            }}
            > {product.rating}</p>
          </Box>
        ) : (
          <Typography
            height="40px"
            display="flex"
            alignItems="center"
            fontSize="18px"
          >
            <i>No Ratings</i>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
