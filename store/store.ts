import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./globalSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch