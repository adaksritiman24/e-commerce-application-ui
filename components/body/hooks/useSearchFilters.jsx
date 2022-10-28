import { useEffect, useState } from "react";

const useSearchFilters = (
    priceBracket,
    searchResults,
    setFilteredResults,
)=> {
    const [price , setPrice] = useState(priceBracket);
    const [selectedRating, setSelectedRating] = useState(0);

    const priceFiltering = (product)=> product.discountedPrice >= price[0] && product.discountedPrice <= price[1];
    const ratingFiltering = (product)=>{
        if(product.rating === null || selectedRating === 0) return true;
        return product.rating >= selectedRating;
    } 

    const applyAllFilters = ()=> {
        
        setFilteredResults(
            searchResults.filter((product)=>(
                    (priceFiltering(product)) &&
                    (ratingFiltering(product))
                )
            )
        );
    }

    useEffect(()=>{
        applyAllFilters();
    },[price, selectedRating])

    return {
        price,
        selectedRating,
        setPrice,
        setSelectedRating,
    }
}

export default useSearchFilters;