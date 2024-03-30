import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { InsertPhoto } from "@mui/icons-material";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";

const CartProductImage = ({ images }) => {
  return (
    <Box>
      {images.length > 0 ? (
        <Box
          sx={{
            width: "150px",
            height: "150px",
            textAlign: "center",
            mr: "14px",
            border: "0.5px solid grey",
            p: "5px",
          }}
        >
          <img
            src={`${IMAGE_SERVER_BASE_URL}${images[0]["url"]}`}
            alt="NF"
            width="100%"
            style={{
              aspectRatio: 1
            }}
          />
        </Box>
      ) : (
        <Box
          bgcolor={grey[300]}
          sx={{
            width: "150px",
            height: "150px",
            textAlign: "center",
            mr: "14px",
            border: `0.5px solid ${grey[300]}`,
            p: "5px",
          }}
        >
          <InsertPhoto
            sx={{
              color: grey[400],
              height: "100%",
              width: "100%",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CartProductImage;
