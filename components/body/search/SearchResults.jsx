import { Box, Grid, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import FilterForMobile from "./FilterForMobile";
import Filters from "./Filters";
import SearchedProducts from "./SearchedProducts";
import SearchFilters from "./SearchFilters";
import GlobalLoader from "../../common/GlobalLoader";

const SearchResults = () => {

  const productPerPage = 4;
  const theme = useTheme();
  const desktopMedia = theme.breakpoints.up("lg");
  const mobileMedia = theme.breakpoints.down("sm");
  const isDesktop = useMediaQuery(desktopMedia);
  const isMobile = useMediaQuery(mobileMedia);
  const [openFilterForMobile, setOpenFilterForMobile] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
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

  const handlePageChange = (_, newPage)=> {
    const startIndex = (newPage-1)*productPerPage;
    setDisplayedProducts(filteredResults.slice( startIndex, startIndex + productPerPage));
    setCurrentPage(newPage);
  }

  useEffect(()=> {
    const extraPage = (filteredResults.length)%productPerPage > 0 ? 1 : 0;
    setPageCount(parseInt(filteredResults.length/productPerPage) + extraPage);
    setCurrentPage(1);
    setDisplayedProducts(filteredResults.slice(0, productPerPage));
  },[filteredResults]);

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
          <SearchedProducts searchResults={displayedProducts} />
        </Grid>
        <Grid item lg={12} xs={12}>
          <Stack spacing={2} sx={{
            display : "flex",
            alignItems : "flex-end",
            m: 1,
            mt: 2,
          }}>
            <Pagination count={pageCount} onChange={handlePageChange} page={currentPage} variant="outlined" shape="rounded" size="large"/>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResults;
