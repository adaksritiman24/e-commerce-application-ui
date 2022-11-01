import { Box } from '@mui/material';
import React from 'react'
import useHomePage from '../hooks/useHomePage'
import Banner from './Banner'
import CategoryPromotion from './CategoryPromotion';
import JointPromotion from './JointPromotion';

const HomePage =()=> {
    const {
        bannerPromotions,categoryPromotions
    } = useHomePage();
  return (
    <>
        <Banner bannerPromotions={bannerPromotions}/>
        <Box
          sx={{
            mx : {
              xs : "10px",
              md : "10vw"
           }
        }}
        >
        
        <CategoryPromotion categoryPromotion={categoryPromotions[0]}/>
        </Box>
        <Box
          sx={{
            mx : {
              xs : "10px",
              md : "10vw"
           }
        }}
        >
        
        <JointPromotion categoryPromotion1={categoryPromotions[0]} categoryPromotion2={categoryPromotions[1]}/>
        </Box>
    </>
  )
}

export default HomePage