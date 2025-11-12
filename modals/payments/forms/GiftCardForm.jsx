import { Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import PaymentFormLoader from "../loaders/PaymentFormLoader";
import { grey } from "@mui/material/colors";
import { GiftCardsSelectorModalContext } from "../../GiftCardSelectorModalProvider";

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
      Nothing
    </Paper>;
  } else return <PaymentFormLoader />;
};


export default GiftCardForm;