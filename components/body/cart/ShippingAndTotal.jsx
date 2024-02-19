import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import AuthContext from "../../../auth/AuthContext";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { LoginContext } from "../../../modals/LoginModalProvider";

const ShhippingAndTotal = ({ totalAmount, deliveryAddress }) => {
  const { setLoginModalOpen } = useContext(LoginContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          m: "10px",
          background: grey[200],
          p: "15px",
        }}
      >
        {deliveryAddress == null || user == null? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setLoginModalOpen(true)}
              sx={{
                textTransform: "none",
              }}
            >
              Please sign in to proceed
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5">Shipping Details</Typography>
            <hr />
            <Typography variant="h6">{user.name}</Typography>
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
            <Button
              variant="contained"
              sx={{
                mt: "10px",
                textTransform : "none",
              }}
              color="success"
            >
              Proceed to Payments
            </Button>
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
          <Typography>Net Payble Amount:</Typography>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: {
                md: "32px",
                xs: "26px",
              },
            }}
          >
            {getFormattedPrice(totalAmount)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ShhippingAndTotal;
