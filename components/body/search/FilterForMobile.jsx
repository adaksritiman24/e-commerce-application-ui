import { Close } from "@mui/icons-material";
import { Drawer, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React from "react";
import SearchFilters from "./SearchFilters";

const FilterForMobile = ({ openFilterForMobile, setOpenFilterForMobile, searchFilterProps }) => {
  return (
      <Drawer
        open={true}
        variant="permanent"
        sx={{
          "& .MuiPaper-root" : {
            bgcolor : grey[100],
          },
          transition : "1s",
          display : openFilterForMobile ? "visible" : "none"
        }}
      >
        <Stack
          sx={{
            width: "350px",
          }}
        >
          <Typography variant="h5" fontWeight={500} p={2}
                sx={{
                  background : grey[300],
                  display : "flex",
                  justifyContent :  "space-between"
                }}
              >
                Filters
                <IconButton
                  onClick={()=>setOpenFilterForMobile(false)}
                >
                  <Close
                    color={"black"}
                  />
                </IconButton>
          </Typography>
          <SearchFilters
            {...searchFilterProps}
          />
        </Stack>
      </Drawer>
  );
};

export default FilterForMobile;
