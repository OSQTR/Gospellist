import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Flex,
  Text,
  Box,
  Progress,
  Tooltip,
  Badge,
  Container,
} from "@radix-ui/themes";
import { CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";

// currency util
const toUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

const ProgressPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/data.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (alive) setData(json);
      } catch (e) {
        if (alive) setError(String(e.message || e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const fund = data?.fund;
  const roadmap = data?.roadmap;

  const fundPct = useMemo(() => {
    if (!fund || !fund.target_amount) return 0;
    const pct =
      (Number(fund.current_amount || 0) / Number(fund.target_amount)) * 100;
    return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
  }, [fund]);

  const nowIdx = Math.max(1, Number(roadmap?.now || 1));
  const totalSteps = Number(roadmap?.phases?.length || 0);
  const stepsPct = totalSteps
    ? Math.min(
        100,
        Math.max(0, Math.round(((nowIdx - 1) / totalSteps) * 1000) / 10)
      )
    : 0;

  if (loading) return <Text size="2">Loading…</Text>;
  if (error)
    return (
      <Card variant="surface">
        <Text size="2" color="orange">
          {error}
        </Text>
      </Card>
    );
  if (!data) return <Text size="2">No data</Text>;

  return (
    <Flex direction="column" gap="4">
      {/* Fund Gauge */}
      <Box>
        <Flex align="center" justify="between" mb="2">
          <Text weight="bold">Fundraising Progress</Text>
          <Text color="gray">{fundPct}%</Text>
        </Flex>
        <Tooltip
          content={`${toUSD(fund?.current_amount)} / ${toUSD(
            fund?.target_amount
          )}`}
        >
          <Box>
            <Progress value={fundPct} size="3" />
          </Box>
        </Tooltip>
        <Flex align="center" justify="between" mt="2">
          <Text color="gray">Raised</Text>
          <Text weight="bold">{toUSD(fund?.current_amount)}</Text>
        </Flex>
        <Flex align="center" justify="between">
          <Text color="gray">Goal</Text>
          <Text weight="bold">{toUSD(fund?.target_amount)}</Text>
        </Flex>
      </Box>

      {/* Roadmap */}
      <Box>
        <Flex align="center" justify="between" mb="2">
          <Text weight="bold">Roadmap</Text>
          <Text color="gray">
            Step {nowIdx} of {totalSteps}
          </Text>
        </Flex>
        <Progress value={stepsPct} size="3" />
        <Box mt="3">
          <Flex direction="column" gap="2">
            {roadmap?.phases?.map((p, i) => {
              const idx = i + 1;
              const done = idx < nowIdx;
              const active = idx === nowIdx;
              return (
                <Card key={idx} variant={active ? "classic" : "surface"}>
                  <Flex align="center" justify="between" gap="3">
                    <Flex align="center" gap="3">
                      <Text
                        as="span"
                        color={done ? "green" : active ? "indigo" : "gray"}
                      >
                        {done ? (
                          <CheckIcon />
                        ) : active ? (
                          <DotFilledIcon />
                        ) : (
                          <Text as="span" size="2">
                            {idx}
                          </Text>
                        )}
                      </Text>
                      <Box>
                        <Text
                          weight="bold"
                          color={done ? "green" : active ? "indigo" : "gray"}
                        >
                          {p.title || `Phase ${idx}`}
                        </Text>
                        {p.text ? (
                          <Text
                            as="div"
                            size="2"
                            color={done ? "green" : active ? "indigo" : "gray"}
                          >
                            {p.text}
                          </Text>
                        ) : null}
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
      </Box>
    </Flex>
  );
};

export default ProgressPanel;
