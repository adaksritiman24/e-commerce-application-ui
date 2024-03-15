import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import PaymentFormLoader from "../loaders/PaymentFormLoader";
import { grey } from "@mui/material/colors";

const GiftCardForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  setInterval(() => {
    setIsFormVisible(true);
  }, 1500);

  if (isFormVisible) {
    return <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p:4,
        pb:6,
        color: grey[700]
      }}
    >
      <Typography variant="h6" fontWeight={600}>Coming Soon!</Typography>
      <Typography variant="subtitle1">We are sorry for the inconvenience.</Typography>
    </Paper>;
  } else return <PaymentFormLoader />;
};


export default GiftCardForm;