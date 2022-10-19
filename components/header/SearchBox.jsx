import { Close, Search } from '@mui/icons-material';
import {Box, Fade, InputAdornment, InputBase, styled } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useSearchBox from './hooks/useSearchBox';
import SearchDrawer from './SearchDrawer';


const CustomCloseIcon = (props)=> {
    const handleSearchClose = ()=>{
        props.setSearchBoxFocussed(true);
        props.setSearchText("");
    }

    return (
        <Box
            sx= {{
                position : "absolute",
                right : "0",
                bgcolor : grey[300],
                display : "flex",
                mr : "4px",
                alignItems : "center",
                cursor: "pointer"
            }}
            onClick = {handleSearchClose}
        >
            <Close sx={{
                fontSize : "26px"
            }}
            />
        </Box>
    )
}

const SearchIcon = (props)=> {

    const focussed = props.searchBoxFocussed;

    return (
        <Box
            sx={{
                bgcolor: focussed ? green[900] : grey[800],
                display: "flex",
                alignItems: "center",
                width: "45px",
                borderTopRightRadius : "2px",
                borderBottomRightRadius : "2px",
                cursor: "pointer"
            }}
            onClick = {props.handleSearch}
        >
            <Search sx={{
                    color : "white",
                    flexGrow : 1,
                    fontSize : "35px",
                    
            }}
            />
        </Box>
    )
}

const SearchBox=() =>{

    const router = useRouter();
    const [searchFocussed, setSearchFocussed] = useState(false);
    const [searchBoxFocussed, setSearchBoxFocussed] = useState(false);
    const placeHolder = "Smartphones, TVs, Shirts, Watches...";

    const { 
        recentSearchList, 
        handleRecentSearch,
        showSearchDrawer,
        setShowSearchDrawer,
        handleSearch,
        setSearchText,
        searchText
    } = useSearchBox();

    

    const listenForEnter = (e)=> {
        setShowSearchDrawer(true);
        if(e.key === "Enter")
            handleSearch();
    }

    useEffect(()=>{
        const {text} = router.query;
        if(text !== undefined)
            setSearchText(text);
    },[router.query])

  return (
    <Box
        sx={{
            flexGrow : 1
        }}
    >
        <Box
        sx={{
            height : "100%",
            display : "flex",
            alignItem : "center",
        }}
        >
            <Box
                sx={{
                    flexGrow : 1,
                    display: "flex",
                    alignItem: "center",
                    py:"15px",
                    position: "relative",
                    
                }}
            >
                <InputBase
                    sx={{
                        flexGrow : 1,
                        outlineColor: "black",
                        
                        "& .MuiInputBase-input" : {
                            bgcolor : grey[200],
                            borderRadius: "2px",
                            borderTopRightRadius : "0",
                            borderBottomRightRadius : "0",
                            padding : "5px",
                            fontSize : "22px",
                            pl: "10px",
                            outline : "black",
                            "&:focus" : {
                                boxShadow : "1px 1px 10px 1px darkgreen",
                            },
                            border:"0.5px solid green",
                        }
                    }}
                    inputProps = {{
                        "placeholder" : placeHolder,
                    }}
                    value= {searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    onKeyDown={listenForEnter}
                    endAdornment = {searchText !=="" && <CustomCloseIcon 
                                                            setSearchText={setSearchText} 
                                                            setSearchBoxFocussed={setSearchBoxFocussed}
                                                            />}
                    autoFocus={searchBoxFocussed} 
                    onClick={()=>setShowSearchDrawer(true)}
                    onFocus={()=>setSearchBoxFocussed(true)}
                    onBlur={()=>setSearchBoxFocussed(false)}
                />
                <SearchIcon 
                    handleSearch={handleSearch}
                    searchBoxFocussed={searchBoxFocussed}
                    />
                { showSearchDrawer && recentSearchList.length > 0 &&
                    <SearchDrawer 
                        showSearchDrawer={showSearchDrawer} 
                        setShowSearchDrawer={setShowSearchDrawer}
                        recentSearchList={recentSearchList}
                        handleRecentSearch={handleRecentSearch}
                    />}
                
            </Box>
            
        </Box>
        
    </Box>
  )
}

export default SearchBox