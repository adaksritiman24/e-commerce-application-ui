import { InsertPhoto } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useState } from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";

const ClickableImageThumbnail = ({
  index,
  setSelectedIndex,
  selectedIndex,
  image,
}) => {
  return (
    <Box
      sx={{
        height: "100px",
        width: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border:
          index === selectedIndex
            ? `1px solid ${grey[600]}`
            : `1px solid ${grey[400]}`,
        borderRadius: "4px",
        mx: "4px",
        mt: "12px",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          border: `1px solid ${grey[600]}`,
        },
      }}
      onClick={() => setSelectedIndex(index)}
    >
      <img
        src={`${IMAGE_SERVER_BASE_URL}${image["url"]}`}
        alt="NF"
        height="100%"
      />
    </Box>
  );
};

const ProductImage = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: "10px",
      }}
    >
      <Box
        sx={{
          width: {
            lg: "500px",
            md: "400px",
            sm: "440px",
            xs: "320px",
          },
          height: {
            lg: "500px",
            md: "400px",
            sm: "440px",
            xs: "320px",
          },
        }}
      >
        {images.length > 0 ? (
          <>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`${IMAGE_SERVER_BASE_URL}${images[selectedIndex]["url"]}`}
                alt="NF"
                height="100%"
              />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              background: grey[300],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InsertPhoto
              sx={{
                color: grey[400],
                height: "85%",
                width: "85%",
              }}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.map((image, index) => (
          <ClickableImageThumbnail
            image={image}
            key={image.id}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductImage;
