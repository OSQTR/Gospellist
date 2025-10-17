import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Flag } from "lucide-react";
import React from "react";

const TextSection = ({ text }) => {
  return (
    <>
      {(text.title || text.sub_title) && (
        <Container size="4" px="2">
          <Flex my="5" direction={{ initial: "column", sm: "row" }}>
            <Box p="4" width={{ initial: "100%", sm: "100%" }}>
              {text.sub_title ? (
                <Heading size="5" color="indigo">
                  {text.sub_title}
                </Heading>
              ) : null}
              {text.title ? (
                <Heading size="7" color="indigo" weight="bold" my="4">
                  {text.title}
                </Heading>
              ) : null}
              {text.text_head ? (
                <Text as="p" color="gray" size="5" my="2" mt="6">
                  {text.text_head}
                </Text>
              ) : null}
              {(text.li || text.text)?.map((line, idx) => (
                <Text key={idx} as="p" color="gray" size="5" my="2" mt="6">
                  ○ {line}
                </Text>
              ))}
            </Box>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default TextSection;
