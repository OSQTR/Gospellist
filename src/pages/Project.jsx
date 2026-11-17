// src/pages/Project.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Roadmap from "../components/Roadmap";

const Project = () => {
  const { messages, status } = useSelector((s) => s.i18n);
  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const project = messages?.project ?? {};
  const main = project.main ?? {};
  const features = project.features ?? [];
  const targetUsers = project.target_users ?? [];
  const headings = project.headings ?? {};
  const impact = project.impact ?? {};
  const impactEvangelism = impact.evangelism_teams ?? [];
  const impactChurches = impact.churches ?? [];

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
                className="hero-title"
              >
                {main.title}
              </Heading>
              <Text as="p" size="5" className="hero-sub">
                {main.sub_title}
              </Text>
            </Box>
            <Box width={{ initial: "100%", sm: "45%" }}>
              <img
                src="/img/sec1.png"
                alt={main.title}
                width="100%"
                height="auto"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* 앱 배경 */}
      <Container size="4" px="4" py="6">
        {Array.isArray(main.text) &&
          main.text.map((p, i) => (
            <Text as="p" key={i} size="4" color="gray" mb="3">
              {p}
            </Text>
          ))}
      </Container>

      <Separator size="4" />

      {/* Features */}
      <Container size="4" px="2" py="6">
        <Heading size="7" mb="4" color="indigo">
          {headings.features}
        </Heading>
        <Grid columns={{ initial: "1", sm: "2" }} gap="4">
          {features.map((f, idx) => (
            <Card key={idx} size="3">
              <Heading size="5" mb="2">
                {f.title}
              </Heading>
              <Text as="p" size="3" color="gray">
                {f.desc}
              </Text>
            </Card>
          ))}
        </Grid>
      </Container>

      <Separator size="4" />

      {/* Target Users */}
      <Container size="4" px="2" py="6">
        <Heading size="7" mb="4" color="indigo">
          {headings.target_users}
        </Heading>
        <Grid columns={{ initial: "1", sm: "2" }} gap="4">
          {targetUsers.map((u, idx) => (
            <Card key={idx} size="3">
              <Heading size="5" mb="2">
                {u.title}
              </Heading>
              <Text as="p" size="3" color="gray">
                {u.desc}
              </Text>
            </Card>
          ))}
        </Grid>
      </Container>

      <Separator size="4" />

      {/* Impact */}
      <Container size="4" px="2" py="6">
        <Heading size="7" mb="4" color="indigo">
          {headings.impact}
        </Heading>

        <Grid columns={{ initial: "1", sm: "2" }} gap="5">
          <Box>
            <Heading size="5" mb="3">
              {headings.evangelism_teams}
            </Heading>
            <Box as="ul" style={{ paddingLeft: 18 }}>
              {impactEvangelism.map((item, i) => (
                <li key={i}>
                  <Text as="span" size="3" color="gray">
                    {item}
                  </Text>
                </li>
              ))}
            </Box>
          </Box>

          <Box>
            <Heading size="5" mb="3">
              {headings.churches}
            </Heading>
            <Box as="ul" style={{ paddingLeft: 18 }}>
              {impactChurches.map((item, i) => (
                <li key={i}>
                  <Text as="span" size="3" color="gray">
                    {item}
                  </Text>
                </li>
              ))}
            </Box>
          </Box>
        </Grid>
      </Container>

      <Separator size="4" />

      {/* Roadmap */}
      <Container size="4" px="2" py="6">
        <Heading size="7" mb="4" color="indigo">
          {headings.roadmap}
        </Heading>
        <Roadmap />
      </Container>
    </>
  );
};

export default Project;
