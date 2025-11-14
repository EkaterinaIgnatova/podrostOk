import { Box } from "@mui/material";
import { selectReviewById } from "../../redux/entities/reviews/slice";
import { useSelector } from "react-redux";
import { CustomDialog } from "../customDialog/customDialog";
import React, { useRef, useState } from "react";
import { DeleteButton } from "../deleteButton/deleteButton";
import { deleteReview } from "../../redux/entities/reviews/deleteReview";
import { EditButton } from "../editButton/editButton";
import { ReviewDialog } from "./reviewDialog";

export const ReviewItem = React.memo(({ id, isAdmin, width }) => {
  const review = useSelector((state) => selectReviewById(state, id));

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const toggleReviewDialog = () => {
    console.warn(review);
    setReviewDialogOpen((prevState) => !prevState);
  };

  const reviewActionsRef = useRef(null);
  const toggleActionsVisibility = (visible) => {
    if (reviewActionsRef.current)
      reviewActionsRef.current.style.display = visible ? "flex" : "none";
  };

  return (
    <>
      <Box
        sx={{
          width: width,
          minWidth: width,
        }}
      >
        <Box
          sx={{ position: "relative", margin: "4px 8px" }}
          onMouseEnter={() => toggleActionsVisibility(true)}
          onMouseLeave={() => toggleActionsVisibility(false)}
        >
          {isAdmin && (
            <Box
              ref={reviewActionsRef}
              sx={{
                width: "100%",
                alignItems: "start",
                position: "absolute",
                display: "none",
                justifyContent: "end",
                zIndex: "100",
                background: "rgba(255, 255, 255, 0.7)",
                padding: "8px",
                boxSizing: "border-box",
              }}
            >
              <EditButton component={<ReviewDialog />} data={review} />
              <DeleteButton
                id={id}
                title="Вы уверены, что хотите удалить отзыв?"
                method={deleteReview}
              />
            </Box>
          )}
          <Box
            sx={{
              height: "200px",
              padding: "16px",
              borderRadius: "4px",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
            onClick={toggleReviewDialog}
          >
            <h3 style={{ marginTop: 0 }}>{review.name}</h3>
            <Box
              sx={{
                height: "140px",
                overflow: "hidden",
                position: "relative",
                whiteSpace: "pre-line",
                "&:after": {
                  background:
                    "linear-gradient(to bottom, rgba(255, 255, 255, 0), white 100%)",
                  content: "''",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  height: "16px",
                },
              }}
            >
              {review.text}
            </Box>
          </Box>
        </Box>
      </Box>
      <CustomDialog
        isOpen={reviewDialogOpen}
        onCloseDialog={toggleReviewDialog}
        title={review.name}
        maxWidth="sm"
      >
        <Box sx={{ whiteSpace: "pre-line" }}>{review.text}</Box>
      </CustomDialog>
    </>
  );
});
