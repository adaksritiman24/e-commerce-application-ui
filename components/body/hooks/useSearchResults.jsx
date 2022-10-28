import { useEffect, useState } from "react"
import { products } from "../../../dummy_data/products";


const useSearchResults = ()=>{
    const [searchResults, setSearchResults] = useState([]);
    const [brands, setBrands] = useState([]);
    const [price, setPrice] = useState([0,0]);
    const [filteredResults, setFilteredResults] = useState([]);

    const setBrandsfromSearchResults = () => {
        const setOfBrands = new Set();
        searchResults.forEach((product)=>{
            setOfBrands.add(product.brand.trim().toLowerCase());
        })
        setBrands(Array.from(setOfBrands));
    }

    const setPriceBracket =()=> {
        if(searchResults.length > 0) {
            
            let minPrice = Number.MAX_SAFE_INTEGER;
            let maxPrice = Number.MIN_SAFE_INTEGER;
            searchResults.forEach((product)=>{
                if(product.discountedPrice > maxPrice) maxPrice = product.discountedPrice;
                if(product.discountedPrice < minPrice) minPrice = product.discountedPrice;
            })
            setPrice([minPrice, maxPrice]);
        }
    }

    useEffect(()=>{
        const fetchSearchResults =()=> {
            setSearchResults(products);
            setFilteredResults(products);
        }
        fetchSearchResults();
    }, [])

    useEffect(()=>{
        setPriceBracket();
        setBrandsfromSearchResults();
    },[searchResults])

    return({
        searchResults,
        brands,
        setBrands,
        price,
        setPrice,
        filteredResults,
        setFilteredResults,
    })
}

export default useSearchResults;