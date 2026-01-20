import { createAsyncThunk } from "@reduxjs/toolkit";

export const postQuestion = createAsyncThunk(
  "questions/postQuestion",
  async (question) => {
    const response = await fetch(
      "https://podrostok-syktyvkar.ru/api/questions/new",
      {
        method: "POST",
        body: question,
      }
    );
    const result = await response.json();
    return result;
  }
);
