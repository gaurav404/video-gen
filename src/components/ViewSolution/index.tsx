import { useEffect, useState } from "react";
import Solution from "./Solution";
import { useDoubtContext } from "../Contexts/DoubtContext";
import LottieSimulation from "../LottieSimulation";
import { getDoubtData } from "@/utils/apiUtil";
import { ContentRes } from "@/types";
import ReplayIcon from '@mui/icons-material/Replay';
// import VideoPlayer from "../VideoPlayer";
const ViewSolution = ({callbackForData}: {callbackForData: (type: string, data: unknown) => void}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const {selectedDoubt, setErrorUpdate, addDoubt} = useDoubtContext()
  const [contentData, setContentData] = useState<ContentRes | null>(null)
  const {id} = selectedDoubt || {}
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      getSolution()
    }, 1000)
  }, [id])

  const getSolution = () => {
    if(id) {
      getDoubtData(id).then((res: unknown) => {
        if ((res as ContentRes).status === 1){
          setIsLoading(false)
          addDoubt("UPDATE_GENERATED", null, undefined, id)
          setShowAnswer(true)
        }
        setContentData(res as ContentRes)
      }).catch( (err: unknown) => {
        setErrorUpdate("SOMETHING WENT WRONG")
        console.log(err)
      })
    }
  }
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
          { !showAnswer && <ReplayIcon onClick={getSolution} className="ml-3"/>}
        </div>
      </div>
      {/* <VideoPlayer
            src={
              "https://doubt-qc.s3.ap-south-1.amazonaws.com/thumbnail/MagneticFieldLoop.mp4"
            }
            subtitles={[
              { src: "./MagneticFieldLoop.vtt", label: "English", lang: "en" },
            ]}
      /> */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center h-full">
          {/* <div className="w-24 h-24 mb-4 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div> */}
          {/* <p className="text-gray-500">Generating your answer...</p> */}
          <LottieSimulation urls={[
            "https://res.cloudinary.com/dpzpn3dkw/raw/upload/v1740659911/doubt/search_with_text_4_-2_1_rl9yaa.json",
          ]}/>
        </div>
      ) : showAnswer ? (
        <div>
          {contentData && <Solution callbackForData={callbackForData} contentData={contentData}/>}
        </div>
      ) : null}
    </div>
  );
};

export default ViewSolution;
