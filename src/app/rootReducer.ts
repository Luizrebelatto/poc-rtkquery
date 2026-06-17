import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../service/api";
import userReducer from "../features/user/userSlice";
import themeReducer from "../features/theme/themeSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,

  [api.reducerPath]: api.reducer,
});
