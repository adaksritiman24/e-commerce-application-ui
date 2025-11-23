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

const BankCardIFrame = ({
  expansion,
  paymentData,
  handleCustomKeyDownChangeForNumericField,
  handleFormInput,
  handlePaymentSubmit,
  paymentButtonLoading,
  disabled,
  amountPayable,
}) => {
  return (
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
              handleCustomKeyDownChangeForNumericField("card", key, 16, 4, " ")
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
              handleCustomKeyDownChangeForNumericField("exp", key, 4, 2, " / ")
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
            disabled || paymentButtonLoading
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
                    background: "black",
                  },
                  transition: "0.45s",
                }
          }
        >
          {paymentButtonLoading ? (
            <CircularProgress sx={{ color: "white" }} isableShrink size={22} />
          ) : (
            <>Pay {getFormattedPrice(amountPayable)}</>
          )}
        </SubmitPaymentButton>
      </Box>
    </Paper>
  );
};

export default BankCardIFrame;
