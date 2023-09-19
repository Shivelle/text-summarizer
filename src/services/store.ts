import { configureStore } from "@reduxjs/toolkit";
import { textApi } from "./text";

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(textApi.middleware),
});
