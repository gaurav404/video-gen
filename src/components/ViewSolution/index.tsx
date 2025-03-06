import { useEffect, useState } from "react";
import Solution from "./Solution";
import { useDoubtContext } from "../Contexts/DoubtContext";

const ViewSolution = ({callbackForData}: {callbackForData: (type: string, data: unknown) => void}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const {selectedDoubt} = useDoubtContext()
  const {id} = selectedDoubt || {}
  useEffect(() => {
  }, [])
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
        console.log(id)
        setIsLoading(false)
    }, 1000)
  }, [id])
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-3/4 max-w-200 min-w-3/4 m-4">
      <div className="bg-blue-200 py-4 px-6 flex justify-between items-center">
        <span className="font-medium text-gray-800">Your Answer</span>
        <div className="flex items-center text-sm">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${
              showAnswer ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></span>
          <span className="text-gray-600">
            {showAnswer ? "Completed" : "Processing"}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-24 h-24 mb-4 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500">Generating your answer...</p>
        </div>
      ) : showAnswer ? (
        <div>
          <Solution callbackForData={callbackForData}/>
        </div>
      ) : null}
    </div>
  );
};

export default ViewSolution;
