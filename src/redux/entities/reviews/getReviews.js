import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk("reviews/getReviews", async () => {
  const response = await fetch("https://podrostok-syktyvkar.ru/api/reviews");
  const result = await response.json();
  return result.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
});
