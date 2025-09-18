import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getServices } from "./getServices";

const entityAdapter = createEntityAdapter();

export const serviceSlice = createSlice({
  name: "services",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getServices.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
  },
});

const selectServiceSlice = (state) => state.services;

export const { selectIds: selectServicesIds, selectById: selectServiceById } =
  entityAdapter.getSelectors(selectServiceSlice);
