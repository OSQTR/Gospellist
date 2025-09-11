// src/components/Footer.jsx
import React from "react";
import {
  Container,
  Flex,
  Text,
  Link as RLink,
  Separator,
} from "@radix-ui/themes";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Separator size="4" />
      <Container size="3" py="3" px="2">
        <Flex align="center" justify="between" wrap="wrap" gap="3">
          <Text size="2" weight="medium">
            Gospellist
          </Text>
          <Flex gap="3" align="center">
            <RLink size="2" href="https://example.com/terms">
              Terms
            </RLink>
            <RLink size="2" href="https://example.com/privacy">
              Privacy
            </RLink>
            <RLink size="2" href="mailto:hello@example.com">
              Contact
            </RLink>
          </Flex>
        </Flex>
        <Text size="1" color="gray">
          © {year} Gospellist.org
        </Text>
      </Container>
    </footer>
  );
}
