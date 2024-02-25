import React from 'react'
import CartPageBody from '../../components/body/cart/CartPageBody'
import Header from '../../components/header/Header'
import Footer from '../../components/common/Footer'
import { Box } from '@mui/material'

const CartPage=()=> {
  return (
    <>
    <Box
      sx={{
        display : "flex",
        flexDirection : "column",
        height : "100vh",
      }}
    >
        <Header/>
        <CartPageBody/>
        <Footer/>
        </Box>
    </>
  )
}

export default CartPage