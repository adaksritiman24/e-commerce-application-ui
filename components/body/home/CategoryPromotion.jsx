import { Box, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";
import PromotionCard from "./PromotionCard";

const CategoryPromotion = ({
    categoryPromotion
}) => {
  return (
    <Box
        sx={{
            
            background : `url(${IMAGE_SERVER_BASE_URL}${categoryPromotion.image}) no-repeat`,
            backgroundOrigin: "border-box",
            backgroundSize : "cover",
            mt : 1,
            backdropFilter: "blur(8px)",
            "&: hover .elastic-underline" : {
              width : "100%",
            }
        }}
    >
      <Box
          sx={{
            background : "rgba(0,0,0,0.5)",
            padding : 3,
          }}
        >

          <Typography
            sx={{
              fontWeight : "600",
              fontSize : "22px",
              color : "white",
              display : "inline-block",
            }}
            variant = "div"
          >
              {categoryPromotion.title}
              <Box sx={{
                width : "20%",
                height : "3px",
                background : "white",
                transition : "0.4s ease-out",
              }}
              className={"elastic-underline"}
              >

              </Box>
          </Typography>
        <Grid
        container
          sx={{
            margin: "auto",
          }}
        >
          {categoryPromotion.items.map((item, index)=>(

          <Grid
            item
            xs={12}
            sm={6}
              key={index}
            lg={3}
          >
              <PromotionCard product={item}/>
          </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryPromotion;
