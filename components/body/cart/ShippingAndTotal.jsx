import { Box, Button, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CreateIcon from '@mui/icons-material/Create';
import { DeliveryAddressContext } from "../../../modals/DeliveryAddressModalProvider";
import PaymentModalProvider, { PaymentContext } from "../../../modals/payments/PaymentModalProvider";


const PaymentButton = ()=> {
  const {setPaymentModalOpen} = useContext(PaymentContext);
  return (
      <Button
        variant="contained"
        sx={{
          mt: "10px",
          textTransform : "none",
        }}
        color="success"
        onClick={()=>setPaymentModalOpen(true)}
      >
        Proceed to Payments
      </Button>
  );
}

const ShhippingAndTotal = ({ totalAmount, deliveryAddress }) => {
  const {setDeliveryAddressOpen, setDeliveryAddress} = useContext(DeliveryAddressContext);

  const editDeliveryAddress =()=> {
    console.log("Current Delivery Address: ", deliveryAddress);
    setDeliveryAddress(deliveryAddress);
    setDeliveryAddressOpen(true);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          m: "10px",
          background: grey[200],
          p: "15px",
        }}
      >
        {deliveryAddress == null ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setDeliveryAddressOpen(true)}
              sx={{
                textTransform: "none",
              }}
            >
              Add delivery address
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{
              display : "flex",
              flexDirection : "row",
              justifyContent: "center",
              alignItems : "center",
            }}>
              <Typography variant="h5" mr={1}>
                Shipping Details
              </Typography>
              <IconButton
                disableTouchRipple
              onClick={editDeliveryAddress}>
                <CreateIcon 
                  sx={{
                    cursor : "pointer",
                    color : grey[800],
                  }}
                  
                />
              </IconButton>
            </Box>

            <hr />
            <Typography variant="h6">{deliveryAddress.name}</Typography>
            <Box color={grey[700]}>
              <Box
                sx={{
                  display: "flex",
                  mb: "4px",
                }}
              >
                <FmdGoodIcon
                  sx={{
                    mr: "4px",
                  }}
                />
                <Box>
                  <Typography>
                    {deliveryAddress.house}, {deliveryAddress.locality}
                  </Typography>
                  <Typography>
                    {deliveryAddress.city}, {deliveryAddress.country}
                  </Typography>
                  <Typography>Pin code: {deliveryAddress.pincode}</Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocalPhoneIcon
                  sx={{
                    mr: "4px",
                  }}
                />{" "}
                {deliveryAddress.phone}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon
                  sx={{
                    mr: "4px",
                  }}
                />{" "}
                {deliveryAddress.email}
              </Typography>
            </Box>
            <PaymentModalProvider>
              <PaymentButton/>
            </PaymentModalProvider>
          </Box>
        )}
        <Box
          sx={{
            mt: {
              md: "0",
              xs: "14px",
            },
          }}
        >
          <Typography>Net Payble Amount:</Typography>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: {
                md: "32px",
                xs: "26px",
              },
            }}
          >
            {getFormattedPrice(totalAmount)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ShhippingAndTotal;
