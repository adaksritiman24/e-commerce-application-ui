import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "../PaymentModalProvider";
import PaymentFormLoader from "../loaders/PaymentFormLoader";
import {
  expansion,
  handleforDigitPressForCardNumber,
  isKeyAllowedForNumericField,
  isNumericKey,
  processNumber,
} from "../../../components/common/utils/helpers";
import { GiftCardsSelectorModalContext } from "../../GiftCardSelectorModalProvider";
import GiftCardSelection from "./components/GiftCardSelection";
import BankCardIFrame from "./BankCardIFrame";

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
  const {
    setGiftCardsSelectorModalOpen,
    selectedGiftCard,
    setSelectedGiftCard,
  } = useContext(GiftCardsSelectorModalContext);
  const [paymentButtonLoading, setPaymentButtonLoading] = useState(false);

  const handlePaymentSubmit = () => {
    const bankCard = {
      cardNumber: paymentData.bankCardDetails.cardNumber,
      cvv: paymentData.bankCardDetails.cardCVV,
      expDate: paymentData.bankCardDetails.cardExpiryData,
      name: paymentData.bankCardDetails.cardName,
    };
    if (selectedGiftCard == null) {
      placeOrder(bankCard);
    } else {
      placeOrder(bankCard, true, {
        giftCardId: selectedGiftCard.id,
        amount: selectedGiftCard.amount,
      });
    }
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

  const handleCustomKeyDownChangeForNumericField = (
    field,
    key,
    totalAllowedLength,
    clubbingSize,
    wildCard
  ) => {
    if (isKeyAllowedForNumericField(key)) {
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
    setAmountPayable(cartTotal);
    if (selectedGiftCard != null) {
      setAmountPayable(amountPayable - selectedGiftCard.amount);
    }
    setPaymentButtonLoading(true);
    setTimeout(() => {
      setPaymentButtonLoading(false);
    }, 2000);

    return () => {
      clearTimeout();
    };
  }, [selectedGiftCard]);

  if (isFormVisible) {
    return (
      <>
        <GiftCardSelection
          selectedGiftCard={selectedGiftCard}
          setGiftCardsSelectorModalOpen={setGiftCardsSelectorModalOpen}
          setSelectedGiftCard={setSelectedGiftCard}
        />

        {amountPayable > 0 ? (
          <BankCardIFrame
            expansion={expansion}
            paymentData={paymentData}
            handleCustomKeyDownChangeForNumericField={
              handleCustomKeyDownChangeForNumericField
            }
            handleFormInput={handleFormInput}
            handlePaymentSubmit={handlePaymentSubmit}
            paymentButtonLoading={paymentButtonLoading}
            disabled={disabled}
            amountPayable={amountPayable}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <SubmitPaymentButton
              onClick={handlePaymentSubmit}
              sx={{
                mx: 4,
                mb: 4,
                cursor: "pointer",
                background: grey[900],
                transition: "2s",
                ":hover": {
                  transform: "scale(1.02)",
                  background: "black",
                },
                transition: "0.45s",
              }}
            >
              Place Order
            </SubmitPaymentButton>
          </Box>
        )}
      </>
    );
  } else return <PaymentFormLoader />;
};

export default BankCardForm;
