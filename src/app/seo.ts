type SeoType = "website" | "profile";

type RouteSeoConfig = {
  title: string;
  description: string;
  robots: "index, follow" | "noindex, nofollow";
  type: SeoType;
  imageAlt: string;
};

type ResolvedSeoConfig = RouteSeoConfig & {
  path: string;
  url: string;
  imageUrl: string;
};

const SITE_NAME = "Starber";
const SITE_URL = "https://starber.net";
const DEFAULT_SHARE_IMAGE_PATH = "/starber_site_screenshot.png";

const routeSeoConfig: Record<string, RouteSeoConfig> = {
  "/": {
    title: "Websites for Local Businesses",
    description:
      "Starber designs, builds, and manages modern websites for local businesses with clear UX, strong performance, and practical SEO foundations.",
    robots: "index, follow",
    type: "website",
    imageAlt: "Starber website design showcase",
  },
  "/about": {
    title: "About Starber | Meet Carver",
    description:
      "Learn about Carver and how he helps local businesses with modern website design, rebuilds, ongoing management, and SEO best practices.",
    robots: "index, follow",
    type: "profile",
    imageAlt: "About Starber and services overview",
  },
  "/style-guide": {
    title: "Starber Style Guide | UI Reference",
    description:
      "Internal style guide and UI component reference for Starber's design tokens, typography, and reusable interface patterns.",
    robots: "noindex, nofollow",
    type: "website",
    imageAlt: "Starber style guide preview",
  },
};

function normalizePathname(pathname: string): string {
  const withoutHash = pathname.split("#")[0] ?? "/";
  const withoutQuery = withoutHash.split("?")[0] ?? "/";

  if (!withoutQuery || withoutQuery === "/") {
    return "/";
  }

  return withoutQuery.endsWith("/") ? withoutQuery.slice(0, -1) : withoutQuery;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function getSeoForPath(pathname: string): ResolvedSeoConfig {
  const normalizedPath = normalizePathname(pathname);
  const config = routeSeoConfig[normalizedPath] ?? routeSeoConfig["/"];

  return {
    ...config,
    path: normalizedPath,
    url: toAbsoluteUrl(normalizedPath),
    imageUrl: toAbsoluteUrl(DEFAULT_SHARE_IMAGE_PATH),
  };
}

function ensureMetaTag(kind: "name" | "property", key: string): HTMLMetaElement {
  const selector = `meta[${kind}="${key}"]`;
  const existing = document.head.querySelector(selector);

  if (existing instanceof HTMLMetaElement) {
    return existing;
  }

  const tag = document.createElement("meta");
  tag.setAttribute(kind, key);
  document.head.appendChild(tag);
  return tag;
}

function ensureCanonicalLink(): HTMLLinkElement {
  const existing = document.head.querySelector('link[rel="canonical"]');

  if (existing instanceof HTMLLinkElement) {
    return existing;
  }

  const link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  document.head.appendChild(link);
  return link;
}

export function applySeoForPath(pathname: string): void {
  if (typeof document === "undefined") {
    return;
  }

  const seo = getSeoForPath(pathname);

  document.title = seo.title;

  ensureMetaTag("name", "description").setAttribute("content", seo.description);
  ensureMetaTag("name", "robots").setAttribute("content", seo.robots);
  ensureMetaTag("name", "author").setAttribute("content", SITE_NAME);

  ensureMetaTag("property", "og:type").setAttribute("content", seo.type);
  ensureMetaTag("property", "og:site_name").setAttribute("content", SITE_NAME);
  ensureMetaTag("property", "og:title").setAttribute("content", seo.title);
  ensureMetaTag("property", "og:description").setAttribute("content", seo.description);
  ensureMetaTag("property", "og:url").setAttribute("content", seo.url);
  ensureMetaTag("property", "og:image").setAttribute("content", seo.imageUrl);
  ensureMetaTag("property", "og:image:alt").setAttribute("content", seo.imageAlt);

  ensureMetaTag("name", "twitter:card").setAttribute("content", "summary_large_image");
  ensureMetaTag("name", "twitter:title").setAttribute("content", seo.title);
  ensureMetaTag("name", "twitter:description").setAttribute("content", seo.description);
  ensureMetaTag("name", "twitter:image").setAttribute("content", seo.imageUrl);

  ensureCanonicalLink().setAttribute("href", seo.url);
}
