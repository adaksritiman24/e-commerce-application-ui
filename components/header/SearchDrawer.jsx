import { Box, Chip, Drawer, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import { border } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import classes from "./SearchDrawer.module.css";

const SearchDrawer=(props)=> {

    const searchDrawerRef = useRef(null);

    const showSearchDrawer = props.showSearchDrawer;
    const setShowSearchDrawer = props.setShowSearchDrawer;

    const handleChipClick = (e)=> {
        console.log("Chip is clicked!");
    }

    useEffect(()=>{
        const removeComponentOnOutsideClick=(event)=>{
            console.log("Here");
            if(searchDrawerRef.current && !searchDrawerRef.current.contains(event.target))
                setShowSearchDrawer(false);
        }

        document.addEventListener("mousedown", removeComponentOnOutsideClick);
        return ()=>{
            document.removeEventListener("mousedown",removeComponentOnOutsideClick)
        }
    },[])
    
    console.log(showSearchDrawer);

  return (
    <Paper
        ref={searchDrawerRef}
        elevation={6}
        sx= {{
            position: "absolute",
            background : "white",
            width: "100%",
            borderRadius : "4px",
            top: "57px",
            
        }}
        className={classes.animatedDrawer}
    >
        <Box>
            <Chip 
                label="smartphone under 10k" 
                variant='outlined'
                sx={{
                    m: "10px",
                    "&:hover": {
                        background: grey[200],
                    },
                    cursor: "pointer"
                    
                }}
                onClick={handleChipClick}
                
                />
        </Box>
    </Paper>
  )
}

export default SearchDrawer