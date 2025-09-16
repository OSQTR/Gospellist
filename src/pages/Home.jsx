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
import { useNavigate } from "react-router-dom";
import ImageUrl from "../assets/undraw_connected-world_anke.svg";
import ImageUrl2 from "../assets/undraw_stepping-up.svg";
import { Flag, Plus } from "lucide-react";

export default function Home() {
  const { messages, status } = useSelector((s) => s.i18n);
  const navigate = useNavigate();

  if (status === "loading") return <h2>Loading…</h2>;
  if (status === "failed") return <h2>Load error</h2>;

  const t = messages?.home?.main || {};
  const s1 = messages?.home?.section1 || {};
  const s2 = messages?.home?.section2 || {};
  const s3 = messages?.home?.section3 || {};

  const goAbout = () => {
    navigate("/about");
  };

  const goGoal = () => {
    navigate("/project");
  };

  return (
    <>
      <Container size="4" mt="9" px="2">
        <Flex my="5" direction={{ initial: "column-reverse", sm: "row" }}>
          <Box p="4" width={{ initial: "100%", sm: "50%" }}>
            <Flex gap="2" my="4">
              <Badge color="blue">Bible</Badge>
              <Badge color="green">Daily</Badge>
              <Badge color="iris">Devotion</Badge>
            </Flex>
            <Heading size="9" color="indigo" weight="bold" my="4">
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
              onClick={goAbout}
            >
              {t.cta}
            </Button>
          </Box>
          <Box width={{ initial: "100%", sm: "50%" }}>
            <img
              src={ImageUrl}
              alt="Global Spread"
              width={"100%"}
              height={"auto"}
            />
          </Box>
        </Flex>
      </Container>
      <Separator size="4" />
      <Section size="1" style={{ backgroundColor: "#e0efef10" }}>
        <Flex
          my="8"
          direction={{ initial: "column-reverse", sm: "row-reverse" }}
        >
          <Box
            p={{ initial: "5", sm: "2" }}
            width={{ initial: "100%", sm: "50%" }}
          >
            <Heading size="5" color="indigo">
              {s2.sub_title}
            </Heading>
            <Heading size="9" wrap="balance" my="4">
              {s2.title}
            </Heading>
            <Flex gap="2" my="4">
              <Badge color="blue">App</Badge>
              <Badge color="green">Web</Badge>
              <Badge color="orange">Study</Badge>
              <Badge color="cyan">social mission</Badge>
            </Flex>
            {s2.li?.map((li, idx) => (
              <Flex key={idx} gap="3" align="center">
                <Box flexBasis={1}>
                  <Flag />
                </Box>
                <Text as="p" color="gray" size="5" my="2">
                  {li}
                </Text>
              </Flex>
            ))}
          </Box>
          <Box maxWidth="560px" width={{ initial: "100%", sm: "50%" }}>
            <img
              src="/img/sec1.png"
              alt="apps and missions"
              width={"100%"}
              height={"auto"}
              align="left"
              className="tilt"
            />
          </Box>
        </Flex>
      </Section>

      <Separator size="4" />
      <Container size="4" px="2">
        <Flex
          my="5"
          direction={{ initial: "column-reverse", sm: "row" }}
          justify="center"
          align="center"
        >
          <Box p="4" width={{ initial: "100%", sm: "50%" }}>
            <Heading size="5" color="indigo">
              {s3.sub_title}
            </Heading>
            <Heading size="9" color="indigo" weight="bold" my="4">
              {s3.title}
            </Heading>
            {s3.li?.map((li, idx) => (
              <Flex key={idx} gap="3" align="center">
                <Box flexBasis={1}>
                  <Flag />
                </Box>
                <Text as="p" color="gray" size="5" my="2">
                  {li}
                </Text>
              </Flex>
            ))}
            <Button
              color="indigo"
              variant="solid"
              size="3"
              radius="full"
              onClick={goGoal}
            >
              {s3.cta}
            </Button>
          </Box>
          <Box width={{ initial: "60%", sm: "30%" }}>
            <img
              src={ImageUrl2}
              alt="Our Goal"
              width={"100%"}
              height={"auto"}
            />
          </Box>
        </Flex>
      </Container>

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
