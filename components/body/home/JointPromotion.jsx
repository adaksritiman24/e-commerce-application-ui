import { Box, Grid, Paper, Typography } from '@mui/material'
import { blue, green, grey, purple } from '@mui/material/colors'
import React from 'react'
import PromotionCard from './PromotionCard'


const CategoryPromotionForJointCategory = ({
    categoryPromotion
})=>{
    return (
        <Grid
        container
            sx={{
            margin: "auto",
            }}
        >
            {categoryPromotion.items.map((item, index)=>(

            <Grid
            item
            xs={12}
            sm={6}
            lg={6}
            key={index}
            >
                <PromotionCard product={item}/>
            </Grid>
            ))}
        </Grid>
    )
}


const JointPromotion =({
    categoryPromotion1,
    categoryPromotion2
})=> {
  return (
    <Box
        sx={{
            background : `linear-gradient(-180deg,${blue[200]},white)`,
            mt : 1
        }}
    >
    <Grid container>
        {[categoryPromotion1, categoryPromotion2].map((categoryPromotion, index)=>(
            <Grid item lg={6} xs={12} key={index}>
            <Paper
                elevation={4}
                sx={{
                    m : 4,
                    p : 4,
                }}
            >
                <Typography
            sx={{
                fontWeight : "600",
                fontSize : "22px",
            }}
            >
                {categoryPromotion.title}
            </Typography>
            <CategoryPromotionForJointCategory categoryPromotion={categoryPromotion}/>
            </Paper>
        </Grid>
        ))}
    </Grid>
     
    </Box>
  )
}

export default JointPromotion