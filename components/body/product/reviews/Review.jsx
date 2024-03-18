import {
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ReviewItem from "./ReviewItem";
import useReviews from "../../hooks/useReviews";
import AuthContext from "../../../../auth/AuthContext";

const Review = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  const { reviews, dispatchReview, globalRating } = useReviews(productId);
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: "flex",
        mx: {
          xl: "130px",
          lg: "80px",
          md: "60px",
          sm: "40px",
          xs: "20px",
        },
        mt: "60px",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flex: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={1}>
          Ratings
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              mr: 1,
            }}
          >
            <Rating value={globalRating} precision={0.5} sx={{ fontSize: "30px" }} readOnly />
          </Box>

          <Typography variant="h6" fontWeight={400}>
            {globalRating} out of 5
          </Typography>
        </Box>
        <Typography variant="subtitle1" color={grey[600]}>
          {reviews.length} total ratings
        </Typography>
        {user && (
          <Paper
            sx={{
              p: 2,
              my: 2,
            }}
            elevation={3}
          >
            <Typography variant="subtitle1">
              <b>Rate this Product:</b>
            </Typography>
            <Rating
              sx={{
                mt: 2,
              }}
              name="simple-controlled"
              value={rating}
              onChange={(_, newRating) => setRating(newRating)}
            />
            <Box
              sx={{
                fontFamily: "helvetica",
                fontSize: "14px",
                ml: "2px",
                color: grey[600],
              }}
            >
              Your Rating: {rating}/5
            </Box>
            <TextField
              sx={{
                mt: 2,
                width: "100%",
              }}
              label="Write a Review (Optional)"
              multiline
              value={reviewText}
              rows={4}
              onInput={({ target }) => setReviewText(target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() =>
                dispatchReview(
                  rating,
                  user?.username,
                  reviewText,
                  setReviewText
                )
              }
            >
              Submit
            </Button>
          </Paper>
        )}
      </Box>
      <Box
        sx={{
          flex: 6,
          ml: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Customer Reviews
        </Typography>
        <Box>
          {reviews.length === 0 ? (
            <Typography variant="subtitle1">No Reviews</Typography>
          ) : (
            reviews.map((review) => (
              <ReviewItem
                key={review.customer.name}
                rating={review.rating}
                text={review.text}
                name={review.customer.name}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
