import { Button, IconButton, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Stack } from "@mui/system";
import React from "react";
import { deepPurple, grey } from "@mui/material/colors";

const Filters = ({ setOpenFilterForMobile }) => {
  return (
    <Stack direction="row"
      sx={{
        background : deepPurple[100],
        mt:"8px",
        borderRadius : "4px",
      }}
    >
      <Button
        sx={{
          "& svg": {
            fontSize: "30px",
          },
          color: deepPurple[900],
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
