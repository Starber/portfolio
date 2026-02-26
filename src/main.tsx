
  import { hydrateRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // hydrateRoot attaches React to the server-pre-rendered HTML rather than
  // replacing it, which is required for SSG to work correctly.
  hydrateRoot(document.getElementById("root")!, <App />);
  