import { configureStore } from "@reduxjs/toolkit";
import { reviewSlice } from "./entities/reviews/slice";
import { requestSlice } from "./entities/requests/slice";
import { articleSlice } from "./entities/articles/slice";
import { questionSlice } from "./entities/questions/slice";
import { serviceSlice } from "./entities/services/slice";

export const store = configureStore({
  reducer: {
    [reviewSlice.name]: reviewSlice.reducer,
    [articleSlice.name]: articleSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
    [serviceSlice.name]: serviceSlice.reducer,
    [requestSlice.name]: requestSlice.reducer,
  },
});
