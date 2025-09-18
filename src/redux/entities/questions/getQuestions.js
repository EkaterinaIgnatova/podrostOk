import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    const response = await fetch(
      "https://podrostok-syktyvkar.ru/api/questions"
    );
    const result = await response.json();
    return result;
  }
);
