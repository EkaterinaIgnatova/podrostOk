import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async () => {
    const response = await fetch("https://podrostok-syktyvkar.ru/api/articles");
    const result = await response.json();
    return result;
  }
);
