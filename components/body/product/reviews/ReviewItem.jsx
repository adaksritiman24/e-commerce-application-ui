import { Avatar, Rating, Typography } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react'
import { useState } from 'react';

const ReviewItem =()=> {
    const [value, setValue]= useState(2);

    const getInitials = useCallback((name)=> {
        var initials = "";
        var names = name.split(" ");
        for(let n of names) {
            initials+=n[0];
        }
        return initials;
    }, []);

  return (
    <Box>
        <Stack direction="row">
            <Avatar sx={{ bgcolor: deepOrange[500] , width: 32, height: 32 , fontSize: "12px" , mr: "4px"}} variant='rounded'>
                {getInitials("Sritiman Adak")}
            </Avatar>
            <Stack>
                <Typography variant='h6' sx={{color: grey[800], fontSize: "18px", fontWeight: "bold"}}>Sritiman Adak</Typography>
                <Rating value={value} size="small" readOnly />
                <p style={{
                    marginTop: "5px",
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color : grey[700],
                    marginBottom: "24px"
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur expedita minus, temporibus minima sint assumenda. Aspernatur eligendi dignissimos quibusdam officia consectetur minima, eaque impedit nostrum repellat. Nostrum illo inventore fugit quaerat delectus repellendus esse rerum optio dolorum sint reiciendis aut tenetur amet doloremque neque, itaque, laudantium accusantium consectetur perspiciatis eius.
                </p>
            </Stack>
        </Stack>
        
    </Box>
  )
}

export default ReviewItem;