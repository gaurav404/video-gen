import { getPresignedUrl, getUploadedUrl, submitQuestion } from "@/utils/apiUtil";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from "@mui/icons-material/Close";

const AskDoubt = () => {
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(
        null
    );
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
          console.log(err)
      }
    }
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      console.log("Question Submitted:", currentQuestion, image);
      if (currentQuestion || image) {
        submitQuestion(currentQuestion || "", image || "").then(() => {

        }).catch((err: unknown) => {
          console.log(err)
        })
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
            Ask Your Question
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Get detailed answers to your technical questions from our
            AI-powered doubt solver.
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
                className="w-full min-h-32 p-4"
                placeholder="Type your question here..."
              />
            </div>
            <div className="rounded-md overflow-hidden">
                <div className="w-40 h-20 rounded-md pl-3 pb-3 relative">
                    <img className={`w-full h-full object-cover rounded-2xl border-1`} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzLPIW0WySewBkpClvOKfxvbX8PYhwDxv9Q&s"/>
                    { (
                      <div
                        data-testid="scroll_image_close_button"
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
            <div className="absolute right-2 bottom-2">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    capture="environment"
                    onChange={handleImageUpload}
                ></input>
                <AddCircleOutlineIcon
                  onClick={handleUploadClick}
                />
            </div>
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