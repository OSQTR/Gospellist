import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Ministry from "./pages/Ministry";
import Project from "./pages/Project";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/ministry/:id", element: <Ministry /> },
      // 우리교회 말씀심방 개발 내용 (기능·대상·효과·로드맵)
      { path: "/project", element: <Project /> },
    ],
  },
]);
