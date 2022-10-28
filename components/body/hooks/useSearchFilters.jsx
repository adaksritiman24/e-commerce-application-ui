import { useState } from "react";

const useSearchFilters = (
    priceBracket
)=> {
    const [price , setPrice] = useState(priceBracket)

    return {
        price,
        setPrice
    }
}

export default useSearchFilters;