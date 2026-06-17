import { configureStore } from "@reduxjs/toolkit";
import { api } from "../service/api";
import userReducer from "../features/user/userSlice"
import themeReducer from "../features/theme/themeSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
