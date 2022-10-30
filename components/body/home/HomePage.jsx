import React from 'react'
import useHomePage from '../hooks/useHomePage'
import Banner from './Banner'

const HomePage =()=> {
    const {
        bannerPromotions
    } = useHomePage();
  return (
    <>
        <Banner bannerPromotions={bannerPromotions}/>
    </>
  )
}

export default HomePage