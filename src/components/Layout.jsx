// src/components/Layout.jsx
import React from "react";
import { Box, Container } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box minHeight="100vh" display="flex">
      <Nav />
      <Box flexGrow="1">
        <Container size="3" py="4" my="9" px="2">
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
