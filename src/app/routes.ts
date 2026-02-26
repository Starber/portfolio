import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { StyleGuidePage } from "./pages/StyleGuidePage";

// Exported separately so the SSG server entry can reference the same routes
// without instantiating a browser-only router.
export const routeDefinitions = [
  { path: "/", Component: Home },
  { path: "/about", Component: AboutPage },
  { path: "/style-guide", Component: StyleGuidePage },
];

export function createAppRouter() {
  return createBrowserRouter(routeDefinitions);
}
