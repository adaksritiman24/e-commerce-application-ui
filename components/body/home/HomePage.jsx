import { Box } from '@mui/material';
import React from 'react'
import useHomePage from '../hooks/useHomePage'
import Banner from './Banner'
import CategoryPromotion from './CategoryPromotion';
import JointPromotion from './JointPromotion';
import classes from "./HomePage.module.css";
import CategoriesDisplay from './CategoriesDisplay';
import { homePageDisplayedCategories } from '../../../dummy_data/categories';

const HomePage =()=> {
    const {
        bannerPromotions,categoryPromotions
    } = useHomePage();
  return (
    <>
      <div
        className={classes.bannerHeading}
      >
        
        <Banner bannerPromotions={bannerPromotions}/>
        <Box
          sx={{
            mx : {
              xs : "10px",
              md : "2vw"
           }
        }}
        >
        
        <CategoryPromotion categoryPromotion={categoryPromotions[0]}/>
        </Box>
        <Box
          sx={{
            mx : {
              xs : "10px",
              md : "2vw"
           }
        }}
        >
        
        <JointPromotion categoryPromotion1={categoryPromotions[1]} categoryPromotion2={categoryPromotions[2]}/>
        </Box>
        <Box
          sx={{
            mx : {
              xs : "10px",
              md : "2vw"
           }
        }}
        >
        
        <CategoriesDisplay displayedCategories={homePageDisplayedCategories}/>
        </Box>
      </div>
    </>
  )
}

export default HomePage