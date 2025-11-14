import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk("reviews/getReviews", async () => {
  const response = await fetch("http:/localhost:3000/api/reviews");
  const result = await response.json();
  return result;
});
