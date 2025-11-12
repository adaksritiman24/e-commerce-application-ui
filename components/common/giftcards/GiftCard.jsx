import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getFormattedPrice } from '../utils/helpers';
import { Box, Divider } from '@mui/material';
import { green, red } from '@mui/material/colors';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const GiftCard =({
  giftcard
})=> {
  return (
    <Card sx={{
        backgroundColor: green[50]
    }} elevation={3}>
      <CardContent>
        <Box
          sx={{
              display: "flex",
              justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div" fontWeight={500}>
            {giftcard.title}
          </Typography>
          <CardGiftcardIcon fontSize='large' sx={{
            color: red[200]
          }}/>
        </Box>
        <Typography sx={{ mb: 1.5 }}>
            {getFormattedPrice(giftcard.amount)}
        </Typography>
        <Divider />
        <Box
          sx={{
            mt: 1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {giftcard.description}
          </Typography>
          <Typography variant='body1' color="text.secondary" textAlign="end">
            - {giftcard.issuer}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GiftCard;