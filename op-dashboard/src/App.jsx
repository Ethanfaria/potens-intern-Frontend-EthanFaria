import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import ActionItems from "./components/views/ActionItems";
import Anomalies from "./components/views/Anomalies";
import LiveMetrics from "./components/views/Metrics";

export default function App() {
  const [activeView, setActiveView] = useState("actions");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden md:ml-64">
        <TopBar activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6">
          {activeView === "actions" && <ActionItems />}
          {activeView === "anomalies" && <Anomalies />}
          {activeView === "metrics" && <LiveMetrics />}
        </main>
      </div>
    </div>
  );
}
