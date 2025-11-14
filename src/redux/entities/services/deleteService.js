import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceId) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/services/delete/${serviceId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  }
);
