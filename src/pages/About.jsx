import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { ArrowRight, Flag } from "lucide-react";
import { MINISTRY_ICONS } from "../components/ministryIcons";
import WorldImg from "../assets/undraw_connected-world_anke.svg";
import StepImg from "../assets/undraw_stepping-up.svg";

// 이미지 + 텍스트 2단 블록 (reverse: 이미지 오른쪽)
function SplitSection({ img, alt, reverse, tinted, children }) {
  return (
    <Section
      size="2"
      style={tinted ? { backgroundColor: "var(--indigo-2)" } : undefined}
    >
      <Container size="4" px="4">
        <Flex
          gap="6"
          align="center"
          direction={{
            initial: "column",
            sm: reverse ? "row-reverse" : "row",
          }}
        >
          <Box width={{ initial: "100%", sm: "45%" }} flexShrink="0">
            <img
              src={img}
              alt={alt}
              width="100%"
              height="auto"
              style={{ display: "block" }}
            />
          </Box>
          <Box width={{ initial: "100%", sm: "55%" }}>{children}</Box>
        </Flex>
      </Container>
    </Section>
  );
}

export default function About() {
  const { messages, status } = useSelector((s) => s.i18n);

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const a = messages?.about || {};
  const main = a.main || {};
  const mission = a.mission || {};
  const history = a.history || {};
  const app = a.app || {};
  const together = a.together || {};
  const closing = a.closing || {};
  const ministries = messages?.ministry?.items || [];

  return (
    <>
      {/* Hero */}
      <Box className="hero-banner">
        <Container size="4" px="4" pt="9" pb="6">
          <Flex
            pt="8"
            gap="6"
            align="center"
            direction={{ initial: "column", sm: "row" }}
          >
            <Box width={{ initial: "100%", sm: "55%" }}>
              <Heading
                size={{ initial: "8", sm: "9" }}
                weight="bold"
                my="4"
                className="hero-title logo"
              >
                {main.title}
              </Heading>
              <Text as="p" size="5" className="hero-sub">
                {main.sub_title}
              </Text>
            </Box>
            <Box width={{ initial: "100%", sm: "45%" }}>
              <img
                src={WorldImg}
                alt="Global Spread"
                width="100%"
                height="auto"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* 사명: 네 가지 아픔 → 4대 사역 */}
      <Section size="2">
        <Container size="4" px="4">
          <Heading size="5" color="indigo">
            {mission.sub_title}
          </Heading>
          <Heading size="8" weight="bold" my="3">
            {mission.title}
          </Heading>
          {mission.text?.map((p, i) => (
            <Text key={i} as="p" color="gray" size="4" my="2">
              {p}
            </Text>
          ))}
          <Grid columns={{ initial: "1", xs: "2", md: "4" }} gap="3" mt="5">
            {ministries.map((m) => {
              const Icon = MINISTRY_ICONS[m.id];
              return (
                <RouterLink
                  key={m.id}
                  to={`/ministry/${m.id}`}
                  className="ministry-card scale"
                >
                  <Flex direction="column" gap="2">
                    {Icon ? <Icon size={28} className="ministry-icon" /> : null}
                    <Text size="2" color="gray">
                      {m.pain}
                    </Text>
                    <Flex align="center" justify="between" gap="2">
                      <Text size="4" weight="bold">
                        {m.name}
                      </Text>
                      <ArrowRight size={16} />
                    </Flex>
                  </Flex>
                </RouterLink>
              );
            })}
          </Grid>
        </Container>
      </Section>

      <Separator size="4" />

      {/* 걸어온 길 */}
      <SplitSection img="/img/sec2.jpeg" alt="Ministry in the field" tinted>
        <Heading size="5" color="indigo">
          {history.sub_title}
        </Heading>
        <Heading size="8" weight="bold" my="3">
          {history.title}
        </Heading>
        {history.li?.map((li, i) => (
          <Flex key={i} gap="3" align="start" my="3">
            <Box flexShrink="0" pt="1" className="ministry-icon">
              <Flag size={20} />
            </Box>
            <Text as="p" color="gray" size="4">
              {li}
            </Text>
          </Flex>
        ))}
      </SplitSection>

      <Separator size="4" />

      {/* 성경앱 · 재정자립 */}
      <SplitSection img={StepImg} alt="Financial self-sufficiency" reverse>
        <Heading size="5" color="indigo">
          {app.sub_title}
        </Heading>
        <Heading size="8" weight="bold" my="3">
          {app.title}
        </Heading>
        {app.text?.map((p, i) => (
          <Text key={i} as="p" color="gray" size="4" my="2">
            {p}
          </Text>
        ))}
        <Button asChild color="indigo" size="3" radius="full" mt="4">
          <RouterLink to="/project">
            {app.cta} <ArrowRight size={16} />
          </RouterLink>
        </Button>
      </SplitSection>

      <Separator size="4" />

      {/* 함께하는 Gospellist */}
      <Section size="2" style={{ backgroundColor: "var(--indigo-2)" }}>
        <Container size="2" px="4">
          <Heading size="8" weight="bold" my="3" align="center">
            {together.title}
          </Heading>
          <Text as="p" color="gray" size="4" my="3" align="center">
            {together.text_head}
          </Text>
          {together.text?.map((line, i) => (
            <Text key={i} as="p" color="gray" size="4" my="2" align="center">
              {line}
            </Text>
          ))}
        </Container>
      </Section>

      {/* 마무리 배너 */}
      <Box className="hero-banner">
        <Container size="4" px="4" py="9">
          <Heading
            size={{ initial: "7", sm: "8" }}
            align="center"
            className="hero-title"
          >
            {closing.title}
          </Heading>
        </Container>
      </Box>
    </>
  );
}
