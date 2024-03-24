import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import React from "react";
import { deepPurple, grey } from "@mui/material/colors";

const ProductDetails = ({
    details
}) => {

  return (
    <>
      <Typography
        sx={{
          fontFamily: "arial",
          fontWeight: "bold",
          fontSize: "20px",
          background: deepPurple[50],
          m: "0",
          p: "8px",
        }}
      >
        Product Details
      </Typography>
      <hr
        style={{
          margin: "0",
          padding: "0",
          color: "grey",
        }}
      />
      <List
        sx={{
          "& li": {
            px: "0",
          },
        }}
      >
        {details.map((detail, index) => (
          <ListItem
            key={index}
            sx={{
              py: "6px",
            }}
          >
            <ListItemIcon
              sx={{
                "& svg": {
                  color: deepPurple[800],
                },
                minWidth: "36px",
              }}
            >
              <TurnedInIcon />
            </ListItemIcon>
            <Typography
              sx={{
                fontSize: {
                  lg: "17px",
                  xs: "15px",
                },
              }}
            >
              {detail.value}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProductDetails;
