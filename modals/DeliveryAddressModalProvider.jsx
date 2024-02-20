import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { createContext, useState } from "react";

const modalValues = {
  deliveryAddressOpen: false,
  setDeliveryAddressOpen: () => {},
  deliveryAddress: {
    name: "",
    house: "",
    locality: "",
    city: "",
    country: "India",
    pincode: "",
    phone: "",
    email: "",
  },
  setDeliveryAddress: () => {},
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "2px",
  boxShadow: 24,
  p: 4,
  zIndex: 5000,
};

export const DeliveryAddressContext = createContext(modalValues);

export const DeliverAddressModelProvider = ({
  children,
  addDeliveryAddress,
}) => {
  const [deliveryAddressOpen, setDeliveryAddressOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    modalValues.deliveryAddress
  );
  const contextValues = {
    deliveryAddress,
    setDeliveryAddress,
    deliveryAddressOpen,
    setDeliveryAddressOpen,
  };

  return (
    <DeliveryAddressContext.Provider value={contextValues}>
      <>
        {children}
        <DeliveryAddressModal
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          deliveryAddressOpen={deliveryAddressOpen}
          setDeliveryAddressOpen={setDeliveryAddressOpen}
          addDeliveryAddress={addDeliveryAddress}
        />
      </>
    </DeliveryAddressContext.Provider>
  );
};

const DeliveryAddressModal = ({
  deliveryAddress,
  setDeliveryAddress,
  deliveryAddressOpen,
  setDeliveryAddressOpen,
  addDeliveryAddress,
}) => {
  const setDeliveryAddressField = (field, value) => {
    setDeliveryAddress((address) => {
      switch (field) {
        case "name":
          return { ...address, name: value };
        case "house":
          return { ...address, house: value };
        case "locality":
          return { ...address, locality: value };
        case "city":
          return { ...address, city: value };
        case "country":
          return { ...address, country: value };
        case "pincode":
          return { ...address, pincode: value };
        case "phone":
          return { ...address, phone: value };
        case "email":
          return { ...address, email: value };
        default:
          return address;
      }
    });
  };
  const addDeliveryAddressCallback = () => {
    addDeliveryAddress(deliveryAddress);
    setDeliveryAddressOpen(false);
  };

  return (
    <Modal
      open={deliveryAddressOpen}
      onClose={() => setDeliveryAddressOpen(false)}
      aria-labelledby="delivery-modal-title"
      aria-describedby="delivery-modal-description"
      sx={{
        "& button": {
          textTransform: "none",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          ...style,
          minWidth: {
            lg: "600px",
            sm: "500px",
            xs: "320px",
          },
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{ mx: 1 , mb: 2}}
          id="delivery-modal-title"
          fontWeight="600"
          fontSize={18}
          fontFamily="Arial"
        >
          Add Delivery Address
        </Typography>
        <form onSubmit={() => addDeliveryAddressCallback()}>
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                lg: "row",
              },
              justifyContent: "space-between",
              "& .MuiFormControl-root ": {
                mx: 1,
              },
            }}
          >
            <FormControl
              sx={{
                flex: 3,
              }}
            >
              <InputLabel
                htmlFor="d-name"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Name
              </InputLabel>
              <OutlinedInput
                id="d-name"
                value={deliveryAddress.name}
                onChange={(e) =>
                  setDeliveryAddressField("name", e.target.value)
                }
              />
            </FormControl>

            <FormControl
              sx={{
                flex: 2,
              }}
            >
              <InputLabel
                htmlFor="d-phone"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Phone No.
              </InputLabel>
              <OutlinedInput
                type="number"
                id="d-phone"
                value={deliveryAddress.phone}
                onChange={(e) =>
                  setDeliveryAddressField("phone", e.target.value)
                }
              />
            </FormControl>

            <FormControl
              sx={{
                flex: 2,
              }}
            >
              <InputLabel
                htmlFor="d-email"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Email
              </InputLabel>
              <OutlinedInput
                id="d-email"
                value={deliveryAddress.email}
                onChange={(e) =>
                  setDeliveryAddressField("email", e.target.value)
                }
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              my: 2,
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                lg: "row",
              },
              justifyContent: "space-between",
              "& .MuiFormControl-root ": {
                mx: 1,
              },
            }}
          >
            <FormControl
              sx={{
                flex: 2,
              }}
            >
              <InputLabel
                htmlFor="d-house"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                House No.
              </InputLabel>
              <OutlinedInput
                id="d-house"
                value={deliveryAddress.house}
                onChange={(e) =>
                  setDeliveryAddressField("house", e.target.value)
                }
              />
            </FormControl>

            <FormControl
              sx={{
                flex: 5,
              }}
            >
              <InputLabel
                htmlFor="d-locality"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Address
              </InputLabel>
              <OutlinedInput
                id="d-locality"
                value={deliveryAddress.locality}
                onChange={(e) =>
                  setDeliveryAddressField("locality", e.target.value)
                }
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              my: 2,
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                lg: "row",
              },
              justifyContent: "space-between",
              "& .MuiFormControl-root ": {
                mx: 1,
              },
            }}
          >
            <FormControl
              sx={{
                flex: 1,
              }}
            >
              <InputLabel
                htmlFor="d-city"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                City
              </InputLabel>
              <OutlinedInput
                id="d-city"
                value={deliveryAddress.city}
                onChange={(e) =>
                  setDeliveryAddressField("city", e.target.value)
                }
              />
            </FormControl>

            <FormControl
              sx={{
                flex: 1,
              }}
            >
              <InputLabel
                htmlFor="d-country"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Country
              </InputLabel>
              <Select
                labelId="d-country"
                id="d-country"
                label="Country"
                value={deliveryAddress.country}
                onChange={(e) =>
                  setDeliveryAddressField("country", e.target.value)
                }
              >
                <MenuItem value={"India"}>India (IN)</MenuItem>
                <MenuItem value={"United States"}>United States (US)</MenuItem>
                <MenuItem value={"China"}>China (CN)</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                flex: 1,
              }}
            >
              <InputLabel
                htmlFor="d-pin"
                sx={{
                  bgcolor: "white",
                  px: "5px",
                }}
              >
                Pin Code
              </InputLabel>
              <OutlinedInput
                id="d-pin"
                value={deliveryAddress.pincode}
                onChange={(e) =>
                  setDeliveryAddressField("pincode", e.target.value)
                }
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "& .MuiBox-root": {
                mx: 1,
              },
            }}
          >
            <Box>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                type="submit"
              >
                Add Address
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={() => setDeliveryAddressOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
