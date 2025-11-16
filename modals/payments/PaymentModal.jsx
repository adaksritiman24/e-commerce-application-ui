import {
  Box,
  FormControl,
  FormControlLabel,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  keyframes,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useContext, useState } from "react";
import BankCardForm from "./forms/BankCardForm";
import GiftCardForm from "./forms/GiftCardForm";
import { GiftCardsSelectorModalProvider } from "../GiftCardSelectorModalProvider";
import AuthContext from "../../auth/AuthContext";
const style = {
  height: "fit-content",
  marginTop : "30px",
  marginBottom : "30px",
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
          </RadioGroup>
        </FormControl>
      </Box>
      {selectedPaymentMode === "Credit/Debit Card" &&
        <AuthenticatedForm>
          <BankCardForm/>
        </AuthenticatedForm>
      }
    </>
  );
};

const AuthenticatedForm = ({
  children
}) => {
  const {user} = useContext(AuthContext);
  if(user == null) 
    return <>
      {children}
    </>
  return <>
    <GiftCardsSelectorModalProvider>
      {children}
    </GiftCardsSelectorModalProvider>
  </>
}

const PaymentModal = ({
  paymentModalOpen,
  setPaymentModalOpen,
  paymentData,
  setPaymentData,
}) => {
  var expansion = keyframes`
    0% {
      opacity: 0;
      width: 0;
    }
    100% {
      opacity: 1;
    }
  `
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
        display: "flex",
        justifyContent: "center",
        overflowY: "scroll"
      }}
    >
      <Box
        sx={{
          ...style,
          animation: `${expansion} 400ms ease-out`,
          width: {
            lg: "500px",
            sm: "500px",
            xs: "94%",
          },
          overflow: "hidden",
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
          <PaymentMethods paymentModes={paymentData.paymentModes} />
        </Typography>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
