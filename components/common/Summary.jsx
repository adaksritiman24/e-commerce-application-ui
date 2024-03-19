import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { getFormattedPrice } from './utils/helpers';
import { grey } from '@mui/material/colors';

const Summary =({total, subtotal, tax, shippingCost})=> {
  return (
    <Paper
        sx={{
            borderRadius : "2px",
            overflow: "hidden"
        }}
        elevation={4}
    >
        <Box
            variant="caption"
            sx={{
                px: "50px",
                pt: "10px",
                pb: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "helvetica",
                background : grey[700],
                color: "white",
                textAlign: "center"
            }}
        >Order Summary</Box>
        <Box
            sx={{
                "& .MuiBox-root" : {
                    display: "flex",
                    justifyContent: "space-between",
                    pt: "8px",
                    mx: "4px",
                    fontFamily: "Trebuchet MS",
                }
            }}
        >
            <Box>
                <Box>SubTotal:</Box>
                <Box>{getFormattedPrice(subtotal)}</Box>
            </Box>
            <Box>
                <Box>Total Tax:</Box>
                <Box>{getFormattedPrice(tax)}</Box>
            </Box>
            <Box>
                <Box>Shipping Cost:</Box>
                <Box>{getFormattedPrice(shippingCost)}</Box>
            </Box>
        </Box>
        <Box
        sx={{
            "& .MuiBox-root" : {
                display: "flex",
                justifyContent: "space-between",
                py: "4px",
                px: "8px",
                mt: "12px",
                borderTop: "0.5px solid gray"
            }
        }}
        >
            <Box>
                <Typography variant='h6' fontWeight={600}>Total: </Typography>
                <Typography variant='h6' fontWeight={600}>{getFormattedPrice(total)}</Typography>
            </Box>
        </Box>
    </Paper>
  )
}

export default Summary;