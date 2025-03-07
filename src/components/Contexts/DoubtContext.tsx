"use client"
import { Doubt } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

const DoubtContext = createContext<{
  selectedDoubt: Doubt | null
  setSelectedDoubt: (doubt: Doubt) => void
  doubts: Doubt[]
  error: string | null
  addDoubt: (type: string, doubt: Doubt | null, prevDoubts?: Doubt[], id?:string) => void
  setErrorUpdate: (err: string | null) => void
}>({
  selectedDoubt: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedDoubt: (_doubt: Doubt) => {},
  doubts: [],
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addDoubt: (_type: string, _doubt: Doubt | null, _prevDoubts?: Doubt[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setErrorUpdate: (_err: string | null) => {}
})

export const useDoubtContext = () => {
  return useContext(DoubtContext)
}

export const DoubtContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt|null>(null)
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [error, setError] = useState<string | null>(null)
  const changeSelectedDoubt = (doubt: Doubt) => {
    setSelectedDoubt(doubt)
  }
  useEffect(() => {
    const doubtString = localStorage.getItem("allDoubts")
    if(doubtString){
      const allDoubts = JSON.parse(doubtString)
      setDoubts(allDoubts)
    }
  }, [])
  const addDoubt = (type: string, doubt: Doubt | null, allDoubtsPrev?: Doubt[], id?: string) => {
    let doubtsNew = null
    if(type === "UPDATE_ALL"){
      if(allDoubtsPrev){
        setDoubts(allDoubtsPrev)
        doubtsNew = allDoubtsPrev
      }
    } else if (type === "SET_INACTIVE") {
      const allDoubts= doubts.map( dt => {
        return {
          ...dt,
          isActive: false
        }
      })
      doubtsNew = allDoubts
      setDoubts(allDoubts)
    } else if (type == "UPDATE_GENERATED") {
      if(id) {
        const allDoubts = doubts.map( dt => {
          if(dt.id === id){
            return {
              ...dt,
              status: "generated"
            }
          } else {
            return {
              ...dt
            }
          }
        })
        setDoubts(allDoubts)
        doubtsNew = allDoubts
      }
    } else {
      if (doubt) {
        const allDoubts = [...doubts]
        const prevDoubts = allDoubts.map( dt => {
          if (dt.id === doubt.id) {
            return {
              ...doubt,
              isActive: dt.id === doubt.id
            }
          } else {
            return {
              ...dt,
              isActive: dt.id === doubt.id
            }
          }
        })
        const find = prevDoubts.find( dt => {
          return dt.id === doubt.id
        })
        if(!find){
          prevDoubts.push(doubt)
        }
        doubtsNew = prevDoubts
        setDoubts(prevDoubts)
      }
    }
    if(doubtsNew) localStorage.setItem("allDoubts", JSON.stringify(doubtsNew))
  }

  const setErrorUpdate = (error: string | null) => {
    const err = navigator.onLine ? error : "No Internet Connection"
    setError(err)
  }
  return (
    <DoubtContext.Provider value={{
      selectedDoubt,
      setSelectedDoubt: changeSelectedDoubt,
      doubts,
      error,
      addDoubt,
      setErrorUpdate
    }}>
      {children}
    </DoubtContext.Provider>
  )
}
