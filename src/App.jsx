// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "@radix-ui/themes";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import { loadMessages } from "./features/i18nSlice";

export default function App() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.code);

  useEffect(() => {
    dispatch(loadMessages(lang));
  }, [lang, dispatch]);

  return (
    <Theme appearance={mode === "dark" ? "dark" : "light"}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Theme>
  );
}
