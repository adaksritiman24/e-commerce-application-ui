import {
  Box,
  LinearProgress,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import { deepPurple, green, grey } from "@mui/material/colors";
import { getFormattedPrice } from "../../common/utils/helpers";
import AuthContext from "../../../auth/AuthContext";
import useOrder from "../hooks/useOrder";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&: nth-child(odd)": {
    background: deepPurple[50],
  },
}));

const getProgressBasedOnStatus = (status) => {
  switch (status.toLowerCase()) {
    case "created":
      return 4;
    case "dispatched":
      return 25;
    case "shipped":
      return 50;
    case "out_for_delivery":
      return 75;
    case "delivered":
      return 100;
    default:
      return 0;
  }
};
const MyOrdersPageBody = () => {
  const { user } = useContext(AuthContext);
  const { orders } = useOrder(user?.username);
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        flexGrow: 1,
        my: 4,
        mx: 1,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        My Orders
      </Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: "1000px",
          scrollbarWidth: "4px",
        }}
      >
        <Table
          aria-label="customized table"
          sx={{
            minWidth: "600px",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: deepPurple[800],
                "& .MuiTableCell-head": {
                  color: grey[200],
                },
              }}
            >
              <StyledTableCell align="center">Order Number</StyledTableCell>
              <StyledTableCell align="left">Order Date</StyledTableCell>
              <StyledTableCell align="left">Order Total</StyledTableCell>
              <StyledTableCell align="center">Order Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              background: grey[100],
            }}
          >
            {orders.map((order) => (
              <StyledTableRow
                key={order.orderNumber}
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  router.push({
                    pathname: `/order/${order.id}`,
                    query: { searchType: "view-order" },
                  });
                }}
              >
                <StyledTableCell align="center">
                  <Typography variant="subtitle1">{order.id}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {order.orderDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <strong> {getFormattedPrice(order.totalPrice)}</strong>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column">
                    <Typography
                      variant="subtitle1"
                      textAlign="start"
                      fontWeight={600}
                      lineHeight="normal"
                    >
                      {order.status}
                    </Typography>
                    <LinearProgress
                      value={getProgressBasedOnStatus(order.status)}
                      variant="determinate"
                      sx={{
                        height: "15px",
                        borderRadius: "10px",
                        minWidth: "150px",
                        background: green[200],
                        "& .MuiLinearProgress-bar": {
                          background: green[800],
                          borderRadius: "10px",
                        },
                      }}
                    />
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyOrdersPageBody;
