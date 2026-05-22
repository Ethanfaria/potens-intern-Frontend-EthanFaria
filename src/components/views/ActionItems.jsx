import { useState } from "react";
import { actionItems } from "../data/MockData";
import { MdCheckCircle, MdPause } from "react-icons/md";
import { useLang } from "../../components/context/LangContext";

const priorityConfig = {
  P1: {
    row: "bg-red-50 border-l-[3px] border-l-red-500",
    badge: "bg-red-500 text-red-50",
    code: "text-red-400",
  },
  P2: {
    row: "bg-amber-50 border-l-[3px] border-l-amber-500",
    badge: "bg-amber-500 text-amber-50",
    code: "text-amber-400",
  },
  P3: {
    row: "bg-slate-50 border-l-[3px] border-l-slate-300",
    badge: "bg-slate-400 text-slate-50",
    code: "text-slate-400",
  },
};

const priorityOrder = { P1: 0, P2: 1, P3: 2 };

export default function ActionItems() {
  const [itemState, setItemState] = useState({});
  const { t, translatedItems } = useLang();

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-start sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-teal-900 tracking-wide">
            {t.actionRequired}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.rankedByImpact} · {done} of {total} {t.resolved}
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-teal-700 bg-teal-100 border border-teal-200 rounded-full px-3 py-1 shrink-0">
          {done}/{total} {t.done}
        </span>
      </div>

      <div className="w-full h-1 bg-slate-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-teal-400 to-teal-700 rounded-full transition-all duration-500"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sorted.map((item, index) => {
          const state = itemState[item.id];
          const isApproved = state === "approved";
          const isHeld = state === "held";
          const isDone = !!state;
          const cfg = priorityConfig[item.priority];

          return (
            <div
              key={item.id}
              className={`rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 ${isDone ? "opacity-55" : ""}`}
            >
              <div className={`flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 ${isDone ? "bg-white border-l-[3px] border-l-slate-200" : cfg.row}`}>
                <span className="text-xs font-mono font-bold text-slate-400 w-5 shrink-0">{index + 1}</span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${cfg.badge}`}>{item.priority}</span>
                <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                {isApproved && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-teal-600 font-bold">
                    <MdCheckCircle size={14} /> {t.approved}
                  </span>
                )}
                {isHeld && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-red-500 font-bold">
                    <MdPause size={14} /> {t.onHold}
                  </span>
                )}
              </div>

              <div className="px-4 py-3 bg-white">
                <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}>
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.context}</p>
                {!isDone && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => doAction(item.id, "approved")}
                      className="flex-1 text-xs py-2 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm"
                    >
                      {t.approve}
                    </button>
                    <button
                      onClick={() => doAction(item.id, "held")}
                      className="flex-1 text-xs py-2 rounded-lg bg-white text-red-500 font-bold border-2 border-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150"
                    >
                      {t.hold}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet */}
      <div className="hidden sm:block lg:hidden">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[60px_1fr_auto] gap-3 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{t.priority}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{t.item}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{t.action}</span>
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
                className={`grid grid-cols-[60px_1fr_auto] gap-3 px-4 py-3.5 items-center border-b border-slate-200 last:border-0 transition-all duration-300 ${isDone ? "bg-white opacity-55 border-l-[3px] border-l-slate-200" : cfg.row}`}
              >
                <div className="flex flex-col items-start gap-0.5">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${cfg.badge}`}>{item.priority}</span>
                  <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}>{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">{item.context}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isApproved && <span className="flex items-center gap-1 text-xs text-teal-600 font-bold whitespace-nowrap"><MdCheckCircle size={14} /> {t.approved}</span>}
                  {isHeld && <span className="flex items-center gap-1 text-xs text-red-500 font-bold whitespace-nowrap"><MdPause size={14} /> {t.onHold}</span>}
                  {!isDone && (
                    <>
                      <button onClick={() => doAction(item.id, "approved")} className="text-xs px-2.5 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm">{t.approve}</button>
                      <button onClick={() => doAction(item.id, "held")} className="text-xs px-2.5 py-1.5 rounded-lg bg-white text-red-500 font-bold border-2 border-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150">{t.hold}</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[36px_88px_1fr_auto] gap-3 px-5 py-2.5 bg-slate-100 border-b border-slate-200">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">#</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest text-center">{t.priority}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{t.item}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{t.action}</span>
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
                className={`grid grid-cols-[36px_88px_1fr_auto] gap-3 px-5 py-3.5 items-center border-b border-slate-200 last:border-0 transition-all duration-300 ${isDone ? "bg-white opacity-55 border-l-[3px] border-l-slate-200" : cfg.row}`}
              >
                <span className="text-sm font-mono font-bold text-slate-400">{index + 1}</span>
                <div className="flex flex-col items-center gap-1">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md w-full text-center ${cfg.badge}`}>{item.priority}</span>
                  <span className={`text-[10px] font-mono ${cfg.code}`}>{item.code}</span>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}>{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.context}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isApproved && <span className="flex items-center gap-1 text-xs text-teal-600 font-bold"><MdCheckCircle size={15} /> {t.approved}</span>}
                  {isHeld && <span className="flex items-center gap-1 text-xs text-red-500 font-bold"><MdPause size={15} /> {t.onHold}</span>}
                  {!isDone && (
                    <>
                      <button onClick={() => doAction(item.id, "approved")} className="text-xs px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer">{t.approve}</button>
                      <button onClick={() => doAction(item.id, "held")} className="text-xs px-3 py-1.5 rounded-lg bg-white text-red-500 font-bold border-2 border-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150 cursor-pointer">{t.hold}</button>
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