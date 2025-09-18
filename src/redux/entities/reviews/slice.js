import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./getReviews";

const entityAdapter = createEntityAdapter();

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getReviews.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
  },
});

const selectReviewSlice = (state) => state.reviews;

export const { selectIds: selectReviewsIds, selectById: selectReviewById } =
  entityAdapter.getSelectors(selectReviewSlice);
