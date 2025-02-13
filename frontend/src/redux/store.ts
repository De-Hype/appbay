import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "./userSlice";
import actionsReducer from "./actionSlice";
import itemsReducer from "./itemSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    items:itemsReducer,
    actions:actionsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;