import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


const useSearchBox = ()=> {

    const [recentSearchList, setRecentSearchList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showSearchDrawer, setShowSearchDrawer] = useState(false);

    const router = useRouter();


    const getRecentSearches =() => {
        const recentSearch = localStorage.getItem("recentSearch");
        if(recentSearch !== null) {
            setRecentSearchList(JSON.parse(recentSearch))
        }    
    }

    const setRecentSearches = (newSearch)=> {
        const recentSearch = localStorage.getItem("recentSearch");

        if(recentSearch == null) {

            setRecentSearchList([newSearch])
            localStorage.setItem(
                "recentSearch",
                JSON.stringify([newSearch])
            );
        }
        else {
            const recentSearchlistJSON = JSON.parse(recentSearch);
            //remove duplicates
            recentSearchlistJSON.unshift(newSearch)
            recentSearchlistJSON = [...new Set(recentSearchlistJSON)]
            recentSearchlistJSON = recentSearchlistJSON.splice(0,15);

            setRecentSearchList(recentSearchlistJSON);
            localStorage.setItem(
                "recentSearch",
                JSON.stringify(recentSearchlistJSON)
            )

        }
    }

    const handleSearch = useCallback(()=> {
        if(searchText.trim() !== ""){
            setShowSearchDrawer(false);
            // location.href =`/search?text=${searchText.trim()}`;
            router.push(`/search?text=${searchText.trim()}`);
            setRecentSearches(searchText);
            document.activeElement.blur();
        }
    },[searchText])

    const handleRecentSearch = (recentSearchTerm)=> {
        setShowSearchDrawer(false);
        // location.href =`/search?text=${searchText.trim()}`;
        router.push(`/search?text=${recentSearchTerm}`);
        setRecentSearches(recentSearchTerm);
        document.activeElement.blur();

    }

    useEffect(()=> {
        getRecentSearches();
    },[])

    return {
        recentSearchList,
        setRecentSearches,
        handleRecentSearch,
        handleSearch,
        searchText,
        setSearchText,
        showSearchDrawer,
        setShowSearchDrawer
    }
}
export default useSearchBox;