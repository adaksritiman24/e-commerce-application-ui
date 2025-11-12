import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const GiftCard =()=> {
  return (
    <Card sx={{
        margin: 1.5
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Happy Birthday
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Rs: 4000
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a small present from my side.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GiftCard;