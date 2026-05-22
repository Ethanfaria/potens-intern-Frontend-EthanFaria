import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode, MdWifi, MdWifiOff } from "react-icons/md";
import { useLang } from "../../components/context/LangContext";
import { useDarkMode } from "../../components/context/DarkModeContext";
import { useLowBW } from "../../components/context/LowBWContext";

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { lowBW, toggleLowBW } = useLowBW();
  const { t } = useLang();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
  className={`sticky top-0 z-10 border-b border-white/20 dark:border-white/10
    backdrop-blur-xl bg-cyan-300/20 dark:bg-slate-950
    flex items-center justify-between pl-16 pr-4 md:px-6
    transition-all duration-300
    ${lowBW ? "h-12" : "h-20"}`}
>
  <div className="min-w-0">
    {/* Mobile: short label. Desktop: full greeting */}
    <h1
  className={`font-bold text-slate-800 dark:text-cyan-50 tracking-wide leading-tight
    transition-all duration-300
    ${lowBW ? "text-base" : "text-base md:text-2xl"}`}
>
  <span className="md:hidden">Welcome Back</span>
  <span className="hidden md:inline">{t.welcomeBack}</span>
</h1>

    {!lowBW && (
      <div className="flex items-center gap-2 mt-1 px-1">
        <span className="text-sm font-mono text-slate-400 dark:text-slate-400">
          {time.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </span>
        <span className="text-slate-300 dark:text-slate-600 text-xs">·</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {time.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    )}
  </div>

      <div className="flex items-center gap-2">
        {lowBW && (
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 mr-1">
            low-bw
          </span>
        )}

        <button
          onClick={toggleLowBW}
          title={lowBW ? "Low bandwidth on" : "Low bandwidth off"}
          className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            ${lowBW
              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400"
              : "bg-white/50 dark:bg-teal-600/10 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-teal-600/20"
            }`}
        >
          {lowBW ? <MdWifiOff size={16} /> : <MdWifi size={16} />}
        </button>

        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to light" : "Switch to dark"}
          className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            ${darkMode
              ? "bg-teal-700 border-teal-600 text-white"
              : "bg-white/50 border-slate-200 text-slate-500 hover:bg-white/80"
            }`}
        >
          {darkMode ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
        </button>
      </div>
    </header>
  );
}