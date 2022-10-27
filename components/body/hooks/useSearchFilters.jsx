import { useState } from "react";

const useSearchFilters = (
    minPrice,
    maxPrice
)=> {
    const [price , setPrice] = useState([minPrice,maxPrice])

    return {
        price,
        setPrice
    }
}

export default useSearchFilters;