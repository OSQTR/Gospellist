import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/project", element: <Project /> },
    ],
  },
]);
