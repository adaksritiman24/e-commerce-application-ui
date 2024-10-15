import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../../constants";
import axiosClient from "../../../oauth/client/axiosClient";

const useReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [globalRating, setGlobalRating] = useState(0);

  const fetchAllReviews = async () => {
    const config = {
      method: "get",
      url: `${SPRING_BOOT_BASE_URL}/ratings/${productId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axiosClient(config);
      setReviews(response.data);
      calculateCombinedRating(response.data);

    } catch (e) {
      console.log("Error while fetching review: ", e);
    }
  };

  const calculateCombinedRating = (updatedReviews)=> {
    if(updatedReviews.length === 0) {
        setGlobalRating(0);
        return;
    }
    let sum = 0; 
    let qty = 0;
    for(let review of updatedReviews) {
        qty +=1;
        sum+=review.rating;
    }
    setGlobalRating(parseFloat(new String(sum/qty)).toFixed(1));
  }

  const dispatchReview = async (rating, username, text, setReviewText) => {
    var data = {
      username: username,
      rating: rating,
      text: text,
    };

    const config = {
      method: "post",
      url: `${SPRING_BOOT_BASE_URL}/ratings/${productId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    if (username != null) {
      try {
        console.log(rating, text, username);
        await axiosClient(config);
        setReviewText("");
        fetchAllReviews();
      } catch (e) {
        console.log("Error while dispatching review: ", e);
      }
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [productId]);

  return {
    reviews,
    globalRating,
    dispatchReview,
  };
};

export default useReviews;
