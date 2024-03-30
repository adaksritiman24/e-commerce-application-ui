import axios from "axios";
import { useEffect, useState } from "react"
import { SPRING_BOOT_BASE_URL } from "../../constants";


const useSearchResults = (searchTerm, setLoading)=>{
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
        const fetchSearchResults = async()=> {

            try{
                setLoading(true);
                const response = await axios.get(`${SPRING_BOOT_BASE_URL}/products/search/${searchTerm}`)
                setTimeout(()=>{
                    setSearchResults(response.data);
                    setFilteredResults(response.data);
                    setLoading(false);
                },1000);
                
            }
            catch (error){
                console.log(error);
                setSearchResults([]);
                setFilteredResults([]);
                setLoading(false);
            }
            
        }
        fetchSearchResults();
    }, [searchTerm])

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