import React from "react";
import {
  MdBolt, MdWarning, MdAnalytics,
  MdPerson, MdMenu, MdClose,
} from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { useLang } from "../../components/context/LangContext";
import { useDarkMode } from "../../components/context/DarkModeContext";
import { useLowBW } from "../../components/context/LowBWContext";

const Sidebar = ({ activeView, onNavigate, sidebarOpen, setSidebarOpen }) => {
  const { toggleLang, loading, t } = useLang();
  const { darkMode } = useDarkMode();
  const { lowBW } = useLowBW();

  const navItems = [
    { id: "actions",   label: t.actions,   icon: <MdBolt /> },
    { id: "anomalies", label: t.anomalies, icon: <MdWarning /> },
    { id: "metrics",   label: t.metrics,   icon: <MdAnalytics /> },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        <MdMenu size={24} />
      </button>

      {/* Mobile overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300
          ${sidebarOpen
            ? "bg-black/10 opacity-100"
            : "bg-transparent opacity-0 pointer-events-none"
          }`}
      />

      <div
        className={`
          fixed top-0 left-0 h-screen z-50
          flex flex-col shadow-2xl
          border-r border-white/10
          transition-all duration-300
          ${lowBW
            ? "bg-slate-100 dark:bg-slate-950 w-64 md:w-16"   // ← no bg-white; mobile always w-64
            : "bg-cyan-300/30 dark:bg-slate-950 backdrop-blur-xl w-64"
          }
          md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <MdClose size={22} />
        </button>

        {/* Header */}
        <div className={`border-b border-white/10 flex items-center
  ${lowBW
    ? "h-12 px-3 md:justify-center"   
    : "h-20 px-6"                      
  }`}>
  {lowBW ? (
    <div className="flex items-center gap-3 md:justify-center w-full">
      <div className="w-3 h-3 rounded-full bg-teal-400" />
      <h1 className="dark:text-cyan-50 font-bold tracking-wide md:hidden">DASHBOARD</h1>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
      <h1 className="dark:text-cyan-50 font-bold tracking-wide">DASHBOARD</h1>
    </div>
  )}
</div>

        {/* Nav */}
        <nav className={`flex-1 flex flex-col gap-2 transition-all duration-300
          ${lowBW ? "p-2 md:items-center" : "p-4"}`}>
          {navItems.map((item) => {
            const active = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                title={lowBW ? item.label : undefined}
                className={`group relative overflow-hidden
                  flex items-center
                  transition-all duration-300 cursor-pointer
                  ${lowBW
                    // Mobile: full-width row. Desktop rail: icon-only square
                    ? `gap-4 w-full px-4 py-3 rounded-xl
                       md:w-10 md:h-10 md:justify-center md:p-0 md:gap-0
                       ${active
                         ? "dark:bg-teal-700 bg-teal-950 text-white shadow-lg"
                         : "text-slate-600 dark:text-slate-400/70 hover:bg-teal-600/20"
                       }`
                    : `gap-4 w-full px-4 py-3 rounded-xl
                       ${active
                         ? "dark:bg-teal-700 bg-teal-950 text-white shadow-lg"
                         : "text-slate-600 dark:text-slate-400/70 dark:hover:text-slate-400 hover:bg-teal-600/20 hover:translate-x-2"
                       }`
                  }`}
              >
                {active && !lowBW && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-teal-800 rounded-r-full" />
                )}
                <span className={`text-xl transition-all duration-300
                  ${active ? "scale-110" : "group-hover:scale-125 group-hover:rotate-6"}`}>
                  {item.icon}
                </span>
                {/* Label: always shown on mobile, hidden on desktop rail */}
                <span className={`font-medium ${lowBW ? "md:hidden" : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer: always shown on mobile, hidden on desktop rail in low-BW */}
        <div className={`${lowBW ? "md:hidden" : ""} p-4 border-t border-white/10 flex gap-1`}>
          <div className="flex-3 flex items-center gap-3 p-3 rounded-xl bg-teal-600/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500
              flex items-center justify-center">
              <MdPerson className="text-white text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium dark:text-cyan-50">{t.account}</p>
              <p className="text-xs text-slate-400">{t.adminAccess}</p>
            </div>
          </div>
          <button
            onClick={toggleLang}
            disabled={loading}
            className="cursor-pointer flex-1 rounded-xl dark:text-cyan-50/90
              dark:hover:text-cyan-50 bg-teal-600/10 hover:bg-teal-600/30
              flex items-center justify-center transition-all duration-300"
          >
            {loading ? "..." : <IoLanguage className="text-xl" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;