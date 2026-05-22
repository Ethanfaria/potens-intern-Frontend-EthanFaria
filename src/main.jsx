import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./index.css";
import { LangProvider } from "./components/context/LangContext";
import { DarkModeProvider } from "./components/context/DarkModeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </DarkModeProvider>
  </StrictMode>,
);
