// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import langReducer from "../features/langSlice";
import i18nReducer from "../features/i18nSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    i18n: i18nReducer,
  },
});
