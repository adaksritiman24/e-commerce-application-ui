import { Box, Paper, styled } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { IMAGE_SERVER_BASE_URL } from '../../constants'
import {calculateTotalDiscountPercentage} from "../../common/utils/helpers"

const BoxContainingImage = styled(Box)({
    width : "100%",
    height : "100%",
    display : "flex",
    justifyContent : "center",

    
})

const PromotionCard =({
    product
})=> {
  return (
    <Paper
        elevation={6}
        sx={{
            aspectRatio : "1/1",
            margin : {
                lg :"20px",
                md : "10px",
                xs : "10px",
            },
            overflow : "hidden",
            padding : "30px",
            background : "white",
            position : "relative",
            cursor : "pointer",
        }}
    >
        <BoxContainingImage>
            <img 
                
                src={`${IMAGE_SERVER_BASE_URL}${product.images[0]["url"]}`}
            />
        </BoxContainingImage>
        <Box
            sx={{
                background : red[500],
                position : "absolute",
                top : 0,
                right : 0,
                color : "white",
                fontFamily : "sans-serif",
                p: 1,
                boxShadow : "1px 1px 12px grey",
                borderBottomLeftRadius : "6px",
            }}
        >
           {calculateTotalDiscountPercentage(product.normalPrice, product.discountedPrice)}% off
        </Box>
    </Paper>
  )
}

export default PromotionCard