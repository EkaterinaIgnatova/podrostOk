import { useSelector } from "react-redux";
import { selectReviewsIds } from "../../redux/entities/reviews/slice";
import { getReviews } from "../../redux/entities/reviews/getReviews";
import { useRequest } from "../../redux/hooks/useRequest";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { ReviewItem } from "./reviewItem";
import { use, useEffect, useRef } from "react";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { ReviewsNavigation } from "./reviewsNavigation";
import { AdminContext } from "../adminContext/adminContext";
import { AddButton } from "../actionButtons/addButton";
import { ReviewDialog } from "./reviewDialog";

export const Reviews = ({ title }) => {
  const { isAdmin } = use(AdminContext);

  const { requestStatus, sendRequest } = useRequest(getReviews);
  const reviewsIds = useSelector(selectReviewsIds);

  useEffect(() => {
    sendRequest();
  }, []);

  const reviewsListRef = useRef(null);
  const handleReviewsScroll = (step) => {
    reviewsListRef.current.style.transform = `translateX(-${
      step * reviewsListRef.current.firstElementChild.clientWidth
    }px)`;
  };

  const matches = [
    useMediaQuery((theme) => theme.breakpoints.only("xs")),
    useMediaQuery((theme) => theme.breakpoints.only("sm")),
    useMediaQuery((theme) => theme.breakpoints.only("md")),
    useMediaQuery((theme) => theme.breakpoints.up("lg")),
  ];

  const reviewsWidth = 100 / (matches.findIndex((match) => match) + 1) + "%";

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{title}</h2>
          {isAdmin && <AddButton component={<ReviewDialog />} />}
        </Box>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список отзывов пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{title}</h2>
        {isAdmin && <AddButton component={<ReviewDialog />} />}
      </Box>
      <Box sx={{ overflow: "hidden", margin: "0 -8px" }}>
        <Box
          ref={reviewsListRef}
          sx={{
            display: "flex",
            transition: "0.5s ease-in-out",
            justifyContent:
              reviewsIds.length < matches.findIndex((match) => match) + 1
                ? "center"
                : "normal",
          }}
        >
          {reviewsIds.map((id) => (
            <ReviewItem
              key={id}
              id={id}
              isAdmin={isAdmin}
              width={reviewsWidth}
            />
          ))}
        </Box>
      </Box>
      <ReviewsNavigation
        reviewsIds={reviewsIds}
        onReviewsScroll={handleReviewsScroll}
        matches={matches}
      />
    </>
  );
};
