import { useState, useEffect, useCallback } from "react";
import { actionItems } from "../data/MockData";
import { MdCheckCircle, MdPause } from "react-icons/md";
import { useLang } from "../../components/context/LangContext";
import { useLowBW } from "../../components/context/LowBWContext";   // ← add

const priorityConfig = {
  P1: {
    row: "bg-red-50 dark:bg-slate-800/40 border-l-[6px] border-l-red-500 dark:border-l-red-400",
    rowLowBW: "border-l-[3px] border-l-red-400",                   // ← flat variant
    badge: "bg-red-500 text-red-50",
    code: "text-red-400",
  },
  P2: {
    row: "bg-amber-50 dark:bg-slate-800/40 border-l-[6px] border-l-amber-500 dark:border-l-amber-400",
    rowLowBW: "border-l-[3px] border-l-amber-400",
    badge: "bg-amber-500 text-amber-50",
    code: "text-amber-400",
  },
  P3: {
    row: "bg-slate-50 dark:bg-slate-800/40 border-l-[6px] border-l-slate-300 dark:border-l-slate-400",
    rowLowBW: "border-l-[3px] border-l-slate-300 dark:border-l-slate-600",
    badge: "bg-slate-400 text-slate-50",
    code: "text-slate-400",
  },
};

const priorityOrder = { P1: 0, P2: 1, P3: 2 };

export default function ActionItems() {
  const [itemState, setItemState] = useState({});
  const [focusedId, setFocusedId] = useState(null);
  const { t, translatedItems } = useLang();
  const { lowBW } = useLowBW();                                     // ← add

  function doAction(id, action) {
    setItemState((prev) => ({ ...prev, [id]: action }));
  }

  const done = Object.keys(itemState).length;
  const total = translatedItems.length;

  const sorted = [
    ...translatedItems
      .filter((i) => !itemState[i.id])
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
    ...translatedItems.filter((i) => !!itemState[i.id]),
  ];

  const pendingItems = sorted.filter((i) => !itemState[i.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) return;

      if (e.key === "j" || e.key === "k") {
        e.preventDefault();
        if (pendingItems.length === 0) return;
        setFocusedId((prev) => {
          const currentIndex = pendingItems.findIndex((i) => i.id === prev);
          if (e.key === "j") {
            return pendingItems[currentIndex <= 0 ? pendingItems.length - 1 : currentIndex - 1].id;
          } else {
            return pendingItems[currentIndex === -1 || currentIndex >= pendingItems.length - 1 ? 0 : currentIndex + 1].id;
          }
        });
      }

      if ((e.key === "a" || e.key === "h") && focusedId) {
        e.preventDefault();
        if (itemState[focusedId]) return;
        doAction(focusedId, e.key === "a" ? "approved" : "held");
        setFocusedId(() => {
          const remaining = pendingItems.filter((i) => i.id !== focusedId);
          if (remaining.length === 0) return null;
          const currentIndex = pendingItems.findIndex((i) => i.id === focusedId);
          return remaining[Math.min(currentIndex, remaining.length - 1)].id;
        });
      }
    },
    [focusedId, pendingItems, itemState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!focusedId && pendingItems.length > 0) {
      setFocusedId(pendingItems[0].id);
    }
  }, []);

  const focusRing = "ring ring-teal-500 dark:ring-cyan-100 ring-inset";

  // Helper: pick the right row bg class
  function rowBg(cfg, isDone) {
    if (isDone) return "bg-white dark:bg-slate-900/60 opacity-55 border-l-[6px] border-l-slate-200 dark:border-l-slate-600";
    return lowBW ? cfg.rowLowBW : cfg.row;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`flex items-start sm:items-end justify-between gap-3 ${lowBW ? 'mb-2' : 'mb-4'}`}>
        <div>
          <h2 className="text-lg font-bold text-teal-900 dark:text-cyan-50 tracking-wide">
            {t.actionRequired}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.rankedByImpact} · {done} of {total} {t.resolved}
          </p>
        </div>
        <span className="hidden lg:inline-flex text-xs font-mono font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-600/10 border border-teal-200 dark:border-teal-700/50 rounded-full px-3 py-1 shrink-0">
          {done}/{total} {t.done}
        </span>
      </div>

      {/* Progress bar — hidden in low-BW */}
      {!lowBW && (
        <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-teal-400 to-teal-700 rounded-full transition-all duration-500"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
      )}

      {/* Keyboard hint — hidden in low-BW */}
      {!lowBW && (
        <div className="hidden lg:flex items-center gap-3 mb-4 text-[11px] text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono text-slate-500 dark:text-slate-400">j</kbd>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono text-slate-500 dark:text-slate-400">k</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 font-mono text-teal-600 dark:text-teal-400">a</kbd>
            approve
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 font-mono text-red-500 dark:text-red-400">h</kbd>
            hold
          </span>
        </div>
      )}

      {/* ── Mobile ── */}
      <div className="flex flex-col gap-2 sm:hidden">
        {sorted.map((item, index) => {
          const state = itemState[item.id];
          const isApproved = state === "approved";
          const isHeld = state === "held";
          const isDone = !!state;
          const cfg = priorityConfig[item.priority];

          return (
            <div
              key={item.id}
              className={`rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm transition-all duration-300 ${isDone ? "opacity-55" : ""}`}
            >
              <div className={`flex items-center gap-3 px-4 py-2 border-b border-slate-200 dark:border-white/10
                ${isDone
                  ? "bg-white dark:bg-slate-800/40 border-l-[3px] border-l-slate-200 dark:border-l-slate-600"
                  : lowBW ? cfg.rowLowBW : cfg.row
                }`}>
                <span className="text-xs font-mono font-bold text-slate-400 w-5 shrink-0">{index + 1}</span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${cfg.badge}`}>{item.priority}</span>
                <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                {isApproved && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-bold">
                    <MdCheckCircle size={14} /> {t.approved}
                  </span>
                )}
                {isHeld && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-red-500 dark:text-red-400 font-bold">
                    <MdPause size={14} /> {t.onHold}
                  </span>
                )}
              </div>

              <div className={`bg-white dark:bg-slate-900/60 ${lowBW ? 'px-4 py-2' : 'px-4 py-3'}`}>
                <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900 dark:text-cyan-50"}`}>
                  {item.title}
                </p>
                {/* context hidden in low-BW */}
                {!lowBW && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.context}</p>
                )}
                {!isDone && (
                  <div className={`flex gap-2 ${lowBW ? 'mt-2' : 'mt-3'}`}>
                    <button onClick={() => doAction(item.id, "approved")}
                      className={`flex-1 text-xs rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm ${lowBW ? 'py-1.5' : 'py-2'}`}>
                      {t.approve}
                    </button>
                    <button onClick={() => doAction(item.id, "held")}
                      className={`flex-1 text-xs rounded-lg bg-white dark:bg-transparent text-red-500 dark:text-red-400 font-bold border-2 border-red-400 dark:border-red-500 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150 ${lowBW ? 'py-1.5' : 'py-2'}`}>
                      {t.hold}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tablet ── */}
      <div className="hidden sm:block lg:hidden">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[60px_1fr_auto] gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10">
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.priority}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.item}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.action}</span>
          </div>
          {sorted.map((item, index) => {
            const state = itemState[item.id];
            const isApproved = state === "approved";
            const isHeld = state === "held";
            const isDone = !!state;
            const cfg = priorityConfig[item.priority];

            return (
              <div
                key={item.id}
                className={`grid grid-cols-[60px_1fr_auto] gap-3 px-4 items-center border-b border-slate-200 dark:border-white/10 last:border-b-0 transition-all duration-300
                  ${lowBW ? 'py-2' : 'py-3.5'}
                  ${rowBg(cfg, isDone)}`}
              >
                <div className="flex flex-col items-start gap-0.5">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${cfg.badge}`}>{item.priority}</span>
                  <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900 dark:text-cyan-50"}`}>
                    {item.title}
                  </p>
                  {/* context hidden in low-BW */}
                  {!lowBW && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-1">{item.context}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isApproved && <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-bold whitespace-nowrap"><MdCheckCircle size={14} /> {t.approved}</span>}
                  {isHeld && <span className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 font-bold whitespace-nowrap"><MdPause size={14} /> {t.onHold}</span>}
                  {!isDone && (
                    <>
                      <button onClick={() => doAction(item.id, "approved")} className="text-xs px-2.5 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm">{t.approve}</button>
                      <button onClick={() => doAction(item.id, "held")} className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-transparent text-red-500 dark:text-red-400 font-bold border-2 border-red-400 dark:border-red-500 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150">{t.hold}</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[36px_88px_1fr_auto] gap-3 px-5 py-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10">
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">#</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">{t.priority}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.item}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.action}</span>
          </div>

          {sorted.map((item, index) => {
            const state = itemState[item.id];
            const isApproved = state === "approved";
            const isHeld = state === "held";
            const isDone = !!state;
            const cfg = priorityConfig[item.priority];
            const isFocused = focusedId === item.id && !isDone;

            return (
              <div
                key={item.id}
                onClick={() => !isDone && setFocusedId(item.id)}
                className={`grid grid-cols-[36px_88px_1fr_auto] gap-3 px-5 items-center border-b border-slate-200 dark:border-white/10 last:border-b-0 transition-all duration-300 cursor-default
                  ${lowBW ? 'py-2' : 'py-3.5'}
                  ${rowBg(cfg, isDone)}
                  ${isFocused ? focusRing : ""}`}
              >
                <span className="text-sm font-mono font-bold text-slate-400">{index + 1}</span>
                <div className="flex flex-col items-center gap-1">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md w-full text-center ${cfg.badge}`}>{item.priority}</span>
                  <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900 dark:text-cyan-50"}`}>
                    {item.title}
                  </p>
                  {/* context hidden in low-BW */}
                  {!lowBW && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.context}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isApproved && <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-bold"><MdCheckCircle size={15} /> {t.approved}</span>}
                  {isHeld && <span className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 font-bold"><MdPause size={15} /> {t.onHold}</span>}
                  {!isDone && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); doAction(item.id, "approved"); }} className="text-xs px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer">{t.approve}</button>
                      <button onClick={(e) => { e.stopPropagation(); doAction(item.id, "held"); }} className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-transparent text-red-500 dark:text-red-400 font-bold border-2 border-red-400 dark:border-red-500 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150 cursor-pointer">{t.hold}</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}