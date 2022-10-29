import { InsertPhoto } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const ProductImage = ({ url }) => {
  return (
    <Box
        sx={{
            display : "flex",
            justifyContent : "center",
            p : "10px",
        }}
    >

        <Box
            sx={{
                width : {
                    lg : "500px",
                    md : "400px",
                    sm : "440px",
                    xs : "320px",
                },
                height : {
                    lg : "500px",
                    md : "400px",
                    sm : "440px",
                    xs : "320px",
                }
            }}
        >
            {url ? (
                <></>
            ) : (
                <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    background: grey[300],
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
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
    </Box>
  );
};

export default ProductImage;

