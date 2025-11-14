import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./getReviews";
import { postReview } from "./postReview";
import { deleteReview } from "./deleteReview";
import { putReview } from "./putReview";

const entityAdapter = createEntityAdapter({
  sortComparer: (a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1),
  selectId: (entity) => entity._id,
});

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getReviews.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
    bulder.addCase(postReview.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
    bulder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      entityAdapter.removeOne(state, payload);
    });
    bulder.addCase(putReview.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
  },
});

const selectReviewSlice = (state) => state.reviews;

export const { selectIds: selectReviewsIds, selectById: selectReviewById } =
  entityAdapter.getSelectors(selectReviewSlice);
