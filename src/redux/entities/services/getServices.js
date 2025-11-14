import { createAsyncThunk } from "@reduxjs/toolkit";

export const getServices = createAsyncThunk(
  "services/getServices",
  async () => {
    const response = await fetch("https://podrostok-syktyvkar.ru/api/services");
    const result = await response.json();
    return result.reverse();
  }
);
