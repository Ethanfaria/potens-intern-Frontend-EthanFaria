import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import ActionItems from "./components/views/ActionItems";
import Anomalies from "./components/views/Anomalies";
import Metrics from "./components/views/Metrics";

export default function App() {
  const [activeView, setActiveView] = useState("actions");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const actionsRef = useRef(null);
  const anomaliesRef = useRef(null);
  const metricsRef = useRef(null);

  const sectionRefs = {
    actions: actionsRef,
    anomalies: anomaliesRef,
    metrics: metricsRef,
  };


  useEffect(() => {
  const scrollContainer = document.querySelector("main");
  const observers = [];

  Object.entries(sectionRefs).forEach(([id, ref]) => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveView(id);
      },
      {
        root: scrollContainer,
        threshold: 0,
        rootMargin: "-40px 0px -55% 0px",
      }
    );

    observer.observe(ref.current);
    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}, []);

  function handleNavigate(id) {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden md:ml-64">
        <TopBar activeView={activeView} />
        <main className="flex-1 overflow-y-auto bg-cyan-300/20">
          <section ref={actionsRef} className="p-6 border-b border-white/20">
            <ActionItems />
          </section>
          <section ref={anomaliesRef} className="p-6 border-b border-white/20">
            <Anomalies />
          </section>
          <section ref={metricsRef} className="min-h-full p-6">
            <Metrics />
          </section>
        </main>
      </div>
    </div>
  );
}