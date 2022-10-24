import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import React from "react";
import { grey } from "@mui/material/colors";
import { color, height } from "@mui/system";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "1px solid rgb(200,200,200)",
        },
        transition: "0.3s",
        border: "1px solid transparent",
      }}
    >
      <Box
        sx={{
          height: "320px",
        }}
      >
        {product.images.length > 0 ? (
          <img src="something" alt="NF" height={4} />
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              background: grey[300],
            }}
          >
            <InsertPhotoIcon
              sx={{
                color: grey[400],
                height: "320px",
                width: "100%",
              }}
            />
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "600",
            color: grey[700],
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productDetails.splice(0, 79)}
        </Typography>
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
            <p style={{ margin: "0px 8px" }}> {product.rating}</p>
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