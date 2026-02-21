import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
]);
