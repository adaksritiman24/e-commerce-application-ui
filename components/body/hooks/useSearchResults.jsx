import { useEffect, useState } from "react"
import { products } from "../../../dummy_data/products";


const useSearchResults = ()=>{
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        const fetchSearchResults =()=> {
            setSearchResults(products)
        }
        fetchSearchResults();
    }, [])

    return({
        searchResults
    })
}

export default useSearchResults;