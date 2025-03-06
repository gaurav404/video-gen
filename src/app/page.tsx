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
import { DoubtContextProvider } from "@/components/Contexts/DoubtContext";

export default function Home() {
  const [uiState, setUIState] = useState<string>("ASKDOUBT")
  const handleDoubtSelect = () => {
    setUIState("VIEW_SOLUTION")
  };
  const [popup, showPopup] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<string>("")
  const [popupData, setPopupData] = useState<unknown>(null)
  useEffect(() => {
    setupAxiosInstance(API_BASE_URL)
  }, [])

  const callbackForData = (type: string, data: unknown) => {
    showPopup(true)
    setPopupType(type)
    setPopupData(data)
  }
  return (
    <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
          <DoubtContextProvider>
          <div className="w-72 bg-gray-900 text-white flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Questions</h2>
              <button
                onClick={() => {
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
            { uiState === UIState.ASKDOUBT &&  <AskDoubt />}
            { uiState === UIState.VIEW_SOLUTION && (
              <ViewSolution callbackForData={callbackForData} />
            )}
          </div>
          {popup && <div className="absolute inset-10 border-1 border-gray-700 rounded-2xl overflow-auto">
          <div className="absolute right-0 p-2" onClick={() => showPopup(false)}>
            <CloseIcon/>
          </div>
          {<PopupContent
            type={popupType}
            data={popupData}
          />}
        </div> }
      </DoubtContextProvider>
    </div>
  );
}
