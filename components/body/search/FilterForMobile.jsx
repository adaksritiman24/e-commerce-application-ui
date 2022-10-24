import { Drawer } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const FilterForMobile = ({ openFilterForMobile, setOpenFilterForMobile }) => {
  return (
    <Drawer
      open={openFilterForMobile}
      onClose={() => setOpenFilterForMobile(false)}
    >
      <Stack
        sx={{
          width: "60vw",
        }}
      ></Stack>
    </Drawer>
  );
};

export default FilterForMobile;
