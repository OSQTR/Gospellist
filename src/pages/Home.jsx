// src/pages/Home.jsx
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { messages, status } = useSelector((s) => s.i18n);
  const navigate = useNavigate();

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const t = messages?.home?.main || {};
  const s1 = messages?.home?.section1 || {};

  const ctaHandler = () => {
    navigate("/about");
  };

  return (
    <Box>
      <Box my="8">
        <Heading size="9" color="indigo" wrap="balance">
          {t.title}
        </Heading>
        <Text as="p" color="gray" size="5" my="4">
          {t.sub_title}
        </Text>
        <Button
          color="indigo"
          variant="solid"
          size="3"
          radius="full"
          onClick={ctaHandler}
        >
          {t.cta}
        </Button>
      </Box>
      <Box>
        <section style={{ marginTop: 24 }}>
          <h3>{s1.title}</h3>
          <p>{s1.sub_title}</p>
        </section>
      </Box>
    </Box>
  );
}
