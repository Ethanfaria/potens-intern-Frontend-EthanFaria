import React from "react";
import {
  MdBolt,
  MdWarning,
  MdAnalytics,
  MdPerson,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { useLang } from "../../components/context/LangContext";

const Sidebar = ({ activeView, onNavigate, sidebarOpen, setSidebarOpen }) => {
  const { lang, toggleLang, loading, t } = useLang();

  const navItems = [
    { id: "actions", label: t.actions, icon: <MdBolt /> },
    { id: "anomalies", label: t.anomalies, icon: <MdWarning /> },
    { id: "metrics", label: t.metrics, icon: <MdAnalytics /> },
  ];

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50
        p-2 rounded-lg bg-white shadow-lg"
      >
        <MdMenu size={24} />
      </button>

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-30 md:hidden
        transition-all duration-300
        ${
          sidebarOpen
            ? "bg-black/10 opacity-100"
            : "bg-transparent opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`
        fixed top-0 left-0 h-screen
        w-64 bg-cyan-300/30 backdrop-blur-xl
        border-r border-white/10
        flex flex-col shadow-2xl z-50
        transition-transform duration-300
        md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <MdClose size={22} />
        </button>

        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>
            <h1 className="font-bold tracking-wide">DASHBOARD</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const active = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`group relative overflow-hidden
                w-full flex items-center gap-4
                px-4 py-3 rounded-xl
                transition-all duration-300
                ${
                  active
                    ? "bg-teal-700 text-white shadow-lg"
                    : "text-slate-600 hover:bg-teal-600/20 hover:translate-x-2"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-teal-800 rounded-r-full" />
                )}
                <span
                  className={`text-xl transition-all duration-300
                  ${
                    active
                      ? "scale-110"
                      : "group-hover:scale-125 group-hover:rotate-6"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 flex gap-1">
          {/* Account */}
          <div
            className="flex-3 flex items-center gap-3
    p-3 rounded-xl bg-teal-600/10"
          >
            <div
              className="w-10 h-10 rounded-full
      bg-gradient-to-br from-teal-400 to-cyan-500
      flex items-center justify-center"
            >
              <MdPerson className="text-white text-lg" />
            </div>

            <div>
              <p className="text-sm font-medium">{t.account}</p>
              <p className="text-xs text-slate-400">{t.adminAccess}</p>
            </div>
          </div>

          {/* Language button */}
          <button
            onClick={toggleLang}
            disabled={loading}
            className=" cursor-pointer
      flex-1
      rounded-xl
      bg-teal-600/10
      hover:bg-teal-600/30
      flex items-center justify-center
      transition-all duration-300
    "
          >
            {loading ? "..." : <IoLanguage className="text-xl" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
