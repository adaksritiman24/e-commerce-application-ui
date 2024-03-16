import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../../modals/LoginModalProvider";
import Logo from "../common/Logo";
import LoginModal from "./authentication-ui/LoginModal";
import CategoriesSection from "./CategoriesSection";
import MobileMoreNavigation from "./MoreNavigation/MobileMoreNavigation";
import MoreNavigation from "./MoreNavigation/MoreNavigation";
import SearchBox from "./SearchBox";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const {loginModalOpen, setLoginModalOpen} = useContext(LoginContext);
  
  return (
    <Box
      sx={{
        bgcolor: grey[400],
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
