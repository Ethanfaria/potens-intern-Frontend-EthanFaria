import { createContext, useContext, useState } from 'react'

const LowBWContext = createContext()

export function LowBWProvider({ children }) {
  const [lowBW, setLowBW] = useState(false)
  const toggleLowBW = () => setLowBW(v => !v)
  return (
    <LowBWContext.Provider value={{ lowBW, toggleLowBW }}>
      {children}
    </LowBWContext.Provider>
  )
}

export function useLowBW() {
  return useContext(LowBWContext)
}