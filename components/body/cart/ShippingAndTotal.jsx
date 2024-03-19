import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { useContext } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CreateIcon from "@mui/icons-material/Create";
import { DeliveryAddressContext } from "../../../modals/DeliveryAddressModalProvider";
import PaymentModalProvider, {
  PaymentContext,
} from "../../../modals/payments/PaymentModalProvider";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import SubmitPaymentLoader from "../../../modals/payments/loaders/SubmitPaymentLoader";
import Summary from "../../common/Summary";
import { animated, useSpring } from "@react-spring/web";

const REMEMBER_ME = "rememberMe";

const AnimatedCollapseAlert = animated(Collapse);

const PaymentButton = () => {
  const { setPaymentModalOpen } = useContext(PaymentContext);
  return (
    <Button
      variant="contained"
      sx={{
        mt: "10px",
        textTransform: "none",
      }}
      color="success"
      onClick={() => setPaymentModalOpen(true)}
    >
      Proceed to Payments
    </Button>
  );
};

const ErrorNotification = ({ open, setOpen }) => {
  const aStyle = useSpring({
    from: { y: 0 },
    to: { y: 240 },
  });
  return (
    <AnimatedCollapseAlert
      style={{
        position: "fixed",
        top: "-200px",
        right: "50%",
        transform: "translate(50%, 0%)",
        zIndex: 6000,
        ...aStyle,
      }}
      in={open}
    >
      <Alert
        style={{
          background: "rgb(251,200,200)",
        }}
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        Failed to Place Order!
      </Alert>
    </AnimatedCollapseAlert>
  );
};

const ShhippingAndTotal = ({
  totalAmount,
  deliveryAddress,
  placeOrderUsingBankCard,
}) => {
  const { setDeliveryAddressOpen, setDeliveryAddress } = useContext(
    DeliveryAddressContext
  );
  const [loading, setLoading] = useState(false);
  const [cookie, _b, removeCookie] = useCookies([REMEMBER_ME]);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const router = useRouter();

  const editDeliveryAddress = () => {
    console.log("Current Delivery Address: ", deliveryAddress);
    setDeliveryAddress(deliveryAddress);
    setDeliveryAddressOpen(true);
  };

  const handlePlaceOrder = (bankCardDetails) => {
    setLoading(true);
    setTimeout(async () => {
      const { status, orderId } = await placeOrderUsingBankCard(
        bankCardDetails
      );
      if (status) {
        removeCookie(REMEMBER_ME, { path: "/" });
        router.push(`/order/${orderId}`);
      } else {
        setLoading(false);
        setErrorAlertOpen(true);
      }
      console.log("Order Status: ", status);
    }, 1500);
  };

  return (
    <>
      {errorAlertOpen && (
        <ErrorNotification open={errorAlertOpen} setOpen={setErrorAlertOpen} />
      )}
      {loading && <SubmitPaymentLoader />}
      <Card
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          borderRadius: "4px",
          m: "10px",
          background: grey[200],
          p: "15px",
        }}
      >
        {deliveryAddress == null ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setDeliveryAddressOpen(true)}
              sx={{
                textTransform: "none",
              }}
            >
              Add delivery address
            </Button>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" mr={1}>
                Shipping Details
              </Typography>
              <IconButton disableTouchRipple onClick={editDeliveryAddress}>
                <CreateIcon
                  sx={{
                    cursor: "pointer",
                    color: grey[800],
                  }}
                />
              </IconButton>
            </Box>

            <hr />
            <Typography variant="h6">{deliveryAddress.name}</Typography>
            <Box color={grey[700]}>
              <Box
                sx={{
                  display: "flex",
                  mb: "4px",
                }}
              >
                <FmdGoodIcon
                  sx={{
                    mr: "4px",
                  }}
                />
                <Box>
                  <Typography>
                    {deliveryAddress.house}, {deliveryAddress.locality}
                  </Typography>
                  <Typography>
                    {deliveryAddress.city}, {deliveryAddress.country}
                  </Typography>
                  <Typography>Pin code: {deliveryAddress.pincode}</Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocalPhoneIcon
                  sx={{
                    mr: "4px",
                  }}
                />{" "}
                {deliveryAddress.phone}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon
                  sx={{
                    mr: "4px",
                  }}
                />{" "}
                {deliveryAddress.email}
              </Typography>
            </Box>
            <PaymentModalProvider
              placeOrderForCart={handlePlaceOrder}
              cartTotal={totalAmount}
            >
              <PaymentButton />
            </PaymentModalProvider>
          </Box>
        )}
        <Box
          sx={{
            mt: {
              md: "0",
              xs: "14px",
            },
          }}
        >
          <Summary
            total={totalAmount}
            tax={0}
            shippingCost={0}
            subtotal={totalAmount}
          />
        </Box>
      </Card>
    </>
  );
};

export default ShhippingAndTotal;
