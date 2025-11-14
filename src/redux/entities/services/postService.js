import { createAsyncThunk } from "@reduxjs/toolkit";

export const postService = createAsyncThunk(
  "services/postService",
  async (service) => {
    const response = await fetch(
      "https://podrostok-syktyvkar.ru/api/services/new",
      {
        method: "POST",
        body: service,
      }
    );
    const result = await response.json();
    return result;
  }
);
