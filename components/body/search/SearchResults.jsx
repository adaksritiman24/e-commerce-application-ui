import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import FilterForMobile from "./FilterForMobile";
import Filters from "./Filters";
import SearchedProducts from "./SearchedProducts";
import SearchFilters from "./SearchFilters";
import GlobalLoader from "../../common/GlobalLoader";

const SearchResults = () => {
  
  const theme = useTheme();
  const desktopMedia = theme.breakpoints.up("lg");
  const mobileMedia = theme.breakpoints.down("sm");
  const isDesktop = useMediaQuery(desktopMedia);
  const isMobile = useMediaQuery(mobileMedia);
  const [openFilterForMobile, setOpenFilterForMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const keyword = router.query["text"];

  const { 
    searchResults ,
    filteredResults,
    setFilteredResults,
    brands,
    price,
  } = useSearchResults(keyword, setLoading);

  const searchFilterProps = {
    brands,
    priceBracket: price ,
    searchResults,
    setFilteredResults  
  }
  if(loading)
    return <>
      <GlobalLoader/>
      <Box sx={{flexGrow: 1}}></Box>
    </>

  return (
    <Box px={isMobile ? 3 : 5}
      sx={{
        flexGrow : 1,
      }}
    >
  
      {!isDesktop && (
        <>
          <Filters setOpenFilterForMobile={setOpenFilterForMobile} />
          <FilterForMobile
            searchFilterProps={searchFilterProps}
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
              top: "12px",
              background: deepPurple[50],
              mt : "5px",
              mb : "10px",
              pb : 1,
              height: "fit-content",
              overflowY : "hidden"
            }}
          >
            <Typography variant="h4" fontWeight={500} p={2}
              sx={{
                background : deepPurple[200],
                color: "black"
              }}
            >
              Filters
            </Typography>
            <SearchFilters 
              brands={brands} 
              priceBracket={price} 
              searchResults={searchResults}
              setFilteredResults={setFilteredResults}  
            />
          </Grid>
        )}
        <Grid item lg={9} xs={12}>
          <SearchedProducts searchResults={filteredResults} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResults;
