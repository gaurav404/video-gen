import { Doubt } from '@/types'
import { createContext, useContext, useState } from 'react'

const DoubtContext = createContext<{
  selectedDoubt: Doubt | null
  setSelectedDoubt: (doubt: Doubt) => void
}>({
  selectedDoubt: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedDoubt: (_doubt: Doubt) => {}
})
export const useDoubtContext = () => {
  return useContext(DoubtContext)
}

export const DoubtContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt|null>(null)
  const changeSelectedDoubt = (doubt: Doubt) => {
    setSelectedDoubt(doubt)
  }
  return (
    <DoubtContext.Provider value={{
      selectedDoubt,
      setSelectedDoubt: changeSelectedDoubt
    }}>
      {children}
    </DoubtContext.Provider>
  )
}
