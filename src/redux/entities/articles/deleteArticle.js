import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/articles/delete/${articleId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  }
);
