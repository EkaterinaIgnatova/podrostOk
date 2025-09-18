import { createSlice } from "@reduxjs/toolkit";

export const REQUEST_STATUS_IDLE = "idle";
export const REQUEST_STATUS_PENDING = "pending";
export const REQUEST_STATUS_REJECTED = "rejected";
export const REQUEST_STATUS_FULFILLED = "fulfilled";

export const requestSlice = createSlice({
  name: "requests",
  initialState: {},
  selectors: {
    selectRequestStatus: (state, id) => state[id] || REQUEST_STATUS_IDLE,
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        ({ type }) => type.endsWith("pending"),
        (state, { meta }) => {
          state[meta.requestId] = REQUEST_STATUS_PENDING;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("rejected"),
        (state, { meta }) => {
          state[meta.requestId] = REQUEST_STATUS_REJECTED;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("fulfilled"),
        (state, { meta }) => {
          state[meta.requestId] = REQUEST_STATUS_FULFILLED;
        }
      ),
});

export const { selectRequestStatus } = requestSlice.selectors;
