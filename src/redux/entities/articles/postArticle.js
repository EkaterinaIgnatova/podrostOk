import { createAsyncThunk } from "@reduxjs/toolkit";

export const postArticle = createAsyncThunk(
  "articles/postArticle",
  async (article) => {
    const response = await fetch(
      "https://podrostok-syktyvkar.ru/api/articles/new",
      {
        method: "POST",
        body: article,
      }
    );
    const result = await response.json();
    return result;
  }
);
