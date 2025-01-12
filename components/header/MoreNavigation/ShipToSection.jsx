import { Box, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useContext, useEffect } from "react";
import { DeliveryAddressContext } from "../../../modals/DeliveryAddressModalProvider";

function ShipToSection({user, isDesktop}) {
    const { setDeliveryAddressOpen, setDeliveryAddress } = useContext(DeliveryAddressContext);

    const handleDeliveryAddressChange = () => {
      setDeliveryAddressOpen(true);
    };
    
    useEffect(()=> {
      setDeliveryAddress(user?.address);
    },[user]);

  return (
    <Tooltip title="Change delivery address" placement="bottom-start">
      <Box
        role="button"
        sx={{
          padding: "2px",
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            background: "rgba(0,0,0,0.06)",
          },
        }}
        onClick={handleDeliveryAddressChange}
      >
        <Box
          mx={1}
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnIcon />
          </Box>
          <Box>
            <Box
              sx={{
                fontSize: isDesktop ? "17px" : "14px",
              }}
            >
              Ship To
            </Box>
            <Box>
              {null != user.address && (
                <>
                  <b style={{ fontSize: isDesktop ? "22px" : "18px" }}>
                    {user.address.city}
                  </b>
                  ,
                  <span style={{ fontSize: isDesktop ? "18px" : "14px" }}>
                    {" "}
                    {user.address.country}
                  </span>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
}

export default ShipToSection;
