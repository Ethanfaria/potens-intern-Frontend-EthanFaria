import { anomalies } from "../data/MockData";

const severityConfig = {
  critical: {
    row: "bg-red-50 border-l-[3px] border-l-red-600",
    badge: "bg-red-600 text-white",
    impact: "text-red-600 bg-red-100 border border-red-200",
    label: "CRITICAL",
  },
  high: {
    row: "bg-amber-50 border-l-[3px] border-l-amber-500",
    badge: "bg-amber-500 text-white",
    impact: "text-amber-700 bg-amber-100 border border-amber-200",
    label: "HIGH",
  },
  medium: {
    row: "bg-blue-50 border-l-[3px] border-l-blue-400",
    badge: "bg-blue-400 text-white",
    impact: "text-blue-700 bg-blue-100 border border-blue-200",
    label: "MED",
  },
};

export default function Anomalies() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-start sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-teal-900 tracking-wide">
            System Anomalies
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-flagged · Last refresh{" "}
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-red-600 bg-red-100 border border-red-200 rounded-full px-3 py-1 shrink-0">
          {anomalies.length} flagged
        </span>
      </div>

      <div className="w-full h-1 bg-slate-200 rounded-full mb-4" />

      {/* Mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        {anomalies.map((item) => {
          const cfg = severityConfig[item.severity];
          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div
                className={`flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 ${cfg.row}`}
              >
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md shrink-0 ${cfg.badge}`}
                >
                  {cfg.label}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {item.system}
                </span>
                <span className="text-[10px] font-mono text-slate-400 ml-auto">
                  {item.time}
                </span>
              </div>

              <div className="px-4 py-3 bg-white">
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2.5">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${cfg.impact}`}
                  >
                    {item.impact}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet */}
      <div className="hidden sm:block lg:hidden">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[80px_70px_1fr_72px] gap-3 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              Severity
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              Source
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              Detail
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest text-right">
              Impact
            </span>
          </div>

          {anomalies.map((item) => {
            const cfg = severityConfig[item.severity];
            return (
              <div
                key={item.id}
                className={`
                  grid grid-cols-[80px_70px_1fr_72px] gap-3 px-4 py-3.5
                  items-center border-b border-slate-200 last:border-0
                  transition-all duration-200 ${cfg.row}
                `}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md w-fit ${cfg.badge}`}
                  >
                    {cfg.label}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-700">
                    {item.system}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.time}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${cfg.impact}`}
                  >
                    {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[100px_70px_1fr_80px] gap-4 px-5 py-2.5 bg-slate-100 border-b border-slate-200">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              Severity
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              System
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
              Detail
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest text-right">
              Impact
            </span>
          </div>

          {anomalies.map((item) => {
            const cfg = severityConfig[item.severity];
            return (
              <div
                key={item.id}
                className={`
                  grid grid-cols-[100px_70px_1fr_80px] gap-4 px-5 py-4
                  items-center border-b border-slate-200 last:border-0
                  transition-all duration-200 ${cfg.row}
                `}
              >
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg w-fit ${cfg.badge}`}
                >
                  {cfg.label}
                </span>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-slate-700">
                    {item.system}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.time}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-mono font-bold px-3 py-1.5 rounded-xl ${cfg.impact}`}
                  >
                    {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}