import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/core/navbar.tsx";
import Home from "./pages/home.tsx";
import { StoreProvider } from "./context/store-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <Navbar />
      <Home />
    </StoreProvider>
  </StrictMode>,
);
