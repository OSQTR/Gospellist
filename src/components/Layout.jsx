// src/components/Layout.jsx
import React from "react";
import { Box, Container, Section } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box minHeight="100vh" display="flex">
      <Nav />
      <Outlet />
      <Footer />
    </Box>
  );
}
