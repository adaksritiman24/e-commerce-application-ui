import { Avatar, Badge, Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { deepPurple, grey } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Close } from '@mui/icons-material';
import { getColorCoding } from '../../../common/utils/helpers';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Image from 'next/image';
import { GiftCardsModalContext } from '../../../../modals/GiftCardsModalProvider';


const LoggedInMobileNavControls = ({
    user,
    getInitials,
    handleNavigateToCartPage,
    handleNavigateToOrdersPage,
    handleLogout,
    numberOfItemsInCart,
    setDrawerOpen,
}) => {
    const { setGiftCardsModalOpen } = useContext(GiftCardsModalContext);
    return (
        <>
            <Stack padding={2} color={grey[200]} borderBottom="1px solid black" bgcolor={deepPurple[800]} >
                <Stack direction="row"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {
                            null == user.profilePicture ?
                                <>
                                    <Avatar sx={{ bgcolor: getColorCoding(user.name), width: 32, height: 32, fontSize: "16px", mr: 1 }} variant='rounded'>
                                        {getInitials(user.name)}
                                    </Avatar>
                                </> :
                                <>
                                    <Box sx={{
                                        mr: 1
                                    }}>
                                        <Image width={32} height={32} src={user.profilePicture} style={{
                                            borderRadius: 5,
                                        }} />
                                    </Box>
                                </>
                        }
                        <Typography variant='h5'>
                            {user.name.split(" ")[0]}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& svg": {
                                fontSize: "26px",
                                m: "0",
                                transform: "translateY(4px)"
                            },
                        }}
                    >
                        <Close
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => setDrawerOpen(false)}
                        />
                    </Box>
                </Stack>
            </Stack>

            <Stack spacing={2} padding={2}>
                <Box
                    sx={{
                        display: "flex",
                        "& svg": {
                            fontSize: "37px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <LocationOnIcon />
                    </Box>
                    <Box>
                        <Box>Ship To</Box>
                        <Box>
                            {null != user.address &&
                                <>
                                    <b style={{ fontSize: "22px" }}>{user.address.city}</b>, {user.address.country}
                                </>
                            }
                        </Box>
                    </Box>
                </Box>

                <Tooltip title="Your Orders">
                    <Button
                        sx={{
                            ml: 1,
                            color: grey[900]
                        }}
                        onClick={handleNavigateToOrdersPage}
                    >
                        <InventoryIcon />
                        <Typography variant='p'>
                            Your Orders
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Your Cart">
                    <Button
                        sx={{
                            ml: 1,
                            color: grey[900]
                        }}
                        onClick={handleNavigateToCartPage}
                    >
                        <Badge badgeContent={numberOfItemsInCart} showZero color="error">
                            <ShoppingCartIcon />
                        </Badge>
                        <Typography variant='p'>
                            Your Cart
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Gift Cards">
                    <Button
                        sx={{
                            ml: 1,
                            color: grey[900]
                        }}
                        onClick={() => setGiftCardsModalOpen(true)}
                    >
                        <AutoAwesomeIcon />
                        <Typography variant='p'>
                            Gift Cards
                        </Typography>
                    </Button>
                </Tooltip>

                <Tooltip title="Logout">
                    <Button
                        sx={{
                            ml: 1,
                            color: grey[900]
                        }}
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon />
                        <Typography variant='p'>
                            Logout
                        </Typography>
                    </Button>
                </Tooltip>
            </Stack>
        </>
    )
}

export default LoggedInMobileNavControls;