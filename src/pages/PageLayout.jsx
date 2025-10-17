import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "@radix-ui/themes";
import Layout from "../components/Layout";
import { loadMessages } from "../features/i18nSlice";

export default function PageLayout() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.code);

  useEffect(() => {
    dispatch(loadMessages(lang));
  }, [lang, dispatch]);

  return (
    <Theme appearance={mode === "dark" ? "dark" : "light"}>
      <Layout>
        <Outlet />
      </Layout>

      {/* 경로 단위 복원: 새 페이지는 상단, 뒤/앞으로가기는 이전 위치 */}
      <ScrollRestoration getKey={(loc) => loc.pathname} />
    </Theme>
  );
}
