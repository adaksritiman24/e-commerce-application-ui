import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { IMAGE_SERVER_BASE_URL } from '../../constants'
import classes from "./HomePage.module.css";

const CategoriesDisplay =({
    displayedCategories
})=> {
  return (
    <Box
        mb={4}
        >
        <Typography
            
            variant="h3"
            sx={{
            fontSize: {
                md: "48px",
                sm: "34px",
                xs: "24px",
            },
            textAlign : "center",
            m : "10px",
            }}
            className={classes.bannerHeading}
            fontWeight="bold"
        >
            Shop by Categories
        </Typography>
        <Grid container
            spacing={1}
            >

            {displayedCategories.map((displayedCategory, index)=>(
                <Grid lg={4} sm={6} xs={12}
                    item
                    key={index}
                    sx={{
                        aspectRatio : "2 / 1",
                    }}
                >
                    <Box
                        sx={{
                            height : "100%",
                            position : "relative",
                            overflow : "hidden",
                            borderRadius : "10px",
                            border: "3px solid white",
                            cursor : "pointer",
                        }}
                        className={classes.categoryBanner}
                    >
                        <Box
                            sx={{
                                zIndex : "2",
                                position : "absolute",
                                width : "100%",
                                height : "100%",
                                display : "flex",
                                justifyContent : "center",
                                alignItems : "center",
                                background : "rgb(20,20,20,0.575)",
                                color : "white",
                                transition : "1.2s"
                            }}
                        >
                            <Typography
                                variant="p"
                                sx={{
                                fontSize: {
                                    md: "48px",
                                    sm: "36px",
                                    xs: "34px",
                                },
                                
                                }}
                                className={classes.bannerHeading}
                            >
                                {displayedCategory.name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{

                                height : "100%",
                                background : `url(${IMAGE_SERVER_BASE_URL}${displayedCategory.image}) no-repeat`,
                                backgroundOrigin: "border-box",
                                backgroundSize : "cover",
                                transition : "0.6s",

                            }}
                        >

                        {/* <img src={`${IMAGE_SERVER_BASE_URL}${displayedCategory.image}`} alt={displayedCategory.name}/> */}
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
  )
}
export default CategoriesDisplay
