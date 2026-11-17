// src/pages/Home.jsx
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { MINISTRY_ICONS } from "../components/ministryIcons";

export default function Home() {
  const { messages, status } = useSelector((s) => s.i18n);

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const t = messages?.home?.main || {};
  const s1 = messages?.home?.section1 || {};
  const ministries = messages?.ministry?.items || [];
  const ui = messages?.ministry?.ui || {};

  return (
    <>
      {/* Hero banner: 4가지 아픔 → 4대 사역 */}
      <Box className="hero-banner">
        <Container size="4" px="4" pt="9" pb="8">
          <Box pt="8" pb="6">
            <Heading
              size={{ initial: "8", sm: "9" }}
              weight="bold"
              my="4"
              className="hero-title"
            >
              {t.title}
            </Heading>
            <Text as="p" size="5" className="hero-sub">
              {t.sub_title}
            </Text>
          </Box>
          <Grid columns={{ initial: "1", xs: "2", md: "4" }} gap="3">
            {ministries.map((m) => {
              const Icon = MINISTRY_ICONS[m.id];
              return (
                <RouterLink
                  key={m.id}
                  to={`/ministry/${m.id}`}
                  className="hero-card scale"
                >
                  <Flex direction="column" gap="2">
                    {Icon ? <Icon size={28} /> : null}
                    <Text size="2" className="hero-card-pain">
                      {m.pain}
                    </Text>
                    <Flex align="center" justify="between" gap="2">
                      <Text size="5" weight="bold">
                        {m.name}
                      </Text>
                      <ArrowRight size={18} />
                    </Flex>
                  </Flex>
                </RouterLink>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* 사역별 요약 섹션 */}
      {ministries.map((m, idx) => {
        const Icon = MINISTRY_ICONS[m.id];
        return (
          <React.Fragment key={m.id}>
            {idx > 0 && <Separator size="4" />}
            <Section
              size="2"
              style={
                idx % 2 ? { backgroundColor: "var(--indigo-2)" } : undefined
              }
            >
              <Container size="3" px="4">
                <Flex
                  gap="6"
                  align="start"
                  direction={{
                    initial: "column",
                    sm: idx % 2 ? "row-reverse" : "row",
                  }}
                >
                  <Box className="ministry-icon">
                    {Icon ? <Icon size={56} /> : null}
                  </Box>
                  <Box>
                    <Heading size="5" color="indigo">
                      {m.pain}
                    </Heading>
                    <Heading size="8" weight="bold" my="3">
                      {m.name}
                    </Heading>
                    {m.summary?.map((p, i) => (
                      <Text key={i} as="p" color="gray" size="4" my="2">
                        {p}
                      </Text>
                    ))}
                    <Button
                      asChild
                      color="indigo"
                      size="3"
                      radius="full"
                      mt="4"
                    >
                      <RouterLink to={`/ministry/${m.id}`}>
                        {ui.more} <ArrowRight size={16} />
                      </RouterLink>
                    </Button>
                  </Box>
                </Flex>
              </Container>
            </Section>
          </React.Fragment>
        );
      })}

      <Separator size="4" />
      <Section size="2" align="center">
        <Heading size="9" color="indigo" align="center">
          {s1.title}
        </Heading>
        <Text as="p" size="4" my="4" align="center">
          {s1.sub_title}
        </Text>
        <Flex
          align="center"
          justify="center"
          gap="4"
          wrap="wrap"
          //   direction={{ initial: "column", sm: "row" }}
          direction="row"
        >
          {s1.members?.map((member) => (
            <Box key={member.contact} width="185px">
              <Card variant="classic" className="scale" size="1">
                <Flex gap="3" align="center" direction="column">
                  <Avatar
                    size="9"
                    src={member.avatar || undefined}
                    radius="small"
                    fallback={member.name[0]}
                  />
                  <Flex gap="1" wrap="wrap">
                    <Badge color="teal">Gospellist</Badge>
                    <Badge color="blue">{member.tag}</Badge>
                    <Badge color="indigo">South Korea</Badge>
                  </Flex>

                  <Text as="h3" size="5" weight="bold" color="indigo">
                    {member.name}
                  </Text>
                  <Box>
                    <Text as="p" size="2">
                      {member.bio}
                    </Text>
                  </Box>
                  <Text as="div" size="1" color="gray">
                    {member.contact}
                  </Text>
                </Flex>
              </Card>
            </Box>
          ))}

          <Tooltip content="Join the Team">
            <Button size="3" color="indigo" radius="full">
              <Plus />
            </Button>
          </Tooltip>
        </Flex>
      </Section>
    </>
  );
}
