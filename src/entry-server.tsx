/**
 * SSG server entry point.
 *
 * Used only at build time by scripts/prerender.mjs.  Never runs in the
 * browser.  Uses React Router's server-side APIs (createStaticHandler /
 * createStaticRouter / StaticRouterProvider) — the server-side counterparts
 * of the browser's createBrowserRouter / RouterProvider — so both renderings
 * produce exactly the same HTML structure and React can hydrate cleanly.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routeDefinitions } from "./app/routes";

export async function render(url: string): Promise<string> {
  const { query, dataRoutes } = createStaticHandler(routeDefinitions);

  // Build a minimal Request so the static handler can resolve the route.
  const request = new Request(`http://localhost${url}`);
  const context = await query(request);

  // A Response means a redirect was matched — nothing to pre-render.
  if (context instanceof Response) {
    return "";
  }

  const staticRouter = createStaticRouter(dataRoutes, context);

  // Replicate the same root structure as App.tsx so hydration sees no diff.
  return renderToString(
    <>
      <a
        href="/"
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 text-white"
        style={{ fontWeight: 600 }}
        aria-label="Starber home"
      >
        <img
          src="/StarberLogoWhite.png"
          alt="StarberLogoWhite"
          className="w-8 h-8 object-contain"
        />
        <span>Starber</span>
      </a>
      <StaticRouterProvider router={staticRouter} context={context} />
    </>,
  );
}
