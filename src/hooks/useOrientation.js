// src/hooks/useOrientation.js
import { useEffect, useState } from "react";

export default function useOrientation() {
  const getState = () => {
    const m =
      typeof window !== "undefined"
        ? window.matchMedia("(orientation: portrait)")
        : null;
    if (m) return m.matches ? "portrait" : "landscape";
    // fallback: ratio
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    return h / w > 1 ? "portrait" : "landscape";
  };

  const [orientation, setOrientation] = useState(getState);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const onChange = () =>
      setOrientation(mq.matches ? "portrait" : "landscape");
    // viewport 변화 대비(소프트 키보드 등)
    const onResize = () => {
      // rAF로 과도한 이벤트 방지
      requestAnimationFrame(() => setOrientation(getState()));
    };

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange); // Safari 구버전
    window.addEventListener("resize", onResize);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return orientation; // 'portrait' | 'landscape'
}
