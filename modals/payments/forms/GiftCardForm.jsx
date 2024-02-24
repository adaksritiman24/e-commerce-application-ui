import { Paper } from "@mui/material";
import { useState } from "react";
import PaymentFormLoader from "../loaders/PaymentFormLoader";

const GiftCardForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  setInterval(() => {
    setIsFormVisible(true);
  }, 1500);

  if (isFormVisible) {
    return <Paper>Gift Card form</Paper>;
  } else return <PaymentFormLoader />;
};


export default GiftCardForm;