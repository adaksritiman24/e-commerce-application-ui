import { Box, Button, FormControl, Grid, InputLabel, Modal, OutlinedInput, Stack, Typography } from "@mui/material";
import { createContext, useState } from "react";

const modalValues = {
    deliveryAddressOpen: false,
    setDeliveryAddressOpen: () => {},
    deliveryAddress: {
        name: null,
        house: null,
        locality: null,
        city: null,
        country: null,
        pincode: null,
        phone: null,
        email: null
    },
    setDeliveryAddress: ()=> {}
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius : "2px",
    boxShadow: 24,
    p: 4,
    zIndex : 5000,
  };

export const DeliveryAddressContext = createContext(modalValues);

export const DeliverAddressModelProvider = ({children}) => {
    const [deliveryAddressOpen, setDeliveryAddressOpen] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(false);
    const contextValues = {
        deliveryAddress,
        setDeliveryAddress,
        deliveryAddressOpen,
        setDeliveryAddressOpen
    }

    return <DeliveryAddressContext.Provider value={contextValues}>
        <>
        {children}
        <DeliveryAddressModal
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            deliveryAddressOpen={deliveryAddressOpen}
            setDeliveryAddressOpen={setDeliveryAddressOpen}
        />
        </>
    </DeliveryAddressContext.Provider>
}

const DeliveryAddressModal = ({
    deliveryAddress,
    setDeliveryAddress,
    deliveryAddressOpen,
    setDeliveryAddressOpen
})=> {
    return (<Modal
    open={deliveryAddressOpen}
    onClose={()=>setDeliveryAddressOpen(false)}
    aria-labelledby="delivery-modal-title"
    aria-describedby="delivery-modal-description"
    sx={{
      "& button" : {
        textTransform : "none",
        width  : "100%",
      }
    }}
    >
        <Box
            sx={{
            ...style,
            minWidth : {
                lg : "600px",
                sm : "500px",
                xs : "320px",
            },
            boxSizing : "border-box",
        }}>
        <Typography sx={{mx:1}} id="delivery-modal-title" variant="h6" component="h2" fontWeight="600">
            Add/Edit Delivery Address
        </Typography>
        <form onSubmit={(e)=>handleLogin(e)}>
            <Box
                sx={{
                    my : 1,
                    display : 'flex',
                    flexDirection : {
                        xs: "column",
                        sm: "column",
                        lg: "row"
                    },
                    justifyContent : "space-between",
                    "& .MuiFormControl-root ": {
                        mx : 1,
                    },
                }}

            >
                <FormControl
                    sx={{
                        flex : 3
                    }}
                >
                    <InputLabel htmlFor="d-name"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Name
                    </InputLabel>
                    <OutlinedInput
                    id="d-name"
                    />
                </FormControl>

                <FormControl
                    sx={{
                        flex : 2
                    }}
                >
                    <InputLabel htmlFor="d-phone"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Phone No.
                    </InputLabel>
                    <OutlinedInput
                    id="d-phone"
                    />
                </FormControl>

                <FormControl
                    sx={{
                        flex : 2
                    }}
                >
                    <InputLabel htmlFor="d-email"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Email
                    </InputLabel>
                    <OutlinedInput
                    id="d-email"
                    />
                </FormControl>
            </Box>
            
            <Box
                sx={{
                    my : 2,
                    display : 'flex',
                    flexDirection : {
                        xs: "column",
                        sm: "column",
                        lg: "row"
                    },
                    justifyContent : "space-between",
                    "& .MuiFormControl-root ": {
                        mx : 1,
                    }
                }}

            >

                <FormControl
                    sx={{
                        flex : 2
                    }}
                >
                    <InputLabel htmlFor="d-house"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        House No.
                    </InputLabel>
                    <OutlinedInput
                    id="d-house"
                    />
                </FormControl>

                <FormControl
                    sx={{
                        flex : 5
                    }}
                >
                    <InputLabel htmlFor="d-locality"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Address
                    </InputLabel>
                    <OutlinedInput
                    id="d-locality"
                    />
                </FormControl>
            </Box>
            
            <Box
                sx={{
                    my : 2,
                    display : 'flex',
                    flexDirection : {
                        xs: "column",
                        sm: "column",
                        lg: "row"
                    },
                    justifyContent : "space-between",
                    "& .MuiFormControl-root ": {
                        mx : 1,
                    }
                }}

            >

                <FormControl
                    sx={{
                        flex : 1
                    }}
                >
                    <InputLabel htmlFor="d-city"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        City
                    </InputLabel>
                    <OutlinedInput
                    id="d-city"
                    />
                </FormControl>

                <FormControl
                    sx={{
                        flex : 1
                    }}
                >
                    <InputLabel htmlFor="d-country"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Country
                    </InputLabel>
                    <OutlinedInput
                    id="d-country"
                    />
                </FormControl>

                <FormControl
                    sx={{
                        flex : 1
                    }}
                >
                    <InputLabel htmlFor="d-pin"
                    sx={{
                        bgcolor : "white",
                        px : "5px",
                    }}
                    >
                        Pin Code
                    </InputLabel>
                    <OutlinedInput
                    id="d-pin"
                    />
                </FormControl>

            </Box>
            <Box
                sx={{
                    display : "flex",
                    flexDirection : "row",
                    "& .MuiBox-root": {
                        mx: 1
                    }
                }}
            >
                <Box>
                    <Button variant='contained' size="medium" color='primary' type='submit'>
                        Add Address
                    </Button>
                </Box>
                <Box>
                    <Button variant='contained' size='medium' color='error' onClick={()=>setDeliveryAddressOpen(false)}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </form>
        </Box>
    </Modal>)
}