import { useState, useEffect } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsUntilNoon());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const breached = secondsLeft === 0;
  const urgent = secondsLeft < 3600; // under 1 hour → red

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-teal-900 tracking-wide">Live Metrics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Real-time · Updates every second</p>
      </div>

      <div className="w-full h-1 bg-slate-200 rounded-full mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Live countdown card */}
        <div className={`sm:col-span-2 rounded-xl border p-5 shadow-sm
          ${breached ? "bg-red-50 border-red-300" : urgent ? "bg-amber-50 border-amber-300" : "bg-white border-slate-200"}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
              SLA Breach Countdown
            </span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md
              ${breached ? "bg-red-600 text-white" : urgent ? "bg-amber-500 text-white" : "bg-teal-100 text-teal-700"}`}>
              {breached ? "BREACHED" : urgent ? "URGENT" : "LIVE"}
            </span>
          </div>

          <div className={`text-5xl font-mono font-bold tracking-tight mt-3
            ${breached ? "text-red-600" : urgent ? "text-amber-600" : "text-slate-800"}`}>
            {breached ? "00:00:00" : formatCountdown(secondsLeft)}
          </div>

          <p className="text-xs text-slate-500 mt-3">
            PO-78241 · Vendor payment ₹2.4 Cr · Penalty clause §14b activates at 12:00
          </p>
        </div>

        {/* Static summary cards */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Vehicles Off-Radar</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">3</p>
            <p className="text-xs text-slate-400 mt-1">Last seen Khopoli · 07:09</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Payments Queued</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">14</p>
            <p className="text-xs text-slate-400 mt-1">NEFT retry at 11:00</p>
          </div>
        </div>

      </div>
    </div>
  );
}