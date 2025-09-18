import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "./getQuestions";

const entityAdapter = createEntityAdapter();

export const questionSlice = createSlice({
  name: "questions",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getQuestions.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
  },
});

const selectQuestionSlice = (state) => state.questions;

export const { selectIds: selectQuestionsIds, selectById: selectQuestionById } =
  entityAdapter.getSelectors(selectQuestionSlice);
