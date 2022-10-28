import { Checkbox, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'

const BrandSelectComponent =({
    brands
})=> {
  return (
    <Box
        sx={{
            borderTop : "1px solid rgba(0,0,0,0.2)",
            maxHeight : "220px",
            overflow : "scroll"
        }}
    >
        {brands.map((brand, index)=>(
            <Box key={index}
                sx={{
                    display : "flex",
                    padding : 0.5,
                }}
            >
                <Checkbox
                    sx={{
                        padding : "4px",
                        '&.Mui-checked': {
                            color: grey[600],
                        },
                    }}
                />
                <Typography
                    sx={{
                        display : "flex",
                        alignItems: "center"
                    }}
                >
                    {brand}
                </Typography>
            </Box>
        ))}
    </Box>
  )
}

export default BrandSelectComponent