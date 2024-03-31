import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/common/Footer";
import { Box } from "@mui/material";
import MyOrdersPageBody from "../../components/body/my-orders/MyOrdersPageBody";
import Head from "next/head";

const MyOrders = () => {
  return (
    <>
    <Head><title>My Orders</title></Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header />
        <MyOrdersPageBody />
        <Footer />
      </Box>
    </>
  );
};

export default MyOrders;
