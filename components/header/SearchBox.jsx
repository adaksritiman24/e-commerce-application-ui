import { Close, Search } from '@mui/icons-material';
import {Box, Fade, InputAdornment, InputBase, styled } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import React, { useState } from 'react'
import SearchDrawer from './SearchDrawer';

const SearchArea = styled(Box);


const CustomCloseIcon = (props)=> {
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
            onClick = {()=>props.setSearchText("")}
        >
            <Close sx={{
                fontSize : "26px"
            }}
            />
        </Box>
    )
}

const SearchIcon = (props)=> {
    return (
        <Box
            sx={{
                bgcolor: green[900],
                display: "flex",
                alignItems: "center",
                width: "45px",
                borderTopRightRadius : "2px",
                borderBottomRightRadius : "2px",
                cursor: "pointer"
            }}
            onClick = {props.setSearchText}
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
    const [searchText, setSearchText] = useState("");
    const [showSearchDrawer, setShowSearchDrawer] = useState(false);
    const placeHolder = "Smartphones, TVs, Shirts, Watches..."
  return (
    <Box>
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
                    margin : "0px 10px",
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
                    endAdornment = {searchText !=="" && <CustomCloseIcon setSearchText={setSearchText}/>}
                    autoFocus={false} 
                    onClick={()=>setShowSearchDrawer(true)}
                />
                <SearchIcon/>
                { showSearchDrawer && <SearchDrawer showSearchDrawer={showSearchDrawer} setShowSearchDrawer={setShowSearchDrawer}/>}
                
            </Box>
            
        </Box>
        
    </Box>
  )
}

export default SearchBox