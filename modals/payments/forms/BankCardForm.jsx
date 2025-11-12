import {
  Box,
  CircularProgress,
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
import { expansion, getFormattedPrice, handleforDigitPressForCardNumber, isNumericKey, processNumber } from "../../../components/common/utils/helpers";
import { GiftCardsSelectorModalContext } from "../../GiftCardSelectorModalProvider";
import GiftCardSelection from "./components/GiftCardSelection";

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
  const { placeOrder, cartTotal } = useContext(PaymentContext);
  const [amountPayable, setAmountPayable] = useState(cartTotal);
  const { setGiftCardsSelectorModalOpen, selectedGiftCard, setSelectedGiftCard } = useContext(GiftCardsSelectorModalContext);
  const [paymentButtonLoading, setPaymentButtonLoading] = useState(false);

  const handlePaymentSubmit = () => {
    const bankCard = {
      cardNumber: paymentData.bankCardDetails.cardNumber,
      cvv: paymentData.bankCardDetails.cardCVV,
      expDate: paymentData.bankCardDetails.cardExpiryData,
      name: paymentData.bankCardDetails.cardName,
    };
    placeOrder(bankCard);
  };

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

  const isKeyAllowed = (key) => {
    return (
      key == "1" ||
      key == "2" ||
      key == "3" ||
      key == "4" ||
      key == "5" ||
      key == "6" ||
      key == "7" ||
      key == "8" ||
      key == "9" ||
      key == "0" ||
      key === "Backspace"
    );
  };

  const handleCustomKeyDownChangeForNumericField = (
    field,
    key,
    totalAllowedLength,
    clubbingSize,
    wildCard
  ) => {
    if (isKeyAllowed(key)) {
      let newData = "";
      let length = 0;
      let existingNumber = "";
      if (field === "card") {
        length = paymentData.bankCardDetails.cardNumber.length;
        existingNumber = paymentData.bankCardDetails.cardNumber;
      } else {
        length = paymentData.bankCardDetails.cardExpiryData.length;
        existingNumber = paymentData.bankCardDetails.cardExpiryData;
      }

      if (isNumericKey(key)) {
        newData = handleforDigitPressForCardNumber(
          existingNumber + key,
          wildCard,
          totalAllowedLength,
          clubbingSize
        );
      }

      if (key === "Backspace") {
        if (existingNumber.endsWith(wildCard)) {
          newData = existingNumber.slice(0, length - wildCard.length - 1);
        } else {
          newData = existingNumber.slice(0, length - 1);
        }
      }

      if (field == "card") {
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardNumber: newData,
          },
        });
      } else {
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardExpiryData: newData,
          },
        });
      }
    }
  };

  const handleFormInput = ({ target }) => {
    switch (target.name) {
      case "owner":
        setPaymentData({
          ...paymentData,
          bankCardDetails: {
            ...paymentData.bankCardDetails,
            cardName: target.value,
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

  useEffect(() => {
    setAmountPayable(cartTotal)
    if (selectedGiftCard != null) {
      setAmountPayable(amountPayable - selectedGiftCard.amount)
    }
    setPaymentButtonLoading(true);
    setTimeout(() => {
      setPaymentButtonLoading(false);
    }, 2000)

    return () => {
      clearTimeout();
    }

  }, [selectedGiftCard])

  if (isFormVisible) {
    return (
      <>
        <GiftCardSelection
          selectedGiftCard={selectedGiftCard}
          setGiftCardsSelectorModalOpen={setGiftCardsSelectorModalOpen}
          setSelectedGiftCard={setSelectedGiftCard}
        />
        <Paper
          elevation={4}
          sx={{
            m: 2,
            animation: `${expansion} 400ms ease-out`,
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
                  autoComplete: "cc-number",
                  inputMode: "numeric",
                  pattern: /[0-9\s]/,
                }}
                sx={{
                  input: {
                    caretColor: "transparent",
                  },
                }}
                label="Card Number"
                name="card"
                onKeyDown={({ key }) =>
                  handleCustomKeyDownChangeForNumericField(
                    "card",
                    key,
                    16,
                    4,
                    " "
                  )
                }
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
              flexDirection: {
                xs: "column",
                md: "row",
              },
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
            <FormControl sx={{ m: 2, mt: 0, flex: 2 }}>
              <InputLabel>Card Expiry Date</InputLabel>
              <OutlinedInput
                placeholder="MM/YY"
                id="card-exp"
                label="Card Expiry Date"
                name="exp"
                value={paymentData.bankCardDetails.cardExpiryData}
                sx={{
                  input: {
                    caretColor: "transparent",
                  },
                }}
                onKeyDown={({ key }) =>
                  handleCustomKeyDownChangeForNumericField(
                    "exp",
                    key,
                    4,
                    2,
                    " / "
                  )
                }
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <SubmitPaymentButton
              disabled={disabled || paymentButtonLoading}
              onClick={handlePaymentSubmit}
              sx={
                (disabled || paymentButtonLoading)
                  ? {
                    mx: 2,
                    mb: 2,
                    cursor: "not-allowed",
                    background: grey[600],
                  }
                  : {
                    mx: 2,
                    mb: 2,
                    cursor: "pointer",
                    background: grey[900],
                    transition: "2s",
                    ":hover": {
                      transform: "scale(1.02)",
                      background: "black"
                    },
                    transition: "0.45s",
                  }
              }
            >
              {paymentButtonLoading ? <CircularProgress sx={{ color: "white" }} isableShrink size={22} />
                : <>Pay {getFormattedPrice(amountPayable)}</>}
            </SubmitPaymentButton>
          </Box>
        </Paper>
      </>
    );
  } else return <PaymentFormLoader />;
};

export default BankCardForm;
