import { Box, Chip } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import React from 'react'
import useCategories from './hooks/useCategories'

const CategoriesSection =()=> {
    const {categories} = useCategories();
  return (
    <Box
        sx={{
            background : grey[500],
            padding : "3px",
            overflowX : "scroll",
        }}
    >
        {
            categories.map((category, index)=> (
                <Chip 
                    label={category.name}
                    sx={{
                        background : grey[700],
                        color : grey[200],
                        fontSize : "18px",
                        m : "5px",
                        p : "4px",
                        cursor : "pointer",
                        ":hover":{
                            background : grey[800]
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