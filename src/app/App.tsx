import { RouterProvider } from "react-router";
import { useMemo } from "react";
import { createAppRouter } from "./routes";

export default function App() {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <>
      <a
        href="/"
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 text-white"
        style={{ fontWeight: 600 }}
        aria-label="Starber home"
      >
        <img src="/StarberLogoWhite.png" alt="StarberLogoWhite" className="w-8 h-8 object-contain" />
        <span>Starber</span>
      </a>
      <RouterProvider router={router} />
    </>
  );
}
