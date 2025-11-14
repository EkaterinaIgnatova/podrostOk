import { createAsyncThunk } from "@reduxjs/toolkit";

export const putQuestion = createAsyncThunk(
  "questions/putQuestion",
  async (question) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/questions/update/${question._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      }
    );
    const result = await response.json();
    return result;
  }
);
