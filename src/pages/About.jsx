// src/pages/About.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const lang = useSelector((s) => s.lang.code);
  return <h2>{lang === "en" ? "About Page" : "소개 페이지"}</h2>;
}
