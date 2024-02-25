import {
  Box,
  FormControl,
  FormControlLabel,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useState } from "react";
import BankCardForm from "./forms/BankCardForm";
import GiftCardForm from "./forms/GiftCardForm";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  zIndex: 5000,
};

const paymentFormStyles = {
  "& span": {
    py: "1px",
  },
};


const PaymentMethods = ({ paymentModes }) => {
  if (!paymentModes) {
    return <></>;
  }
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(
    paymentModes[0]
  );

  const handlePaymentModeChange = ({ target }) => {
    setSelectedPaymentMode(target.value);
  };
  return (
    <>
      <Box
        sx={{
          m: 2,
        }}
      >
        <FormControl>
          <Box
            sx={{
              fontSize: "16px",
              fontFamily: "arial",
              mt: 1,
              mb: 1,
            }}
          >
            Select Payment Type:
          </Box>
          <RadioGroup
            aria-labelledby="paymentMethods-radioButtons"
            defaultValue={paymentModes[0]}
            onChange={(e) => handlePaymentModeChange(e)}
          >
            <FormControlLabel
              sx={paymentFormStyles}
              value={paymentModes[0]}
              control={<Radio />}
              label={
                <div style={{ display: "flex" }}>
                  <CreditCardIcon />
                  {paymentModes[0]}
                </div>
              }
            />
            <FormControlLabel
              sx={paymentFormStyles}
              value={paymentModes[1]}
              control={<Radio />}
              label={
                <div style={{ display: "flex" }}>
                  <CardGiftcardIcon />
                  {paymentModes[1]}
                </div>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {selectedPaymentMode === "Credit/Debit Card" && <BankCardForm/>}
      {selectedPaymentMode === "Buzz Giftcard" && <GiftCardForm />}
    </>
  );
};

const PaymentModal = ({
  paymentModalOpen,
  setPaymentModalOpen,
  paymentData,
  setPaymentData,
}) => {
  return (
    <Modal
      open={paymentModalOpen}
      onClose={() => setPaymentModalOpen(false)}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      sx={{
        "& button": {
          textTransform: "none",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          ...style,
          width: {
            lg: "500px",
            sm: "500px",
            xs: "320px",
          },
          boxSizing: "border-box",
          overflow: "hidden",
          transition: "2s",
        }}
      >
        <Typography
          id="login-modal-title"
          variant="h6"
          component="h2"
          fontWeight="600"
        >
          <Paper
            elevation={4}
            sx={{
              p: 2,
              borderRadius: 0,
              backgroundColor: "rgb(5, 6, 7)",
              color: grey[100],
              fontFamily: "arial",
            }}
          >
            Add Payment Details
          </Paper>
          <PaymentMethods paymentModes={paymentData.paymentModes}/>
        </Typography>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
