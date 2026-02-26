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
  const { render } = await import(serverEntryUrl);

  for (const url of routes) {
    console.log(`  Pre-rendering ${url} …`);

    const appHtml = await render(url);

    // Inject rendered markup into the root div.
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    // Determine output path: "/" → dist/index.html, "/about" → dist/about/index.html
    let outFile;
    if (url === "/") {
      outFile = toAbs("dist/index.html");
    } else {
      const dir = toAbs(`dist${url}`);
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.join(dir, "index.html");
    }

    fs.writeFileSync(outFile, html, "utf-8");
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
