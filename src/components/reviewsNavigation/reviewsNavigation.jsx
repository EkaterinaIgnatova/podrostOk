import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper, useMediaQuery } from "@mui/material";
import { useState } from "react";

export const ReviewsNavigation = ({ reviewsIds, onReviewsScroll }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextReview = () => {
    setActiveStep((prevState) => prevState + 1);
    onReviewsScroll(activeStep + 1);
  };

  const handlePreviousReview = () => {
    setActiveStep((prevState) => prevState - 1);
    onReviewsScroll(activeStep - 1);
  };

  const matches = [
    useMediaQuery((theme) => theme.breakpoints.only("xs")),
    useMediaQuery((theme) => theme.breakpoints.only("sm")),
    useMediaQuery((theme) => theme.breakpoints.only("md")),
    useMediaQuery((theme) => theme.breakpoints.up("lg")),
  ];

  return (
    <MobileStepper
      variant="dots"
      steps={reviewsIds.length - matches.findIndex((match) => match)}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          onClick={handleNextReview}
          disabled={
            activeStep ===
            reviewsIds.length - matches.findIndex((match) => match) - 1
          }
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
