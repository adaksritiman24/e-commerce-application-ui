import { Drawer } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React from "react";
import SearchFilters from "./SearchFilters";

const FilterForMobile = ({ openFilterForMobile, setOpenFilterForMobile }) => {
  return (
    <Drawer
      open={openFilterForMobile}
      onClose={() => setOpenFilterForMobile(false)}
      sx={{
        "& .MuiPaper-root" : {
          bgcolor : grey[100],
        },
      }}
    >
      <Stack
        sx={{
          width: "60vw",
        }}
      >

        <SearchFilters/>
      </Stack>
    </Drawer>
  );
};

export default FilterForMobile;
