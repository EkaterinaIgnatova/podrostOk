import { useSelector } from "react-redux";
import { selectReviewsIds } from "../../redux/entities/reviews/slice";
import { getReviews } from "../../redux/entities/reviews/getReviews";
import { useRequest } from "../../redux/hooks/useRequest";
import { Box, CircularProgress } from "@mui/material";
import { ReviewItem } from "../reviewItem/reviewItem";
import { use, useRef } from "react";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { ReviewsNavigation } from "../reviewsNavigation/reviewsNavigation";

export const Reviews = ({ title }) => {
  const ref = useRef(null);
  const requestStatus = useRequest(getReviews);
  const reviewsIds = useSelector(selectReviewsIds);

  const handleReviewsScroll = (step) => {
    ref.current.style.transform = `translateX(-${
      step * ref.current.firstElementChild.clientWidth
    }px)`;
  };

  if (
    requestStatus === REQUEST_STATUS_IDLE ||
    requestStatus === REQUEST_STATUS_PENDING
  ) {
    return (
      <>
        <h2>{title}</h2>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={30} />
        </Box>
      </>
    );
  }

  if (!reviewsIds.length) {
    return (
      <>
        <h2>{title}</h2>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список отзывов пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <Box sx={{ overflow: "hidden", margin: "0 -8px" }}>
        <Box
          ref={ref}
          sx={{
            display: "flex",
            transition: "0.5s ease-in-out",
          }}
        >
          {reviewsIds.map((id) => (
            <ReviewItem key={id} id={id} />
          ))}
        </Box>
      </Box>
      <ReviewsNavigation
        reviewsIds={reviewsIds}
        onReviewsScroll={handleReviewsScroll}
      />
    </>
  );
};
