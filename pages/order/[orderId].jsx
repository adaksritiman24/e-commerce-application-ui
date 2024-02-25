import React from 'react'
import Header from '../../components/header/Header'
import OrderPageBody from '../../components/body/order/OrderPageBody'
import axios from 'axios';
import { SPRING_BOOT_BASE_URL } from '../../components/constants';
import Footer from '../../components/common/Footer';

const OrderPage=({orderData})=> {
  console.log("OrderData: ", orderData);
  return (
    <>
        <Header/>
        <OrderPageBody orderData={orderData}/>
        <Footer/>
    </>
  )
}

export default OrderPage;

export const getServerSideProps = async(context)=>{

  const {orderId} = context.query;
  try {
    const response = await axios.get(`${SPRING_BOOT_BASE_URL}/order/${orderId}`);

    return({
      props : {
        orderData : response.data
      }
    })
  }
  catch(error) {
    console.log("Error fetching order: ", error);
    return({
      props : {
        orderData : null
      }
    })
  }
}