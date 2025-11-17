import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../../constants";
import axiosClient from "../../../oauth/client/axiosClient";

const useGiftCard = (username) => {
  const [giftCards, setGiftCards] = useState([]);

  const getGiftCards = () => {
    const config = {
      method: "GET",
      url: `${SPRING_BOOT_BASE_URL}/gift-cards/${username}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axiosClient(config)
      .then((response) => {
        setGiftCards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redeemGiftCard = (
    giftCardId,
    setErrorMessage,
    setSuccess,
    setShowProgressBar
  ) => {
    const config = {
      method: "POST",
      url: `${SPRING_BOOT_BASE_URL}/gift-cards/redeem`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        giftCardId: giftCardId,
      },
    };
    axiosClient(config)
      .then((response) => {
        setSuccess(true);
        getGiftCards();
      })
      .catch((error) => {
        setErrorMessage(error.response.data?.message);
      })
      .finally(() => {
        setShowProgressBar(false);
      });
  };

  useEffect(() => {
    getGiftCards();
  }, [username]);

  return {
    giftCards,
    redeemGiftCard,
  };
};

export default useGiftCard;
