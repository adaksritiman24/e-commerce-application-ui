import { Box, Card, CardContent, Typography } from '@mui/material'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React from 'react'
import { grey } from '@mui/material/colors';
import { color, height } from '@mui/system';

const ProductCard =({
    product
})=> {
  return (
    <Card>
        <Box
            sx ={{
                height : "320px"
            }}
        >
            { product.images.length > 0 ? 
                <img src='something' alt='NF' height={4}/>
                :
                <Box
                    sx={{
                        height : "100%",
                        width : "100%",
                        background : grey[300],
                    }}
                >
                    <InsertPhotoIcon
                        sx={{
                            color : grey[400],
                            height : "320px",
                            width : "100%",
                        }}
                    />
                </Box>
            }
            
        </Box>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div"
                sx={{
                    fontWeight : "600",
                    color: grey[700]
                }}
            >
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.productDetails.splice(0,79)}
            </Typography>
        </CardContent>
  </Card>
  )
}

export default ProductCard