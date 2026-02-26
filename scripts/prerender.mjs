/**
 * SSG pre-render script.
 *
 * Run after both Vite builds (client + server).  For every route it:
 *   1. Calls render(url) from the compiled server bundle.
 *   2. Injects the HTML into the built index.html shell.
 *   3. Writes dist/<route>/index.html so SWA serves fully-rendered HTML
 *      for every route without needing a server runtime.
 *
 * Add new routes to the `routes` array as the site grows.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, "..", p);

// ── Routes to pre-render ────────────────────────────────────────────────────
const routes = ["/", "/about", "/style-guide"];

// ── Main ────────────────────────────────────────────────────────────────────
async function prerender() {
  // Read the Vite-built HTML shell once.
  const template = fs.readFileSync(toAbs("dist/index.html"), "utf-8");

  // Import the compiled server entry (ESM, built to dist/server/).
  const serverEntryUrl = pathToFileURL(toAbs("dist/server/entry-server.js")).href;
  const { render, getSeoForPath } = await import(serverEntryUrl);

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const replaceTagContent = (html, pattern, nextTag) => {
    if (pattern.test(html)) {
      return html.replace(pattern, nextTag);
    }

    return html.replace("</head>", `  ${nextTag}\n    </head>`);
  };

  const applySeoToHtml = (html, routePath) => {
    const seo = getSeoForPath(routePath);
    let nextHtml = html;

    nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']robots["'][^>]*>/i,
      `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:type["'][^>]*>/i,
      `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:site_name["'][^>]*>/i,
      `<meta property="og:site_name" content="Starber" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:image["'][^>]*>/i,
      `<meta property="og:image" content="${escapeHtml(seo.imageUrl)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+property=["']og:image:alt["'][^>]*>/i,
      `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']twitter:card["'][^>]*>/i,
      '<meta name="twitter:card" content="summary_large_image" />',
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']twitter:title["'][^>]*>/i,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    );

    nextHtml = replaceTagContent(
      nextHtml,
      /<meta\s+name=["']twitter:image["'][^>]*>/i,
      `<meta name="twitter:image" content="${escapeHtml(seo.imageUrl)}" />`,
    );

    return nextHtml;
  };

  for (const url of routes) {
    console.log(`  Pre-rendering ${url} …`);

    const appHtml = await render(url);

    // Inject rendered markup into the root div.
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    const seoHtml = applySeoToHtml(html, url);

    // Determine output path: "/" → dist/index.html, "/about" → dist/about/index.html
    let outFile;
    if (url === "/") {
      outFile = toAbs("dist/index.html");
    } else {
      const dir = toAbs(`dist${url}`);
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.join(dir, "index.html");
    }

    fs.writeFileSync(outFile, seoHtml, "utf-8");
    console.log(`  ✓ Written → ${path.relative(toAbs("."), outFile)}`);
  }

  // Remove the temporary server bundle — it is not needed at runtime.
  const serverDir = toAbs("dist/server");
  fs.rmSync(serverDir, { recursive: true, force: true });
  console.log("  ✓ Server bundle cleaned up");
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
