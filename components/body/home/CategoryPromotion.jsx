import { Box, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import PromotionCard from "./PromotionCard";

const CategoryPromotion = ({
    categoryPromotion
}) => {
  return (
    <Box
        sx={{
            padding : 3,
            background :   `linear-gradient(-180deg,${orange[400]},${orange[100]})`,
            mt : 1
        }}
    >
        <Typography
          sx={{
            fontWeight : "600",
            fontSize : "22px",
          }}
        >
            {categoryPromotion.title}
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
  );
};

export default CategoryPromotion;
