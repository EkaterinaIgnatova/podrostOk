import { createAsyncThunk } from "@reduxjs/toolkit";

export const putService = createAsyncThunk(
  "services/putService",
  async (service) => {
    const response = await fetch(
      `https://podrostok-syktyvkar.ru/api/services/update/${service.get(
        "_id"
      )}`,
      {
        method: "PUT",
        body: service,
      }
    );
    const result = await response.json();
    return result;
  }
);
