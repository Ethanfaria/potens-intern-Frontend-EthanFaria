import { useState, useEffect, useRef } from "react"
import Sidebar from "./components/layout/Sidebar"
import TopBar from "./components/layout/TopBar"
import ActionItems from "./components/views/ActionItems"
import Anomalies from "./components/views/Anomalies"
import Metrics from "./components/views/Metrics"
import { LowBWProvider, useLowBW } from "./components/context/LowBWContext"

function AppInner() {
  const [activeView, setActiveView] = useState("actions")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { lowBW } = useLowBW()
  const actionsRef = useRef(null)
  const anomaliesRef = useRef(null)
  const metricsRef = useRef(null)

  const sectionRefs = { actions: actionsRef, anomalies: anomaliesRef, metrics: metricsRef }

  useEffect(() => {
    const scrollContainer = document.querySelector("main")
    const observers = []
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (!ref.current) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveView(id) },
        { root: scrollContainer, threshold: 0, rootMargin: "-40px 0px -55% 0px" }
      )
      observer.observe(ref.current)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  function handleNavigate(id) {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" })
    setSidebarOpen(false)
  }

  const sectionClass = lowBW
    ? "px-4 py-3 border-b border-white/20"
    : "p-6 border-b border-white/20"

  return (
    <div className="flex h-screen text-slate-900">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300
        ${lowBW ? 'md:ml-16' : 'md:ml-64'}`}>
        <TopBar activeView={activeView} />
        <main className={`flex-1 overflow-y-auto transition-colors duration-300
          ${lowBW ? 'bg-white dark:bg-slate-950' : 'bg-cyan-300/20'}`}>

          <section ref={actionsRef} className={`${sectionClass} dark:bg-slate-950/95`}>
            <ActionItems />
          </section>
          <section ref={anomaliesRef} className={`${sectionClass} dark:bg-slate-950/95`}>
            <Anomalies />
          </section>
          <section ref={metricsRef} className={`min-h-full dark:bg-slate-950/95
            ${lowBW ? 'px-4 py-3' : 'p-6'}`}>
            <Metrics />
          </section>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LowBWProvider>
      <AppInner />
    </LowBWProvider>
  )
}