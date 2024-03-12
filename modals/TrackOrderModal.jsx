import {
  OutlinedInput,
  Button,
  Box,
  Typography,
  Stack,
  ThemeProvider,
  FormControl,
  InputLabel,
  Grid,
  Modal,
  createTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  zIndex: 5000,
};

const TrackOrderModal = ({ trackOrderModalOpen, setTrackOrderModalOpen }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const formTheme = createTheme({
    palette: {
      primary: {
        main: grey[700],
      },
    },
  });

  const handleTrackOrderSubmit = (e) => {
    e.preventDefault();
    setTrackOrderModalOpen(false);
    router.push({
      pathname: `/order/${orderNumber}`,
      query: { searchType: "view-order" },
    });
  };

  const handleOrderEntry = (value) => {
    if (value.length === 0) {
      setOrderNumber("");
      setButtonDisabled(true);
    } else {
      const numericValue = parseInt(value);
      if (isNaN(numericValue)) {
        setOrderNumber("");
        setButtonDisabled(true);
        return;
      }
      setOrderNumber(numericValue);
      setButtonDisabled(false);
    }
  };

  return (
    <Modal
      open={trackOrderModalOpen}
      onClose={() => setTrackOrderModalOpen(false)}
      aria-labelledby="track-modal-title"
      aria-describedby="track-modal-description"
      sx={{
        "& button": {
          textTransform: "none",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          ...style,
          width: {
            lg: "250px",
            sm: "250px",
            xs: "240px",
          },
          boxSizing: "border-box",
        }}
      >
        <Typography
          id="track-modal-title"
          variant="h6"
          component="h3"
          fontWeight="600"
        >
          Track Your Order
        </Typography>
        <form onSubmit={(e) => handleTrackOrderSubmit(e)}>
          <Stack
            sx={{
              my: 1,
            }}
            direction="column"
            spacing={2}
            pt={1}
          >
            <ThemeProvider theme={formTheme}>
              <FormControl>
                <InputLabel
                  htmlFor="order-number"
                  sx={{
                    bgcolor: "white",
                    px: "5px",
                  }}
                >
                  Order Number
                </InputLabel>
                <OutlinedInput
                  value={orderNumber}
                  onChange={(e) => handleOrderEntry(e.target.value)}
                  id="order-number"
                />
              </FormControl>
            </ThemeProvider>
          </Stack>
          <Grid container spacing={2} pt={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                disabled={buttonDisabled}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default TrackOrderModal;
