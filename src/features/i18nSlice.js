// src/features/i18nSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadMessages = createAsyncThunk(
  "i18n/loadMessages",
  async (lang) => {
    const res = await fetch(`/locale/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`load failed: ${res.status}`);
    return { lang, data: await res.json() };
  }
);

const i18nSlice = createSlice({
  name: "i18n",
  initialState: { current: "en", messages: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadMessages.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(loadMessages.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.current = a.payload.lang;
      s.messages = a.payload.data;
    });
    b.addCase(loadMessages.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
      s.messages = {};
    });
  },
});

export default i18nSlice.reducer;
