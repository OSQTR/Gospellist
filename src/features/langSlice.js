// src/features/langSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { code: "ko" }; // 'ko' | 'en'

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.code = state.code === "ko" ? "en" : "ko";
    },
    setLang: (state, action) => {
      state.code = action.payload; // 'ko' or 'en'
    },
  },
});

export const { toggleLang, setLang } = langSlice.actions;
export default langSlice.reducer;
