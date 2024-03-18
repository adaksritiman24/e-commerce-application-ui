import { Box, Button, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { useState } from 'react'
import ReviewItem from './ReviewItem'

const Review =()=> {

    const [rating, setRating]= useState(1);
    const [reviewText, setReviewText] = useState("");

  return (
    <Box sx={{
        display: "flex",
        mx: { 
            xl: "130px",
            lg: "80px",
            md: "60px",
            sm: "40px",
            xs: "20px",
            },
        mt : "60px",
        flexDirection: {
            md: "row", 
            xs: "column"
        },
        justifyContent: "space-between"
    }}>
        <Box sx={{
            flex : 3,
        }}>
            <Typography variant='h5' fontWeight={600} mb={1}>Ratings</Typography>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                <Box sx={{
                    mr: 1
                }}>
                    <Rating value={2} sx={{fontSize: "30px"}} readOnly/>
                </Box>

                <Typography variant='h6' fontWeight={400}>2 out of 5</Typography>
            </Box>
            <Typography variant='subtitle1' color={grey[600]}>112 total ratings</Typography>
            <Paper sx={{
                p: 2,
                my: 2,
            }} elevation={3}>
                 <Typography variant='subtitle1'><b>Rate this Product:</b></Typography>
                <Rating
                    sx={{
                        mt: 2,
                    }}
                    name="simple-controlled"
                    value={rating}
                    onChange={(_, newRating)=>setRating(newRating)}
                />
               <Box sx={{fontFamily: "helvetica", fontSize: "14px", ml:"2px", color: grey[600]}}>Your Rating: {rating}/5</Box>
                <TextField
                    sx={{
                        mt: 2,
                        width : "100%"
                    }}
                    label="Write a Review (Optional)"
                    multiline
                    value={reviewText}
                    rows={4}
                    onInput={({value})=>setReviewText(value)}
                />
                <Button color='primary' variant='contained' sx={{ mt: 2}}>Submit</Button>
            </Paper>
        </Box>
        <Box sx={{
            flex : 6,
            ml: 2,
        }}>
            <Typography variant='h5' fontWeight={600} mb={2}>Customer Reviews</Typography>
            <Box>
                <ReviewItem/>
                <ReviewItem/>
                <ReviewItem/>
                <ReviewItem/>
            </Box>
        </Box>
    </Box>
    
  )
}

export default Review