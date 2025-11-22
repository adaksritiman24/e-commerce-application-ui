import {
  Box,
  Grid,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import GiftCard from "../components/common/giftcards/GiftCard";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import AuthContext from "../auth/AuthContext";
import useGiftCard from "../components/body/hooks/useGiftCard";

const modalValues = {
  giftCardSelectorModalOpen: false,
  setGiftCardsSelectorModalOpen: () => {},
  selectedGiftCard: null,
  setSelectedGiftCard: () => {},
  giftCards: [],
};

export const GiftCardsSelectorModalContext = createContext(modalValues);

export const GiftCardsSelectorModalProvider = ({ children }) => {
  const [giftCardSelectorModalOpen, setGiftCardsSelectorModalOpen] =
    useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);
  const { user } = useContext(AuthContext);
  const { giftCards } = useGiftCard(user.username);

  const giftCardSelectorModalContextValues = {
    giftCardSelectorModalOpen,
    setGiftCardsSelectorModalOpen,
    setSelectedGiftCard,
    selectedGiftCard,
    giftCards,
  };
  return (
    <GiftCardsSelectorModalContext.Provider
      value={giftCardSelectorModalContextValues}
    >
      {children}
      <GiftCardSelectorModal
        giftCardsModalOpen={giftCardSelectorModalOpen}
        setGiftCardsModalOpen={setGiftCardsSelectorModalOpen}
        setSelectedGiftCard={setSelectedGiftCard}
      />
    </GiftCardsSelectorModalContext.Provider>
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

const getGiftItemHoverState = (active) => {
  return active
    ? {
        cursor: "pointer",
        transform: "scale(1.02)",
      }
    : {
        cursor: "not-allowed",
      };
};

const GiftCardSelectorModal = ({
  giftCardsModalOpen,
  setGiftCardsModalOpen,
  setSelectedGiftCard,
}) => {
  const { giftCards } = useContext(GiftCardsSelectorModalContext);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: grey[400],
          }}
        >
          <Typography
            id="gift-cards-modal-title"
            fontWeight="600"
            fontSize={20}
            ml={2}
            sx={{
              lineHeight: 3,
            }}
          >
            Select A Gift Card
          </Typography>
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
            {giftCards.map((giftCard) => (
              <Grid
                item
                sx={{
                  m: 1.5,
                  transition: "transform 0.3s ease",
                  ":hover": getGiftItemHoverState(giftCard.active),
                }}
                key={giftCard.id}
                onClick={() => {
                  if (giftCard.active) {
                    setSelectedGiftCard(giftCard);
                    setGiftCardsModalOpen(false);
                  }
                }}
              >
                <GiftCard giftcard={giftCard} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </StyledModalBox>
    </Modal>
  );
};
