import { Button } from '@mui/material'
import React from 'react'

const AddToCart=({
    addToCartWithQuantity1,
})=> {
    
  return (
    <>
        <Button variant='contained'
            sx={{
                textTransform : "none"
            }}
            size = "large"
            onClick={addToCartWithQuantity1}
         >Add To Cart</Button>

    </>
  )
}

export default AddToCart