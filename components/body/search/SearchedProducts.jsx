import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import ProductCard from './ProductCard'

const SearchedProducts =({searchResults})=> {
    console.log(searchResults);
    const router = useRouter();
    const keyword = router.query["text"];
  return (
    <Box>
        <Typography variant='h4' fontWeight={500} p={2}>
            Results for '{keyword}'
        </Typography>
        <Grid
        container
        spacing={2}
        padding={2}
        >
            {searchResults.map((searchResult, index)=>(
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                    <ProductCard key={index} product={searchResult}/>
                </Grid>    
            ))}
        </Grid>
    </Box>
  )
}

export default SearchedProducts