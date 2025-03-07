import { getPresignedUrl, getUploadedUrl, submitQuestion } from "@/utils/apiUtil";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import { useDoubtContext } from "../Contexts/DoubtContext";
import { useRouter } from "next/navigation";
import { getDateTime, getFormatedDate } from "@/utils/dateUtil";
// import { useRouter } from "next/navigation";

const AskDoubt = ({callbackFnc}: {callbackFnc: (type: string) => void}) => {
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(
        null
    );
    const {addDoubt, setSelectedDoubt, setErrorUpdate} = useDoubtContext();
    const router = useRouter()
    const handleQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentQuestion(e.target.value);
    };
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null)
  
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []) as File[]
      if (selectedFiles.length > 0) {
        const firstSelectedFile = selectedFiles[0]
        uploadFileResponsesToUrl(firstSelectedFile.type, firstSelectedFile)
      }
    };
    const uploadFileResponsesToUrl = async (fileType: string, selectedFile: File) => {
      try {
          const { presigned_url, file_id } = await getPresignedUrl(fileType, selectedFile.size)
          await axios.put(presigned_url, selectedFile, {
              headers: {
                  "Content-Length": selectedFile.size,
              },
          })
          const { url } = await getUploadedUrl(file_id)
          setImage(url)
      } catch (err: unknown) {
          setErrorUpdate("SOMETHING WENT WRONG")
          console.log(err)
      }
    }
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      console.log("Question Submitted:", currentQuestion, image);
      if (currentQuestion || image) {
        // submitQuestion(currentQuestion || "", image || "").then((data: unknown) => {
        //   console.log("test response", data)
        //   const res  = data as {action: { data: {query: { did: string}}}}
        //   if(res?.action?.data?.query?.did){
        //     const did = res?.action?.data?.query?.did
        //     // localStorage.setItem("did", did)
        //     void router.replace(`/?did=${did}`)
        //     callbackFnc("VIEW_SOLUTION")
        //     const dt = new Date().getTime()
        //     const doubt = {
        //       id: did,
        //       text: currentQuestion || "",
        //       image: image || "",
        //       isActive: true,
        //       timestamp: getFormatedDate(dt) + " " + getDateTime(dt),
        //       status: "pending",
        //     }
        //     addDoubt("ADD", doubt)
        //     setSelectedDoubt(doubt)
        //   } else {
        //     alert("Something seems wrong")
        //   }
        // }).catch((err: unknown) => {
          // setErrorUpdate("SOMETHING WENT WRONG")
          const did = "c0f3tMpe-a8bc-45be-bf2f-6cd5110895fb"
            // localStorage.setItem("did", did)
            void router.replace(`/?did=${did}`)
            callbackFnc("VIEW_SOLUTION")
            const dt = new Date().getTime()
            const doubt = {
              id: did,
              text: currentQuestion || "",
              image: image || "",
              isActive: true,
              timestamp: getFormatedDate(dt) + " " + getDateTime(dt),
              status: "pending",
            }
            addDoubt("ADD", doubt)
            setSelectedDoubt(doubt)
          // console.log(err)
        // })
      }
    };
  
    const handleUploadClick = () => {
      if (fileInputRef.current) {
          fileInputRef.current?.click()
      }
  }
  
    return (
        <div className="max-w-3xl w-full mx-auto px-6 py-8 flex-1 overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Find a Solution
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Get personalized answers for your queries.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <label
              htmlFor="doubt-input"
              className="block font-medium text-black mb-2"
            >
              What&apos;s your question?
            </label>
          <div className=" relative mb-4 border border-gray-300 rounded-lg bg-gray-50 transition-all">
            <div className="relative">
              <textarea
                id="doubt-input"
                value={currentQuestion || ""}
                onChange={handleQuestionChange}
                className="w-full min-h-32 p-4 focus:ring-0 resize-none"
                placeholder="Type your question here..."
              />
            </div>
            <div className="rounded-md overflow-hidden">
                <div className="w-40 h-20 rounded-md pl-3 pb-3 relative">
                    {image && <img className={`w-full h-full object-cover rounded-2xl border-1`} src={image}/>}
                    {image &&(
                      <div
                        data-testid="scroll_image_close_button opacity-50 bg-seondary"
                        className="rounded-full shadow absolute right-0 top-0 bg-zinc600 p-1 cursor-pointer"
                        onClick={() => {
                          setImage(null)
                        }}
                      >
                        <CloseIcon/>
                      </div>
                    )}
                </div>
            </div>
            { !image && <div className="absolute right-2 bottom-2">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    capture="environment"
                    onChange={handleImageUpload}
                ></input>
                <div className="flex gap-2 border-1 rounded-xl p-2 items-center"  onClick={handleUploadClick}>
                  <AddCircleOutlineIcon/>
                  <span className="text-xs">Attach Image</span>
                </div>
            </div> }
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-1 transition-all"
          >
            Get Answer
          </button>
        </div>
      </div>
    );
  };

  export default AskDoubt;