import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/reviews/delete/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  }
);
