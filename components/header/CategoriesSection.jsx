import { Box, Chip, useMediaQuery, useTheme } from '@mui/material'
import { deepPurple, green, grey } from '@mui/material/colors';
import React from 'react'
import useCategories from './hooks/useCategories'

const CategoriesSection =()=> {
    const {categories} = useCategories();
    const themes = useTheme();

    const isDesktop = useMediaQuery(themes.breakpoints.up("lg"));
  return (
    <Box
        sx={{
            background : deepPurple[500],
            padding : "3px",
        }}
    >
        {
            categories.map((category, index)=> (
                <Chip 
                    label={category.name}
                    key={index}
                    sx={{
                        background : deepPurple[700],
                        color : grey[200],
                        fontSize : isDesktop ? "18px" : "14px",
                        m : "5px",
                        p : "4px",
                        cursor : "pointer",
                        ":hover":{
                            background : deepPurple[800]
                        },
                        borderRadius : "3px"
                   
                    }}
                />
            ))
        }
    </Box>
  )
}

export default CategoriesSection