import { Box, Divider, Rating, styled, Typography } from '@mui/material'
import {Slider} from '@mui/material'
import { green, grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import useSearchFilters from '../hooks/useSearchFilters';
import BrandSelectComponent from './BrandSelectComponent';

const StyledFilterBox = styled(Box)({
    width : "90%",
    marginTop : "20px",
    padding : "10px",
    border : "0.2px solid rgba(0,0,0,0.4)",
    borderRadius : "4px",
});

const SearchFilters =({
    brands,
    priceBracket,
    searchResults,
    setFilteredResults,
})=> {
    const {
        price, 
        setPrice, 
        selectedRating,
        setSelectedRating,
        
    } = useSearchFilters(
        
        priceBracket,
        searchResults,
        setFilteredResults,
    );
    const [displayedPrice, setDisplayedPrice] = useState(priceBracket);

    const handlePriceChangeComitted = (_,newComittedPrice)=> {
        setPrice(newComittedPrice);
    }
        
    const handlePrice = (event, newPrice)=> {
        setDisplayedPrice(newPrice);
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
            onClick={()=>{
                if(selectedRating === value) setSelectedRating(0);
                else setSelectedRating(value);
            }}
        >
        <Rating value={value} size="large" readOnly/>
        <Typography ml={1} fontWeight="500" 
            sx={{
                display : "flex",
                fontWeight : "600",
                alignItems : "center",
                color : selectedRating === value ? green[700] : grey[800],
            }}
        >& Up</Typography>
    </Box>
    }

    useEffect(()=>{
            setPrice(priceBracket);
            setDisplayedPrice(priceBracket);
    },[priceBracket])

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
                value={displayedPrice}
                onChange={handlePrice}
                onChangeCommitted={handlePriceChangeComitted}
                valueLabelDisplay="auto"
                getAriaValueText={getPriceText}
                disableSwap
                min={priceBracket[0]}
                max={priceBracket[1]}

                sx = {{
                    width : "90%",
                    mx: "5%",
                    '& .MuiSlider-thumb': {
                        height: 23,
                        width: 23,
                        backgroundColor: grey[600],
                        '&:focus, &:hover, &.Mui-active': {
                          boxShadow:
                            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                        },
                      },
                    '& .MuiSlider-track': {
                        border : "none",
                        height :"10px",
                        bgcolor: grey[400],
                    },
                    '& .MuiSlider-rail': {
                        opacity : "0.8",
                        backgroundColor: grey[300],
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
                <Typography>&#x20B9; {price[0]}</Typography>
                <Typography>&#x20B9; {price[1]}</Typography>
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
        
        <StyledFilterBox>
             <Typography
                fontSize="18px"
                fontWeight="600"
                fontFamily="helvetica"
            >
                Brand
            </Typography>  
            <Stack>
                <BrandSelectComponent 
                    brands={brands}
                />
            </Stack> 
        </StyledFilterBox>

    </Box>
  )
}

export default SearchFilters