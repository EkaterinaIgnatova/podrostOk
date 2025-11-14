import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/questions/delete/${questionId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  }
);
