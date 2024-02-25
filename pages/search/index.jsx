import { Box } from '@mui/material';
import React from 'react'
import SearchResults from '../../components/body/search/SearchResults';
import Header from '../../components/header/Header';
import Footer from '../../components/common/Footer';

const Search=()=> {
  return (
    <>
    <Box
      sx={{
        display : "flex",
        flexDirection : "column",
        height : "100vh",
      }}
    >
      <Header/>
      <SearchResults/>
      <Footer/>
    </Box>
    </>
  )
}

export default Search;