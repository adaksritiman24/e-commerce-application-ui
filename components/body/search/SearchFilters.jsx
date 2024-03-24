import { Box, Rating, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Slider } from "@mui/material";
import { deepPurple, green, grey, red } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import useSearchFilters from "../hooks/useSearchFilters";
import BrandSelectComponent from "./BrandSelectComponent";

const DiscountFilterValue = ({
  percent,
  discountPercent,
  setDiscountPercent,
}) => {
  return (
    <Box
      onClick={() => {
        if (discountPercent === percent) {
          setDiscountPercent(0);
        } else setDiscountPercent(percent);
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          color: discountPercent === percent ? red[300] : grey[800],
          cursor: "pointer",
          "&:hover": {
            color: discountPercent === percent ? red[400] : grey[900],
          },
        }}
      >
        {percent}% or more
      </Typography>
    </Box>
  );
};

const StyledFilterBox = styled(Box)({
  width: "90%",
  marginTop: "20px",
  padding: "10px",
  border: "0.2px solid rgba(0,0,0,0.4)",
  borderRadius: "4px",
});

const SearchFilters = ({
  brands,
  priceBracket,
  searchResults,
  setFilteredResults,
}) => {
  const {
    price,
    selectedRating,
    selectedBrands,
    discountPercent,
    setPrice,
    setSelectedRating,
    setSelectedBrands,
    setDiscountPercent,
  } = useSearchFilters(brands, priceBracket, searchResults, setFilteredResults);
  const [displayedPrice, setDisplayedPrice] = useState(priceBracket);
  const discounts = [10, 20, 30, 40, 50, 60, 70, 80];

  const theme = useTheme();
  const desktopMedia = theme.breakpoints.up("lg");
  const isDesktop = useMediaQuery(desktopMedia);

  const handlePriceChangeComitted = (_, newComittedPrice) => {
    setPrice(newComittedPrice);
  };

  const handlePrice = (event, newPrice) => {
    setDisplayedPrice(newPrice);
  };
  const getPriceText = (value) => {
    return `Rs. ${value}`;
  };

  const showRatingOption = (value) => {
    return (
      <Box
        display="flex"
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          if (selectedRating === value) setSelectedRating(0);
          else setSelectedRating(value);
        }}
      >
        <Rating value={value} size="large" readOnly />
        <Typography
          ml={1}
          fontWeight="500"
          sx={{
            display: "flex",
            fontWeight: "600",
            alignItems: "center",
            color: selectedRating === value ? green[700] : grey[800],
          }}
        >
          & Up
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    setPrice(priceBracket);
    setDisplayedPrice(priceBracket);
  }, [priceBracket]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: isDesktop ? "776px" : "none",
        alignItems: "center",
      }}
    >
      <StyledFilterBox>
        <Typography fontSize="18px" fontWeight="600" fontFamily="helvetica">
          Price
        </Typography>
        <Slider
          size="large"
          getAriaLabel={() => "Temperature range"}
          value={displayedPrice}
          onChange={handlePrice}
          onChangeCommitted={handlePriceChangeComitted}
          valueLabelDisplay="auto"
          getAriaValueText={getPriceText}
          disableSwap
          min={priceBracket[0]}
          max={priceBracket[1]}
          sx={{
            width: "90%",
            mx: "5%",
            "& .MuiSlider-thumb": {
              height: 23,
              width: 23,
              backgroundColor: deepPurple[600],
              "&:focus, &:hover, &.Mui-active": {
                boxShadow:
                  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
              },
            },
            "& .MuiSlider-track": {
              border: "none",
              height: "10px",
              bgcolor: deepPurple[300],
            },
            "& .MuiSlider-rail": {
              opacity: "0.8",
              backgroundColor: grey[300],
            },
            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: 14,
              padding: 0,
              borderRadius: "4px",
              p: "5px",
              backgroundColor: grey[800],
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>&#x20B9; {price[0]}</Typography>
          <Typography>&#x20B9; {price[1]}</Typography>
        </Box>
      </StyledFilterBox>

      <StyledFilterBox>
        <Typography fontSize="18px" fontWeight="600" fontFamily="helvetica">
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
        <Typography fontSize="18px" fontWeight="600" fontFamily="helvetica">
          Brand
        </Typography>
        <Stack>
          <BrandSelectComponent
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        </Stack>
      </StyledFilterBox>

      <StyledFilterBox
        sx={{
          mb: "4px",
        }}
      >
        <Typography fontSize="18px" fontWeight="600" fontFamily="helvetica">
          Discount
        </Typography>
        <Stack>
          {discounts.map((discount, index) => (
            <DiscountFilterValue
              percent={discount}
              key={index}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
            />
          ))}
        </Stack>
      </StyledFilterBox>
    </Box>
  );
};

export default SearchFilters;
