import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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

  const handleInput = (value) => {
    setCode(value);
  };

  const handleSubmit = () => {
    setShowProgressBar(true);
    setTimeout(() => {
      setShowProgressBar(false);
    }, 2000);
  };

  return (
    <Modal
      open={addGiftCardModalOpen}
      onClose={() => setAddGiftCardModalOpen(false)}
      aria-labelledby="track-modal-title"
      aria-describedby="track-modal-description"
      sx={{
        "& button": {
          textTransform: "none",
          width: "100%",
        },
        display: "flex",
        justifyContent: "center",
        overflowY: "scroll",
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
          <Box
            sx={{
              display: "flex",
              m: 5,
            }}
          >
            <Grid container spacing={1} columns={{ xs: 4, md: 12 }}>
              <Grid item xs={8}>
                <TextField
                  label="Code"
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
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </StyledModalBox>
    </Modal>
  );
};

export default AddGiftCardModal;
