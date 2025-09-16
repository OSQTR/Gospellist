// src/components/Nav.jsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  Container,
  Separator,
  Button as RLink,
  Heading,
  IconButton,
  Tooltip,
  Box,
  Section,
} from "@radix-ui/themes";
import { Sun, Moon, Globe } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/themeSlice";
import { setLang } from "../features/langSlice";
import logoUrl from "../assets/logo.svg";
// import useOrientation from "../hooks/useOrientation";
import Hamberger from "./Hamberger";

export default function Nav() {
  //   const orientation = useOrientation();
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.code);

  const { pathname } = useLocation();
  const LINKS = [
    { to: "/", label: "Home", match: (p) => p === "/" },
    { to: "/about", label: "About", match: (p) => p.startsWith("/about") },
    {
      to: "/project",
      label: "project",
      match: (p) => p.startsWith("/project"),
    },
    // 필요 시 여기에 계속 추가
  ];

  return (
    <nav className="fixed-box">
      <Section
        size="4"
        py="2"
        px="2"
        className={`nav-box${mode === "dark" ? " nav-box-dark" : ""}`}
      >
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex asChild gap="2" align="center">
            <RouterLink
              to="/"
              aria-label="Home"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={logoUrl}
                alt="Gospellist logo"
                width={32}
                height={32}
                style={{ display: "block" }}
              />
              <Heading size="3" color="gray" className="logo">
                Gospellist.org
              </Heading>
            </RouterLink>
          </Flex>

          <Flex
            gap="4"
            align="center"
            display={{ initial: "none", sm: "flex" }}
          >
            {LINKS.map(({ to, label, match }) => (
              <RLink
                key={to}
                asChild
                color="gray"
                radius="full"
                variant={match(pathname) ? "solid" : "ghost"}
                highContrast={match(pathname)}
              >
                <RouterLink to={to}>{label}</RouterLink>
              </RLink>
            ))}
          </Flex>

          <Flex
            gap="5"
            align="center"
            display={{ initial: "none", sm: "flex" }}
          >
            <Flex gap="3" align="center">
              {/* Language toggle: KO <-> EN */}
              <Tooltip content={lang.toUpperCase()}>
                <IconButton
                  variant="ghost"
                  color="gray"
                  radius="full"
                  aria-label={`Toggle language (current: ${lang})`}
                  onClick={() => dispatch(setLang(lang === "en" ? "ko" : "en"))}
                >
                  <Globe />
                  <Text size="2" style={{ minWidth: 26, textAlign: "center" }}>
                    {lang.toUpperCase()}
                  </Text>
                </IconButton>
              </Tooltip>

              {/* Theme toggle: light <-> dark */}
              <Tooltip content={mode === "dark" ? "Dark" : "Light"}>
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
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
          <Box display={{ initial: "block", sm: "none" }}>
            <Hamberger links={LINKS} />
          </Box>
        </Flex>
      </Section>
    </nav>
  );
}
