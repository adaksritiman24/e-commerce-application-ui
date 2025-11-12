import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Tooltip,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "../PaymentModalProvider";
import PaymentFormLoader from "../loaders/PaymentFormLoader";
import { getFormattedPrice } from "../../../components/common/utils/helpers";
import { GiftCardsSelectorModalContext } from "../../GiftCardSelectorModalProvider";
import CloseIcon from '@mui/icons-material/Close';

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
  const { setGiftCardsSelectorModalOpen, selectedGiftCard, setSelectedGiftCard } = useContext(GiftCardsSelectorModalContext);

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

  const processNumber = (numb, maxlength) => {
    if (!parseInt(numb)) return "";
    let processedNumber = new String(parseInt(numb));
    if (processedNumber.length > maxlength) {
      return processedNumber.slice(0, maxlength);
    }
    return processedNumber;
  };

  const calculateCardEmptySlots = (element, molecule, wildCardLength) => {
    return (Math.floor(element / molecule) - 1) * wildCardLength;
  };

  const handleforDigitPress = (
    updatedCard,
    wildCard,
    totalAllowedLength,
    clubbingSize
  ) => {
    let num = updatedCard.replaceAll(wildCard, ""); //replace the wildcard characters with empty strings

    if (num.length >= totalAllowedLength) {
      return updatedCard.slice(
        0,
        totalAllowedLength +
        calculateCardEmptySlots(
          totalAllowedLength,
          clubbingSize,
          wildCard.length
        )
      );
    }
    if (num.length > 0 && num.length % clubbingSize === 0) {
      return updatedCard + wildCard;
    }
    return updatedCard;
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

      if (
        key == "1" ||
        key == "2" ||
        key == "3" ||
        key == "4" ||
        key == "5" ||
        key == "6" ||
        key == "7" ||
        key == "8" ||
        key == "9" ||
        key == "0"
      ) {
        newData = handleforDigitPress(
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

  var expansion = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

  if (isFormVisible) {
    return (
      <>
        <Box sx={{
          mx: 5,
          my: 3
        }}>
          <Typography variant="body2" color="text.secondary">
            Select a gift card and pay the remaining amount.
          </Typography>
          <hr />
          <Button variant="contained" size="large" color="primary" onClick={() => setGiftCardsSelectorModalOpen(true)}>
            Select a gift card
          </Button>
          {selectedGiftCard != null &&
            <>
              <Divider sx={{ mt: 1 }}>
                <Chip label="Gift Card Applied!" size="small" />
              </Divider>
              <Card sx={{
                backgroundColor: green[50],
                mt: 1
              }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography
                      fontWeight="600"
                      fontSize={20}
                    >
                      {getFormattedPrice(selectedGiftCard.amount)}
                    </Typography>
                    <Tooltip title="Remove">
                      <CloseIcon onClick={() => setSelectedGiftCard(null)}
                        sx={{
                          cursor: "pointer"
                        }}
                      />
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedGiftCard.title}
                  </Typography>
                </CardContent>
              </Card>
            </>
          }
        </Box>
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
      </>
    );
  } else return <PaymentFormLoader />;
};

export default BankCardForm;
