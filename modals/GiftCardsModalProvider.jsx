import { Box, Grid, IconButton, Modal, styled, Typography } from "@mui/material";
import { createContext, useState } from "react"
import GiftCard from "../components/common/giftcards/GiftCard";
import CloseIcon from '@mui/icons-material/Close';
import { deepPurple, grey, purple } from "@mui/material/colors";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const modalValues = {
    giftCardsModalOpen: false,
    setGiftCardsModalOpen: () => { }
};

export const GiftCardsModalContext = createContext(modalValues);

export const GiftCardsModalProvider = ({
    children
}) => {
    const [giftCardsModalOpen, setGiftCardsModalOpen] = useState(false);

    const giftCardModalContextValues = {
        giftCardsModalOpen,
        setGiftCardsModalOpen
    }
    return (
        <GiftCardsModalContext.Provider value={giftCardModalContextValues}>
            {children}
            <GiftCardsModal
                giftCardsModalOpen={giftCardsModalOpen}
                setGiftCardsModalOpen={setGiftCardsModalOpen}
            />
        </GiftCardsModalContext.Provider>
    )
}

const StyledModalBox = styled(Box)({
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    zIndex: 5000,
    boxSizing: "border-box",
})

const GiftCardsModal = ({
    giftCardsModalOpen,
    setGiftCardsModalOpen
}) => {
    return (
        <Modal
            open={giftCardsModalOpen}
            onClose={() => setGiftCardsModalOpen(false)}
            aria-labelledby="gift-card-modal-title"
            aria-describedby="gift-card-modal-description"
        >
            <StyledModalBox
                sx={{
                    width: {
                        lg: "400px",
                        sm: "400px",
                        xs: "340px",
                    },
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: deepPurple[200],
                    }}
                >
                    <Typography
                        id="gift-cards-modal-title"
                        fontWeight="600"
                        fontSize={20}
                        ml={2}
                        sx={{
                            lineHeight: 3
                        }}
                    >

                        <AutoAwesomeIcon sx={{
                            mr: 2
                        }} />
                        Gift Cards
                    </Typography>
                    <IconButton
                        sx={{
                            color: grey[900],
                            mr: 1
                        }}
                        disableRipple
                        onClick={() => setGiftCardsModalOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{
                    height: {
                        lg: "50vh",
                        sm: "50vh",
                        xs: "50vh",
                    },
                    overflow: "scroll"
                }}>
                    <Grid container
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "auto, auto",
                            padding: 1,
                            backgroundColor: grey[50]
                        }}
                    >
                        <Grid item>
                            <GiftCard />
                        </Grid>
                        <Grid item>
                            <GiftCard />
                        </Grid>
                        <Grid item>
                            <GiftCard />
                        </Grid>
                        <Grid item>
                            <GiftCard />
                        </Grid>
                        <Grid item>
                            <GiftCard />
                        </Grid>
                    </Grid>
                </Box>
            </StyledModalBox>
        </Modal>
    )
}