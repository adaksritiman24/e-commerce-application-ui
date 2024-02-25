import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    styled,
  } from "@mui/material";
  import { grey } from "@mui/material/colors";
  import CreditCardIcon from "@mui/icons-material/CreditCard";
  import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "../PaymentModalProvider";
import PaymentFormLoader from "../loaders/PaymentFormLoader";
import { getFormattedPrice } from "../../../components/common/utils/helpers";

const SubmitPaymentButton = styled("button")({
    color: grey[200],
    borderRadius: "8px",
    fontFamily: "Arial",
    padding: "14px",
    fontSize: "20px",
    border: "none",
    transition: "0.45s",
  });

const BankCardForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { paymentData, setPaymentData } = useContext(PaymentContext);
  const {placeOrder, cartTotal} = useContext(PaymentContext);

  const handlePaymentSubmit = ()=> {
    const bankCard = {
      cardNumber : paymentData.bankCardDetails.cardNumber,
      cvv : paymentData.bankCardDetails.cardCVV,
      expDate: paymentData.bankCardDetails.cardExpiryData,
      name: paymentData.bankCardDetails.cardName,
    }
    placeOrder(bankCard);
  }

  setInterval(() => {
    setIsFormVisible(true);
  }, 1500);

  const handlePaymentsButtonEnable = () => {
    const bkd = paymentData.bankCardDetails;
    if (
      bkd.cardCVV != "" &&
      bkd.cardExpiryData != "" &&
      bkd.cardName != "" &&
      bkd.cardNumber != ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const processNumber = (numb, maxlength) => {
    if(!parseInt(numb)) return "";
    let processedNumber = new String(parseInt(numb));
    if(processedNumber.length > maxlength) {
        return processedNumber.slice(0,maxlength);
    }
    return processedNumber;
  };

  const handleFormInput = ({ target }) => {
    switch (target.name) {
      case "card":
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardNumber: processNumber(target.value, 16),
          },
        });
        break;
      case "owner":
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardName: target.value,
          },
        });
        break;
      case "exp":
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardExpiryData: target.value,
          },
        });
        break;
      case "cvv":
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardCVV: processNumber(target.value, 3),
          },
        });
        break;
    }
  };

  useEffect(() => {
    handlePaymentsButtonEnable();
  }, [paymentData]);

  if (isFormVisible) {
    return (
      <Paper
        elevation={4}
        sx={{
          m: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <FormControl sx={{ m: 2, flex: 6 }}>
            <InputLabel>Card Number</InputLabel>
            <OutlinedInput
              placeholder="XXXX XXXX XXXX XXXX"
              id="card-no-buzz"
              startAdornment={
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              }
              value={paymentData.bankCardDetails.cardNumber}
              inputProps={{
                autoComplete :"cc-number",
                inputMode : "numeric",
                pattern: /[0-9\s]/,
              }}
              label="Card Number"
              name="card"
              onInput={(inp) => handleFormInput(inp)}
            />
          </FormControl>
          <TextField
            sx={{ m: 2, ml: 0, flex: 2 }}
            label="CVV"
            id="cvv-buzz"
            name="cvv"
            value={paymentData.bankCardDetails.cardCVV}
            inputProps={{ type: "password" }}
            onInput={(inp) => handleFormInput(inp)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <TextField
            sx={{ m: 2, mt: 0, flex: 3 }}
            label="Card Holder's Name"
            id="card-holder-buzz"
            name="owner"
            value={paymentData.bankCardDetails.cardName}
            onInput={(inp) => handleFormInput(inp)}
          />
          <FormControl sx={{ m: 2, mt: 0, ml: 0, flex: 2 }}>
            <InputLabel>Card Expiry Date</InputLabel>
            <OutlinedInput
              placeholder="MM/YY"
              id="card-exp"
              label="Card Expiry Date"
              name="exp"
              value={paymentData.bankCardDetails.cardExpiryData}
              onInput={(inp) => handleFormInput(inp)}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SubmitPaymentButton
            disabled={disabled}
            onClick={handlePaymentSubmit}
            sx={
              disabled
                ? {
                    mx: 2,
                    mb: 2,
                    cursor: "not-allowed",
                    background: grey[700],
                  }
                : {
                    mx: 2,
                    mb: 2,
                    cursor: "pointer",
                    background: "black",
                    ":hover": {
                      boxShadow: "1px 1px 10px 1px black",
                    },
                    transition: "0.45s",
                  }
            }
          >
            Pay {getFormattedPrice(cartTotal)}
          </SubmitPaymentButton>
        </Box>
      </Paper>
    );
  } else return <PaymentFormLoader />;
};


export default BankCardForm;