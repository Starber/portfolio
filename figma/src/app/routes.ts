import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { ContactPage } from "./pages/ContactPage";

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
    path: "/work",
    Component: WorkPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
]);
