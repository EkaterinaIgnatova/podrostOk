import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getServices } from "./getServices";
import { postService } from "./postService";
import { deleteService } from "./deleteService";
import { putService } from "./putServices";

const entityAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.order > b.order ? 1 : -1),
  selectId: (entity) => entity._id,
});

export const serviceSlice = createSlice({
  name: "services",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getServices.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
    bulder.addCase(postService.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
      entityAdapter.sortComparer;
    });
    bulder.addCase(deleteService.fulfilled, (state, { payload }) => {
      entityAdapter.removeOne(state, payload);
    });
    bulder.addCase(putService.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
  },
});

const selectServiceSlice = (state) => state.services;

export const { selectIds: selectServicesIds, selectById: selectServiceById } =
  entityAdapter.getSelectors(selectServiceSlice);
