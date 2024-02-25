import axios from 'axios';
import React from 'react'
import ProductPage from '../../components/body/product/ProductPage'
import { SPRING_BOOT_BASE_URL } from '../../components/constants';
import Header from '../../components/header/Header'
import Footer from '../../components/common/Footer';

function ProductPageEntry({
  product
}) {

  return (
    <>
        <Header/>
        <ProductPage product={product}/>
        <Footer/>
    </>
  )
}

export default ProductPageEntry;

export const getServerSideProps = async(context)=>{

  const {productId} = context.query;

  try {
    const product = await axios.get(`${SPRING_BOOT_BASE_URL}/products/${productId}`);
    return({
      props : {
        product : product.data
      }
    })
  }
  catch(error) {
    return({
      props : {
        product : null
      }
    })
  }
}