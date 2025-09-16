// src/pages/About.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Flag } from "lucide-react";
import TextSection from "../components/TextSection";

export default function About() {
  const { messages, status } = useSelector((s) => s.i18n);

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const t = messages?.about?.main || {};
  const s1 = messages?.about?.section1 || {};
  const s2 = messages?.about?.section2 || {};
  const s3 = messages?.about?.section3 || {};
  const s4 = messages?.about?.section4 || {};
  const s5 = messages?.about?.section5 || {};

  return (
    <>
      {/* Hero */}
      <Container
        size="4"
        pt="9"
        px="2"
        style={{ backgroundColor: "var(--indigo-3)" }}
      >
        <Flex my="5" direction={{ initial: "column", sm: "row" }}>
          <Box p="4" width={{ initial: "100%", sm: "100%" }}>
            <Heading size="9" color="indigo" weight="bold" my="4">
              {t.title}
            </Heading>
            <Text as="p" color="gray" size="5" my="4">
              {t.sub_title}
            </Text>
            {t.cta ? (
              <Button color="indigo" variant="solid" size="3" radius="full">
                {t.cta}
              </Button>
            ) : null}
          </Box>
        </Flex>
      </Container>
      <Separator size="4" />

      <TextSection text={s1} />
      <TextSection text={s2} />
      <TextSection text={s3} />
      <TextSection text={s4} />
      <TextSection text={s5} />
    </>
  );
}
