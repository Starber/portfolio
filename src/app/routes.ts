import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { StyleGuidePage } from "./pages/StyleGuidePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/style-guide",
    Component: StyleGuidePage,
  },
]);
