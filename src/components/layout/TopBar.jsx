import { useState, useEffect } from 'react'
import { MdDarkMode, MdLightMode, MdWifi, MdWifiOff } from 'react-icons/md'
import { useLang } from '../../components/context/LangContext'

export default function TopBar() {
  const [time, setTime] = useState(new Date())
  const [darkMode, setDarkMode] = useState(false)
  const [lowBW, setLowBW] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-20 bg-cyan-300/20 backdrop-blur-xl border-b border-white/20
      flex items-center justify-between px-6 sticky top-0 z-10">

      <div>
        <h1 className="font-bold text-2xl text-slate-800 tracking-wide leading-tight">
          {t.welcomeBack}
        </h1>
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <span className="text-sm font-mono text-slate-400">
            {time.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-400">
            {time.toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setLowBW(!lowBW)}
          title={lowBW ? 'Low bandwidth on' : 'Low bandwidth off'}
          className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            ${lowBW
              ? 'bg-amber-50 border-amber-300 text-amber-600'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white/80'
            }`}
        >
          {lowBW ? <MdWifiOff size={16} /> : <MdWifi size={16} />}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to light' : 'Switch to dark'}
          className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            ${darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-100'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white/80'
            }`}
        >
          {darkMode ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
        </button>
      </div>
    </header>
  )
}