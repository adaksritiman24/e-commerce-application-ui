import { Box, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React, { useState } from "react";
import TrackOrderModal from "../../modals/TrackOrderModal";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Footer = () => {
  const [trackOrderModalOpen, setTrackOrderModalOpen] = useState(false);
  return (
    <>
    <Box
      sx={{
        bottom: "0",
        textAlign: "center",
        background: deepPurple[400],
        fontFamily: "helvetica",
        fontSize: "18px",
        color: "white",
        mt: 1,
        pb: 1,
        color: grey[200],
      }}
    >
      <Box sx={{background: deepPurple[500], py: 1, mb: 1}}></Box>
      <u>Copyright@ www.buzz.co.in</u>
      <Box
        sx={{
          mt: 1,
        }}
      >
        <Typography>
          <strong
            onClick={() => setTrackOrderModalOpen(true)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              color: grey[200],
            }}
          >
            <GpsFixedIcon />
            Track Order
          </strong>
        </Typography>
        <TrackOrderModal
          trackOrderModalOpen={trackOrderModalOpen}
          setTrackOrderModalOpen={setTrackOrderModalOpen}
        />
      </Box>
    </Box>
    </>
  );
};

export default Footer;
