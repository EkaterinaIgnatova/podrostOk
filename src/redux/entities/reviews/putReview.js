import { createAsyncThunk } from "@reduxjs/toolkit";

export const putReview = createAsyncThunk(
  "reviews/putReview",
  async (review) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/reviews/update/${review._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    );
    const result = await response.json();
    return result;
  }
);
