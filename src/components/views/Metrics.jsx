import { useState, useEffect } from "react";
import { useLang } from "../../components/context/LangContext";

function getSecondsUntilNoon() {
  const now = new Date();
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);
  return Math.max(0, Math.floor((noon - now) / 1000));
}

function formatCountdown(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Metrics() {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilNoon());
  const { t } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsUntilNoon());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const breached = secondsLeft === 0;
  const urgent = secondsLeft < 3600;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-teal-900 dark:text-cyan-50 tracking-wide">
          {t.liveMetrics}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {t.realTime}
        </p>
      </div>

      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={`sm:col-span-2 rounded-xl border p-5 shadow-sm
          ${
            breached
              ? "bg-red-50 dark:bg-red-400/10 border-red-300 dark:border-red-400/30"
              : urgent
                ? "bg-amber-50 dark:bg-amber-400/10 border-amber-300 dark:border-amber-400/30"
                : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {t.slaCountdown}
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md
              ${
                breached
                  ? "bg-red-600 text-white"
                  : urgent
                    ? "bg-amber-500 text-white"
                    : "bg-teal-100 dark:bg-teal-600/10 text-teal-700 dark:text-teal-300"
              }`}
            >
              {breached ? t.breached : urgent ? t.urgent : t.live}
            </span>
          </div>

          <div
            className={`text-5xl font-mono font-bold tracking-tight mt-3
            ${
              breached
                ? "text-red-600 dark:text-red-400"
                : urgent
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-slate-800 dark:text-cyan-50"
            }`}
          >
            {breached ? "00:00:00" : formatCountdown(secondsLeft)}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            PO-78241 · Vendor payment ₹2.4 Cr · Penalty clause §14b activates at
            12:00
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/40 p-4 shadow-sm">
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {t.vehiclesOffRadar}
            </p>
            <p className="text-3xl font-bold text-slate-800 dark:text-cyan-50 mt-1">
              3
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Last seen Khopoli · 07:09
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/40 p-4 shadow-sm">
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {t.paymentsQueued}
            </p>
            <p className="text-3xl font-bold text-slate-800 dark:text-cyan-50 mt-1">
              14
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {t.neftRetry}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
