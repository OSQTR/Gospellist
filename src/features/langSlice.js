// src/features/langSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { code: "en" }; // 'ko' | 'en'

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.code = state.code === "en" ? "ko" : "en";
    },
    setLang: (state, action) => {
      state.code = action.payload; // 'ko' or 'en'
    },
  },
});

export const { toggleLang, setLang } = langSlice.actions;
export default langSlice.reducer;
