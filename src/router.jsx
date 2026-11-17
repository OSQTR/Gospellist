import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Ministry from "./pages/Ministry";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/ministry/:id", element: <Ministry /> },
      // 기존 Lumen365 소개 페이지 → 성경앱 사역 페이지로 통합
      {
        path: "/project",
        element: <Navigate to="/ministry/bible-app" replace />,
      },
    ],
  },
]);
