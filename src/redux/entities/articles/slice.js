import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getArticles } from "./getArticles";
import { postArticle } from "./postArticle";
import { deleteArticle } from "./deleteArticle";
import { putArticle } from "./putArticle";

const entityAdapter = createEntityAdapter({
  sortComparer: (a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1),
  selectId: (entity) => entity._id,
});

export const articleSlice = createSlice({
  name: "articles",
  initialState: entityAdapter.getInitialState(),
  extraReducers: (bulder) => {
    bulder.addCase(getArticles.fulfilled, (state, { payload }) => {
      entityAdapter.setAll(state, payload);
    });
    bulder.addCase(postArticle.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
      entityAdapter.sortComparer;
    });
    bulder.addCase(deleteArticle.fulfilled, (state, { payload }) => {
      entityAdapter.removeOne(state, payload);
    });
    bulder.addCase(putArticle.fulfilled, (state, { payload }) => {
      entityAdapter.setOne(state, payload);
    });
  },
});

const selectArticleSlice = (state) => state.articles;

export const { selectIds: selectArticlesIds, selectById: selectArticleById } =
  entityAdapter.getSelectors(selectArticleSlice);
