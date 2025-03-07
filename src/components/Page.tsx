"use client";

import AskDoubt from "@/components/AskDoubt";
import { QuestionList } from "@/components/QuestionList";
import ViewSolution from "@/components/ViewSolution";
import { UIState } from "@/constants";
import { API_BASE_URL } from "@/constants/apiConstants";
import { setupAxiosInstance } from "@/utils/apiUtil";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PopupContent from "@/components/PopupContent";
import LottieShow from "./LottiePlayerv2/LottieShow";
import { useSearchParams } from "next/navigation";
import { useDoubtContext } from "./Contexts/DoubtContext";
import { Doubt } from "@/types";

export default function WholePage() {
  const [uiState, setUIState] = useState<string>("ASKDOUBT")
  const handleDoubtSelect = () => {
    setUIState("VIEW_SOLUTION")
  };
  const {doubts, setSelectedDoubt, addDoubt, error, setErrorUpdate} = useDoubtContext()
  const [popup, showPopup] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<string>("")
  const [popupData, setPopupData] = useState<unknown>(null)
  const query = useSearchParams()
  const { did } = Object.fromEntries(query ?? []) as Record<
    string,
    string | undefined
  >
  useEffect(() => {
    setupAxiosInstance(API_BASE_URL)
  }, [])
  useEffect(() => {
    if(did) {
        doubts.map( (dt: Doubt) => {
            if(dt.id === did) {
                setSelectedDoubt(dt)
                setUIState("VIEW_SOLUTION")
            }
        })
    }
  },[did, doubts, setSelectedDoubt])


  const callbackForData = (type: string, data: unknown) => {
    showPopup(true)
    setPopupType(type)
    setPopupData(data)
  }
  const callbackFnc = (type: string) => {
    switch(type) {
      case "VIEW_SOLUTION": {
        setUIState("VIEW_SOLUTION")
        break;
      }
      case "ASKDOUBT": {
        setUIState("ASKDOUBT")
        break;
      }
    }
  }
  return (
    <div className="flex h-screen bg-gray-50 relative">
        {/* Sidebar */}
          <div className="w-72 bg-gray-900 text-white flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Questions</h2>
              <div className="w-10 h-10 flex items-center justify-center">
                <LottieShow
                    url={"https://res.cloudinary.com/dpzpn3dkw/raw/upload/w_800,f_auto,q_auto/v1741297557/u2f6fgnn828wwcqrxrv7.json"}
                />
              </div>
              <button
                onClick={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.delete('did')
                    window.history.replaceState({}, '', url.toString())
                    addDoubt("SET_INACTIVE", null)
                    setUIState(UIState.ASKDOUBT)
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                + New
              </button>
            </div>
            <QuestionList handleDoubtSelect={handleDoubtSelect}/>
          </div>

          {/* Main content */} 
          <div className="flex-1 items-center justify-center h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            { uiState === UIState.ASKDOUBT &&  <AskDoubt callbackFnc={callbackFnc} />}
            { uiState === UIState.VIEW_SOLUTION && (
              <ViewSolution callbackForData={callbackForData} />
            )}
          </div>
          {popup && <div className="absolute inset-10 border-1 border-gray-700 rounded-2xl overflow-auto">
            <div className="absolute right-0 p-2 z-100" onClick={() => showPopup(false)}>
                <CloseIcon/>
            </div>
            {<PopupContent
                type={popupType}
                data={popupData}
            />}
          </div>}          
    </div>
  );
}
