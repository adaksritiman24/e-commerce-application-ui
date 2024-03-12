import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import TrackOrderModal from "../../modals/TrackOrderModal";

const Footer = () => {
  const [trackOrderModalOpen, setTrackOrderModalOpen] = useState(false);
  return (
    <Box
      sx={{
        bottom: "0",
        textAlign: "center",
        background: grey[500],
        fontFamily: "helvetica",
        fontSize: "18px",
        color: "white",
        py: 2,
        mt: 2,
      }}
    >
      Copyright@ www.buzz.co.in
      <Box>
        <Typography>
          <strong onClick={()=>setTrackOrderModalOpen(true)} style={{
            cursor:"pointer"
          }}>Track Order</strong>
        </Typography>
        <TrackOrderModal trackOrderModalOpen={trackOrderModalOpen} setTrackOrderModalOpen={setTrackOrderModalOpen} />
      </Box>
    </Box>
  );
};

export default Footer;
