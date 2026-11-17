// 앱 개발 로드맵 (data.json의 roadmap). 모금 정보는 비공개라 표시하지 않음.
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Box, Card, Flex, Progress, Text } from "@radix-ui/themes";
import { CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";

export default function Roadmap() {
  const lang = useSelector((s) => s.lang.code);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/data.json", { cache: "no-cache" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => alive && setRoadmap(json?.roadmap ?? null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!roadmap?.phases?.length) return null;

  const total = roadmap.phases.length;
  const nowIdx = Math.max(1, Number(roadmap.now || 1));
  const pct = Math.min(100, Math.round(((nowIdx - 1) / total) * 1000) / 10);

  return (
    <Box>
      <Flex justify="end" mb="2">
        <Text color="gray">
          {lang === "ko"
            ? `${nowIdx} / ${total} 단계`
            : `Step ${nowIdx} of ${total}`}
        </Text>
      </Flex>
      <Progress value={pct} size="3" />
      <Flex direction="column" gap="2" mt="3">
        {roadmap.phases.map((p, i) => {
          const idx = i + 1;
          const done = idx < nowIdx;
          const active = idx === nowIdx;
          const color = done ? "green" : active ? "indigo" : "gray";
          return (
            <Card key={idx} variant={active ? "classic" : "surface"}>
              <Flex align="center" justify="between" gap="3">
                <Flex align="center" gap="3">
                  <Text as="span" color={color}>
                    {done ? (
                      <CheckIcon />
                    ) : active ? (
                      <DotFilledIcon />
                    ) : (
                      <Text size="2">{idx}</Text>
                    )}
                  </Text>
                  <Box>
                    <Text weight="bold" color={color}>
                      {lang === "ko" ? p.title_ko || p.title : p.title}
                    </Text>
                    <Text as="div" size="2" color={color}>
                      {lang === "ko" ? p.text_ko || p.text : p.text}
                    </Text>
                  </Box>
                </Flex>
                <Flex gap="2" wrap="wrap" justify="end">
                  {(p.tags || []).map((t) => (
                    <Badge key={t} color="gray" variant="soft">
                      {t}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
}
