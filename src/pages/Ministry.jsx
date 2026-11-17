// src/pages/Ministry.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { MINISTRY_ICONS } from "../components/ministryIcons";
import { ArrowRight } from "lucide-react";

export default function Ministry() {
  const { id } = useParams();
  const { messages, status } = useSelector((s) => s.i18n);

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const items = messages?.ministry?.items || [];
  const ui = messages?.ministry?.ui || {};
  if (status !== "succeeded") return null;

  const m = items.find((x) => x.id === id);
  if (!m) return <Navigate to="/" replace />;

  const Icon = MINISTRY_ICONS[m.id];

  return (
    <>
      {/* Hero */}
      <Box className="hero-banner">
        <Container size="4" px="4" pt="9" pb="6">
          <Box pt="8">
            <Flex align="center" gap="3" className="hero-sub">
              {Icon ? <Icon size={28} /> : null}
              <Text size="4">{m.pain}</Text>
            </Flex>
            <Heading
              size={{ initial: "8", sm: "9" }}
              weight="bold"
              my="4"
              className="hero-title"
            >
              {m.name}
            </Heading>
          </Box>
          {/* 사역 전환 탭 */}
          <Flex gap="2" wrap="wrap" mt="5" aria-label={ui.list}>
            {items.map((x) => (
              <RouterLink
                key={x.id}
                to={`/ministry/${x.id}`}
                className={`hero-tab${x.id === m.id ? " hero-tab-active" : ""}`}
                aria-current={x.id === m.id ? "page" : undefined}
              >
                {x.name}
              </RouterLink>
            ))}
          </Flex>
        </Container>
      </Box>

      {/* 요약 */}
      <Container size="3" px="4" py="6">
        {m.summary?.map((p, i) => (
          <Text key={i} as="p" color="gray" size="5" my="3">
            {p}
          </Text>
        ))}
      </Container>

      <Separator size="4" />

      {/* 세부 사역 */}
      <Container size="3" px="4" py="6">
        <Heading size="7" color="indigo" mb="4">
          {ui.detail}
        </Heading>
        {m.detail?.map((p, i) => (
          <Text key={i} as="p" color="gray" size="4" my="3">
            {p}
          </Text>
        ))}
        {/* 성경앱: 개발 내용은 별도 페이지(/project) */}
        {m.id === "bible-app" && (
          <Button asChild color="indigo" size="3" radius="full" mt="4">
            <RouterLink to="/project">
              {ui.app_cta} <ArrowRight size={16} />
            </RouterLink>
          </Button>
        )}
      </Container>
    </>
  );
}
