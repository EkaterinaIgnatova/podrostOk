import { createAsyncThunk } from "@reduxjs/toolkit";

export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (review) => {
    const response = await fetch("http://localhost:3000/api/reviews/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const result = await response.json();

    return result;
  }
);
