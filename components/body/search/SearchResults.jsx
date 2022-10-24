import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import FilterForMobile from "./FilterForMobile";
import Filters from "./Filters";
import SearchedProducts from "./SearchedProducts";

const SearchResults = () => {
  const theme = useTheme();
  const desktopMedia = theme.breakpoints.up("lg");
  const mobileMedia = theme.breakpoints.down("sm");
  const isDesktop = useMediaQuery(desktopMedia);
  const isMobile = useMediaQuery(mobileMedia);
  const [openFilterForMobile, setOpenFilterForMobile] = useState(false);

  const { searchResults } = useSearchResults();

  return (
    <Box px={isMobile ? 3 : 5}>
      {!isDesktop && (
        <>
          <Filters setOpenFilterForMobile={setOpenFilterForMobile} />
          <FilterForMobile
            openFilterForMobile={openFilterForMobile}
            setOpenFilterForMobile={setOpenFilterForMobile}
          />
        </>
      )}

      <Grid container>
        {isDesktop && (
          <Grid
            item
            lg={3}
            sx={{
              position: "sticky",
              top: "12px",
              height: "97vh",
              background: grey[100],
              zIndex: -1,
            }}
          >
            <Typography variant="h4" fontWeight={500} p={2}>
              Filters
            </Typography>
          </Grid>
        )}
        <Grid item lg={9} xs={12}>
          <SearchedProducts searchResults={searchResults} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResults;