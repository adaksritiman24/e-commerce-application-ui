import { Box, Grid, useMediaQuery } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../modals/LoginModalProvider";
import Logo from "../common/Logo";
import CategoriesSection from "./CategoriesSection";
import SearchBox from "./SearchBox";
import MoreNavigation from "./MoreNavigation/desktop/MoreNavigation";
import MobileMoreNavigation from "./MoreNavigation/mobile/MobileMoreNavigation";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const {loginModalOpen, setLoginModalOpen} = useContext(LoginContext);
  
  return (
    <Box
      sx={{
        bgcolor: deepPurple[400],
        boxShadow: "0px -2px 12px 4px gray"
      }}
    >
      <Grid
        container
        sx={{
          px: !isDesktop ? "8px" : "0",
        }}
      >
        {isDesktop && (
          <Grid item md={2} xs={0} sx={{ display: "flex", pl:2 }}>
            <Logo variant={"h4"} />
          </Grid>
        )}

        <Grid
          item
          md={4}
          xs={10}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBox />
        </Grid>
        <Grid item md={6} xs={2} sx={{ display: "flex" }}>
          {isDesktop ? (
            <MoreNavigation setLoginModalOpen={setLoginModalOpen} />
          ) : (
            <MobileMoreNavigation setLoginModalOpen={setLoginModalOpen}/>
          )}
        </Grid>
      </Grid>
      <CategoriesSection />
    </Box>
  );
};

export default Header;
