import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import GiftCard from "../components/common/giftcards/GiftCard";
import CloseIcon from "@mui/icons-material/Close";
import { deepPurple, grey } from "@mui/material/colors";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AuthContext from "../auth/AuthContext";
import useGiftCard from "../components/body/hooks/useGiftCard";
import AddGiftCardModal from "./AddGiftCardModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const modalValues = {
  giftCardsModalOpen: false,
  setGiftCardsModalOpen: () => {},
  giftCards: [],
};

export const GiftCardsModalContext = createContext(modalValues);

export const GiftCardsModalProvider = ({ children }) => {
  const [giftCardsModalOpen, setGiftCardsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { giftCards } = useGiftCard(user?.username);

  const giftCardModalContextValues = {
    giftCardsModalOpen,
    setGiftCardsModalOpen,
    giftCards,
  };
  return (
    <GiftCardsModalContext.Provider value={giftCardModalContextValues}>
      {children}
      <GiftCardsModal
        giftCardsModalOpen={giftCardsModalOpen}
        setGiftCardsModalOpen={setGiftCardsModalOpen}
      />
    </GiftCardsModalContext.Provider>
  );
};

const StyledModalBox = styled(Box)({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: 24,
  p: 12,
  zIndex: 5000,
  boxSizing: "border-box",
});

const GiftCardsModal = ({ giftCardsModalOpen, setGiftCardsModalOpen }) => {
  const { giftCards } = useContext(GiftCardsModalContext);
  const [addGiftCardModalOpen, setAddGiftCardModalOpen] = useState(false);

  return (
    <Modal
      open={giftCardsModalOpen}
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
          overflow: "hidden",
        }}
      >
        <AddGiftCardModal
          addGiftCardModalOpen={addGiftCardModalOpen}
          setAddGiftCardModalOpen={setAddGiftCardModalOpen}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: deepPurple[200],
          }}
        >
          <Box
            id="gift-cards-modal-title"
            fontWeight="600"
            fontSize={20}
            ml={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AutoAwesomeIcon
              sx={{
                mr: 2,
              }}
            />
            <Typography
              sx={{
                lineHeight: 3,
                mr: 2,
              }}
            >
              Gift Cards
            </Typography>
            <Button
              variant="contained"
              onClick={() => setAddGiftCardModalOpen(true)}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Box>
          <IconButton
            sx={{
              color: grey[900],
              mr: 1,
            }}
            disableRipple
            onClick={() => setGiftCardsModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: {
              lg: "50vh",
              sm: "50vh",
              xs: "50vh",
            },
            overflowY: "scroll",
            scrollbarWidth: 0,
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: "auto, auto",
              padding: 1,
              backgroundColor: grey[50],
            }}
          >
            {giftCards.length == 0 ? (
              <Typography textAlign="center" mt={10} color="text.secondary">
                You don't have any gift cards.
              </Typography>
            ) : (
              <>
                {giftCards.map((giftCard) => (
                  <Grid
                    item
                    sx={{
                      m: 1.5,
                    }}
                    key={giftCard.id}
                  >
                    <GiftCard giftcard={giftCard} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </StyledModalBox>
    </Modal>
  );
};
