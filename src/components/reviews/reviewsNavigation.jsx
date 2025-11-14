import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { useState } from "react";

export const ReviewsNavigation = ({ reviewsIds, onReviewsScroll, matches }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextReview = () => {
    setActiveStep((prevState) => prevState + 1);
    onReviewsScroll(activeStep + 1);
  };

  const handlePreviousReview = () => {
    setActiveStep((prevState) => prevState - 1);
    onReviewsScroll(activeStep - 1);
  };

  const stepsCount =
    reviewsIds.length > matches.findIndex((match) => match)
      ? reviewsIds.length - matches.findIndex((match) => match)
      : 1;

  return (
    <MobileStepper
      variant="dots"
      steps={stepsCount}
      position="static"
      activeStep={activeStep}
      sx={{
        margin: "auto",
        width:
          stepsCount > 1
            ? "100%"
            : (100 / (matches.findIndex((match) => match) + 1)) *
                reviewsIds.length +
              "%",
      }}
      nextButton={
        <Button
          onClick={handleNextReview}
          disabled={activeStep === stepsCount - 1}
        >
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          sx={{ minWidth: "auto" }}
          onClick={handlePreviousReview}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
        </Button>
      }
    />
  );
};
