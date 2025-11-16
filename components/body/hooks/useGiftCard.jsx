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

  useEffect(() => {
    getGiftCards();
  }, [username]);

  return {
    giftCards,
  };
};

export default useGiftCard;
