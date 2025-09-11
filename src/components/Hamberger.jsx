// src/components/Hamberger.jsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/themeSlice";
import { setLang } from "../features/langSlice";
import {
  Popover,
  IconButton,
  Flex,
  Text,
  Button as RLink,
  Separator,
} from "@radix-ui/themes";
import { Menu, Globe, Sun, Moon } from "lucide-react";

/**
 * props.links: Array<{ to: string; label: string; match?: (path: string) => boolean }>
 * 로고는 Nav에서 처리. 이 컴포넌트는 링크 + 토글만 Popover 안에 렌더.
 */
export default function Hamberger({ links = [] }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.code);
  const { pathname } = useLocation();

  const isActive = (to, match) =>
    match ? match(pathname) : pathname === to || pathname.startsWith(to + "/");

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton
          variant="ghost"
          color="gray"
          radius="full"
          aria-label="Open menu"
        >
          <Menu />
        </IconButton>
      </Popover.Trigger>

      <Popover.Content width="100%" sideOffset={8} align="end">
        <Flex direction="column" gap="3" style={{ minWidth: 220 }}>
          {links.map(({ to, label, match }) => (
            <RLink
              key={to}
              asChild
              color="gray"
              radius="full"
              variant={isActive(to, match) ? "solid" : "ghost"}
              highContrast={isActive(to, match)}
            >
              <RouterLink to={to}>{label}</RouterLink>
            </RLink>
          ))}

          <Separator size="4" />

          <Flex gap="5" align="center" justify="center">
            <IconButton
              variant="ghost"
              color="gray"
              radius="full"
              aria-label={`Toggle language (current: ${lang})`}
              onClick={() => dispatch(setLang(lang === "en" ? "ko" : "en"))}
            >
              <Globe />
              <Text size="2" style={{ minWidth: 28, textAlign: "center" }}>
                {lang.toUpperCase()}
              </Text>
            </IconButton>
            <Separator orientation="vertical" />
            <IconButton
              variant="ghost"
              color="gray"
              radius="full"
              aria-label="Toggle dark mode"
              aria-pressed={mode === "dark"}
              onClick={() =>
                dispatch(setTheme(mode === "dark" ? "light" : "dark"))
              }
            >
              {mode === "dark" ? <Sun /> : <Moon />}
              <Text size="2" style={{ minWidth: 40, textAlign: "center" }}>
                {mode === "dark" ? "Dark" : "Light"}
              </Text>
            </IconButton>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
