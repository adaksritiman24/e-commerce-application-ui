import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {IMAGE_SERVER_BASE_URL} from "../../constants"

function ProductImageSRP({
  images
}) {
  return (
    <>
    {images.length > 0 ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display : "flex",
              justifyContent : "center",
              alignItems : "center"
            }}
            
          >
            <img src={`${IMAGE_SERVER_BASE_URL}${images[0]["url"]}`} alt="NF" height="95%"/>
          </Box>
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
    </>
  )
}

export default ProductImageSRP;