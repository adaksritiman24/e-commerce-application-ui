import { Box, Divider, Rating, styled, Typography } from '@mui/material'
import {Slider} from '@mui/material'
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import useSearchFilters from '../hooks/useSearchFilters';

const StyledFilterBox = styled(Box)({
    width : "90%",
    marginTop : "20px",
    padding : "10px",
    border : "0.2px solid rgba(0,0,0,0.4)",
    borderRadius : "4px",
});

const SearchFilters =()=> {
    const minPrice = 10000;
    const maxPrice = 50000;
    const {price, setPrice} = useSearchFilters(
        minPrice, maxPrice
    );

    const handlePrice = (event, newPrice)=> {
        setPrice(newPrice);
    }
    const getPriceText =(value)=> {
        return `Rs. ${value}`;
    }

    const showRatingOption = (value)=> {
        return <Box
            display="flex"
            sx={{
                cursor : "pointer"
            }}
        >
        <Rating value={value} size="large" readOnly/>
        <Typography ml={1} fontWeight="500" 
            sx={{
                display : "flex",
                alignItems : "center"
            }}
        >& Up</Typography>
    </Box>
    }

  return (
    <Box
        sx={{
            display : "flex",
            flexDirection : "column",
            alignItems: "center",
            
        }}
    >
        <StyledFilterBox>
            <Typography
                fontSize="18px"
                fontWeight="600"
                fontFamily="helvetica"
            >
                Price
            </Typography>
            <Slider
                size='large'
                getAriaLabel={() => 'Temperature range'}
                value={price}
                onChange={handlePrice}
                valueLabelDisplay="auto"
                getAriaValueText={getPriceText}
                disableSwap
                min={minPrice}
                max={maxPrice}

                sx = {{
                    width : "90%",
                    mx: "5%",
                    '& .MuiSlider-thumb': {
                        height: 23,
                        width: 23,
                        backgroundColor: grey[900],
                        '&:focus, &:hover, &.Mui-active': {
                          boxShadow:
                            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                        },
                      },
                    '& .MuiSlider-track': {
                        border : "none",
                        height :"10px",
                        bgcolor: grey[600],
                    },
                    '& .MuiSlider-rail': {
                        opacity : "0.8",
                        backgroundColor: grey[500],
                    },
                    '& .MuiSlider-valueLabel': {
                        lineHeight: 1.2,
                        fontSize: 14,
                        padding: 0,
                        borderRadius : "4px",
                        p : "5px",
                        backgroundColor: grey[800],
                    },
                }}
            />
            <Box
                sx={{
                    display : "flex",
                    justifyContent : "space-between"
                }}
            >
                <Typography>Rs. {price[0]}</Typography>
                <Typography>Rs. {price[1]}</Typography>
            </Box>
        </StyledFilterBox>
        
        <StyledFilterBox>
             <Typography
                fontSize="18px"
                fontWeight="600"
                fontFamily="helvetica"
            >
                Ratings
            </Typography>  
            <Stack>
            
            {showRatingOption(4)}
            {showRatingOption(3)}
            {showRatingOption(2)}
            {showRatingOption(1)}
            </Stack> 
        </StyledFilterBox>

    </Box>
  )
}

export default SearchFilters