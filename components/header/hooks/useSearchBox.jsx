import { useEffect, useState } from "react";


const useSearchBox = ()=> {

    const [recentSearchList, setRecentSearchList] = useState([]);


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
            recentSearchlistJSON.unshift(newSearch)
            recentSearchlistJSON = recentSearchlistJSON.splice(0,15);

            setRecentSearchList(recentSearchlistJSON);
            localStorage.setItem(
                "recentSearch",
                JSON.stringify(recentSearchlistJSON)
            )

        }
    }

    useEffect(()=> {
        getRecentSearches();
    },[])

    return {
        recentSearchList,
        setRecentSearches
    }
}
export default useSearchBox;