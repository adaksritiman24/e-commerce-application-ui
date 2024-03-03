import { Box } from '@mui/material'
import { grey, orange} from '@mui/material/colors'
import React from 'react'

const CarousalButton =({
    numberOfCards,
    selectedPosition
}) =>{
  return (
    <Box
        sx={{
            display : "flex",
            zIndex : "2",
            position : "absolute",
            bottom : 18,
            left : "50%",
            transform: "translateX(-50%)",
        }}
    >
        {Array(numberOfCards).fill(0).map((_, index)=>(
            <Box
                key={index}
                sx={{
                    width : "60px",
                    height : "3px",
                    background : index === selectedPosition ? orange[800]:  grey[300],
                    m : "6px",
                    transition : "0.9s"
                }}

            >

            </Box>
        ))}
    </Box>
  )
}

export default CarousalButton