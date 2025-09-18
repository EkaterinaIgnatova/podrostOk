import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getArticles } from "./getArticles";

const entityAdapter = createEntityAdapter();

export const articleSlice = createSlice({
  name: "articles",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getArticles.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
  },
});

const selectArticleSlice = (state) => state.articles;

export const { selectIds: selectArticlesIds, selectById: selectArticleById } =
  entityAdapter.getSelectors(selectArticleSlice);
