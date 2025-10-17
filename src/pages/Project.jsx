// src/pages/Project.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";

const Project = () => {
  const { messages, status } = useSelector((s) => s.i18n);
  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const project = messages?.project ?? {};
  const main = project.main ?? {};
  const features = project.features ?? [];
  const targetUsers = project.target_users ?? [];
  const impact = project.impact ?? {};
  const impactEvangelism = impact.evangelism_teams ?? [];
  const impactChurches = impact.churches ?? [];

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
              {main.title}
            </Heading>
            <Text as="p" color="gray" size="5" my="4">
              {main.sub_title}
            </Text>
            {Array.isArray(main.text) &&
              main.text.map((p, i) => (
                <Text as="p" key={i} size="4" color="gray" mb="3">
                  {p}
                </Text>
              ))}
            {main.cta ? (
              <Button color="indigo" variant="solid" size="3" radius="full">
                {main.cta}
              </Button>
            ) : null}
          </Box>
        </Flex>
      </Container>

      <Separator size="4" />

      {/* Features */}
      <Container size="4" px="2" py="6">
        <Heading size="7" mb="4" color="indigo">
          Features
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
          Target Users
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
          Impact
        </Heading>

        <Grid columns={{ initial: "1", sm: "2" }} gap="5">
          <Box>
            <Heading size="5" mb="3">
              Evangelism Teams
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
              Churches
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
    </>
  );
};

export default Project;
