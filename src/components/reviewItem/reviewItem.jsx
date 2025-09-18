import { Box } from "@mui/material";
import { selectReviewById } from "../../redux/entities/reviews/slice";
import { useSelector } from "react-redux";
import { CustomDialog } from "../customDialog/customDialog";
import { useState } from "react";

export const ReviewItem = ({ id }) => {
  const review = useSelector((state) => selectReviewById(state, id));

  const [dialodOpen, setDialogOpen] = useState(false);

  const toggleReviewDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: {
            xs: "100%",
            sm: "50%",
            md: "33.3%",
            lg: "25%",
          },
          cursor: "pointer",
        }}
        onClick={toggleReviewDialog}
      >
        <Box sx={{ padding: "4px 8px" }}>
          <Box
            sx={{
              height: "200px",
              padding: "8px 16px 16px 16px",
              borderRadius: "4px",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3>{review.name}</h3>
            <Box
              sx={{
                height: "140px",
                overflow: "hidden",
                position: "relative",
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
        isOpen={dialodOpen}
        onCloseDialog={toggleReviewDialog}
        title={review.name}
        maxWidth="sm"
        showActions={false}
      >
        <p>{review.text}</p>
      </CustomDialog>
    </>
  );
};
