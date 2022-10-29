import { useEffect, useState } from "react";
import { calculateTotalDiscountPercentage } from "../../common/utils/helpers";

const getCleanedBrandText = (text) => {
  return text.trim().toLowerCase();
};

const useSearchFilters = (
  brands,
  priceBracket,
  searchResults,
  setFilteredResults
) => {
  const [price, setPrice] = useState(priceBracket);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState({});
  const [discountPercent, setDiscountPercent] = useState(0);

  const setBrands = () => {
    const brandItems = {};
    for (let brand of brands) {
      brandItems[brand] = false;
    }
    setSelectedBrands(brandItems);
  };
  const noBrandsselected = () => {
    for (let brandKeys of Object.keys(selectedBrands)) {
      if (selectedBrands[brandKeys] === true) return false;
    }
    return true;
  };

  const priceFiltering = (product) =>
    product.discountedPrice >= price[0] && product.discountedPrice <= price[1];
  const ratingFiltering = (product) => {
    if (product.rating === null || selectedRating === 0) return true;
    return product.rating >= selectedRating;
  };
  const brandFilter = (product) => {
    if (noBrandsselected()) return true;
    return selectedBrands[getCleanedBrandText(product.brand)];
  };
  const discountFiltering = (product) =>
    calculateTotalDiscountPercentage(
      product.normalPrice,
      product.discountedPrice
    ) >= discountPercent;

  const applyAllFilters = () => {
    setFilteredResults(
      searchResults.filter(
        (product) =>
          priceFiltering(product) &&
          ratingFiltering(product) &&
          brandFilter(product) &&
          discountFiltering(product)
      )
    );
  };

  useEffect(() => {
    applyAllFilters();
  }, [price, selectedRating, selectedBrands, discountPercent]);

  useEffect(() => {
    setBrands();
  }, []);

  return {
    price,
    selectedRating,
    selectedBrands,
    discountPercent,
    setPrice,
    setSelectedRating,
    setSelectedBrands,
    setDiscountPercent,
  };
};

export default useSearchFilters;
