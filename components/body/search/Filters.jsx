import { Button, IconButton, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Stack } from "@mui/system";
import React from "react";
import { grey } from "@mui/material/colors";

const Filters = ({ setOpenFilterForMobile }) => {
  return (
    <Stack direction="row">
      <Button
        sx={{
          "& svg": {
            fontSize: "40px",
          },
          color: grey[700],
        }}
        onClick={() => setOpenFilterForMobile(true)}
      >
        <FilterAltIcon />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          Filters
        </Typography>
      </Button>
    </Stack>
  );
};

export default Filters;
