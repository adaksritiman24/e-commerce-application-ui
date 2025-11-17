import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { GiftCardsModalContext } from "./GiftCardsModalProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledModalBox = styled(Box)({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: 24,
  p: 12,
  zIndex: 5000,
  boxSizing: "border-box",
});

const AddGiftCardModal = ({
  addGiftCardModalOpen,
  setAddGiftCardModalOpen,
}) => {
  const [code, setCode] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { redeemGiftCard } = useContext(GiftCardsModalContext);

  const handleInput = (value) => {
    setErrorMessage("");
    setCode(value);
  };

  const handleSubmit = () => {
    setShowProgressBar(true);
    setTimeout(() => {
      redeemGiftCard(code, setErrorMessage, setSuccess, setShowProgressBar);
    }, 2000);
  };

  return (
    <Modal
      open={addGiftCardModalOpen}
      onClose={() => {
        setAddGiftCardModalOpen(false);
        setErrorMessage("");
        setSuccess(false);
        setCode("");
      }}
      aria-labelledby="track-modal-title"
      aria-describedby="track-modal-description"
      sx={{
        "& button": {
          textTransform: "none",
          width: "100%",
        },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StyledModalBox>
        {showProgressBar ? (
          <Box
            sx={{
              m: 5,
            }}
          >
            <CircularProgress size="30px" />
          </Box>
        ) : (
          <AddGiftCardFormSection
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            code={code}
            success={success}
          />
        )}
      </StyledModalBox>
    </Modal>
  );
};

const AddGiftCardFormSection = ({
  code,
  handleSubmit,
  handleInput,
  errorMessage,
  success,
}) => {
  if (success) {
    return (
      <Box
        sx={{
          m: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" justifyContent="center">
          <CheckCircleIcon
            fontSize="large"
            sx={{
              color: green[500],
            }}
          />
        </Box>
        <Typography
          mt={1}
          color={green[500]}
          variant="body3"
          textAlign="center"
        >
          Redeemed Successfully!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        m: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Grid container spacing={1} columns={{ xs: 4, md: 12 }}>
          <Grid item xs={8}>
            <TextField
              label="Enter Code"
              value={code}
              onChange={(e) => handleInput(e.target.value)}
              sx={{
                height: "100%",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                height: "100%",
                width: "100%",
              }}
              disabled={code.length < 1}
              onClick={handleSubmit}
            >
              Redeem
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {errorMessage !== "" && (
          <Typography color={red[500]} textAlign="center" mt={1}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AddGiftCardModal;
