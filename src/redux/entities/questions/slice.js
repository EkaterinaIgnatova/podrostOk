import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "./getQuestions";
import { postQuestion } from "./postQuestion";
import { deleteQuestion } from "./deleteQuestion";
import { putQuestion } from "./putQuestion";

const entityAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.order > b.order ? 1 : -1),
  selectId: (entity) => entity._id,
});

export const questionSlice = createSlice({
  name: "questions",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getQuestions.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
    bulder.addCase(postQuestion.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
    bulder.addCase(deleteQuestion.fulfilled, (state, { payload }) => {
      entityAdapter.removeOne(state, payload);
    });
    bulder.addCase(putQuestion.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
  },
});

const selectQuestionSlice = (state) => state.questions;

export const { selectIds: selectQuestionsIds, selectById: selectQuestionById } =
  entityAdapter.getSelectors(selectQuestionSlice);
