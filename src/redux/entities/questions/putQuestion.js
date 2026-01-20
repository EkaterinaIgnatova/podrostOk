import { createAsyncThunk } from "@reduxjs/toolkit";

export const putQuestion = createAsyncThunk(
  "questions/putQuestion",
  async (question) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/questions/update/${question.get(
        "_id"
      )}`,
      {
        method: "PUT",
        body: question,
      }
    );
    const result = await response.json();
    return result;
  }
);
