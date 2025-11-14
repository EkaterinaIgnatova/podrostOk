import { createAsyncThunk } from "@reduxjs/toolkit";

export const putArticle = createAsyncThunk(
  "articles/putArticle",
  async (article) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/articles/update/${article.get(
        "_id"
      )}`,
      {
        method: "PUT",
        body: article,
      }
    );
    const result = await response.json();
    return result;
  }
);
