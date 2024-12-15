import { Avatar, Rating, Typography } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { getColorCoding } from '../../../common/utils/helpers';
import Image from 'next/image';

const ReviewItem =({rating, text, name, profilePicture})=> {

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
            {
                null == profilePicture?
                <>
                    <Avatar sx={{ bgcolor: getColorCoding(name) , width: 32, height: 32 , fontSize: "12px" , mr: "4px"}} variant='rounded'>
                        {getInitials(name)}
                    </Avatar>
                </> :
                <>
                    <Box sx={{
                        mr: 1
                    }}>
                        <Image width={32} height={32} src={profilePicture} style={{
                            borderRadius: 5,
                        }}/>
                    </Box>
                </>
            }
            <Stack>
                <Typography variant='h6' sx={{color: grey[800], fontSize: "18px", fontWeight: "bold"}}>{name}</Typography>
                <Rating value={rating} size="small" readOnly />
                <p style={{
                    marginTop: "5px",
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color : grey[700],
                    marginBottom: "24px"
                }}>
                    {text}
                </p>
            </Stack>
        </Stack>
        
    </Box>
  )
}

export default ReviewItem;