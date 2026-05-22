import { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";
import { actionItems, anomalies } from "../data/MockData";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const toggleLang = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, translatedItems: actionItems, translatedAnomalies: anomalies }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}