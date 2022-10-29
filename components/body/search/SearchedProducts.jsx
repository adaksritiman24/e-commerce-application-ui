import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import ProductCard from "./ProductCard";

const SearchedProducts = ({ searchResults }) => {

  const router = useRouter();
  const keyword = router.query["text"];

  const themes = useTheme();

  const isDesktop = useMediaQuery(themes.breakpoints.up("lg"));
  return (
    <Box>
      <Typography variant={isDesktop ? "h4" : "h5"} fontWeight={500} p={2}>
        Results for '{keyword}'
      </Typography>
      <Grid container spacing={2} padding={isDesktop ? 2 : 0}>
        {searchResults.map((searchResult, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
            <ProductCard product={searchResult} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchedProducts;
