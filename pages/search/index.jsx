import { Box } from '@mui/material';
import React from 'react'
import SearchResults from '../../components/body/search/SearchResults';
import Header from '../../components/header/Header';

const Search=()=> {
  return (
    <>
    <Box
      sx={{
        display : "flex",
        flexDirection : "column",
        maxHeight : "100vh",
      }}
    >
      <Header/>
      <SearchResults/>
    </Box>
    </>
  )
}

export default Search;