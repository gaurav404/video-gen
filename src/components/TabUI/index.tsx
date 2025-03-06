import { getPresignedUrl, getUploadedUrl } from "@/utils/apiUtil";
import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import LottieShow from "../LottiePlayerv2/LottieShow";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import PopupContent from "../PopupContent";
import { POPUP_TYPES } from "@/constants";

const QuestionTab = () => {
  const [question, setQuestion] = useState("");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Question Submitted:", question, image);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current?.click()
    }
}

  return (
    <div className="p-4 border rounded-lg bg-gray-400">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex flex-1 flex-col h-100 justify-between rounded-2xl relative bg-gray-400'>
          <textarea
            placeholder={"Ask your question"}
            rows={6}
            className='text-primary bg-gray-100 scrollbar-hidden p-5 text-sm font-normal rounded-xl border-1 outline-none h-full resize-none overflow-y-auto'
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="absolute left-2 bottom-2">
              <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  capture="environment"
                  onChange={handleImageUpload}
              ></input>
              <AttachFileIcon
                onClick={handleUploadClick}
              />
          </div>
          <div className="absolute bottom-0 right-0">
            <LottieShow/>
          </div>
        </div>
        {/* <input type="file" accept="image/*" className="border-1 bg-primary" onChange={handleImageUpload} /> */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

const PastSolutionsTab = ({callbackForData}: {callbackForData: (type: string, data: unknown) => void}) => {
  const pastSolutions = [
    { question: "What is React?", video: "video1.mp4", pdf: "doc1.pdf" },
    { question: "How to use hooks?", video: "video2.mp4", pdf: "doc2.pdf" },
  ];


  return (
    <div className="p-4 border rounded-lg">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Question</th>
            <th className="p-2 border">Video</th>
            <th className="p-2 border">PDF</th>
          </tr>
        </thead>
        <tbody>
          {pastSolutions.map((item, index) => (
            <tr key={index} className="text-center border">
              <td className="p-2 border">{item.question}</td>
              <td className="p-2 border">
                <span className="text-blue-500" onClick={() => {
                  callbackForData(POPUP_TYPES.VIDEO, {
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  })
                }}>Video</span>
              </td>
              <td className="p-2 border">
                <span className="text-blue-500" onClick={() => {
                  callbackForData(POPUP_TYPES.HTML, {
                    url: "https://ap-south-1-staging-doubts.s3.ap-south-1.amazonaws.com/hackathon/simulation_refined_kinematics.html?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAo%2FYeCbJvBRt7BULQtVFurkcgAvtxZVy2axyU%2BJ22%2BMwCIFo2X13m%2FsZMRRPeOwWoHmvO640ehU3qE3Pfp1x%2BDMhIKs4ECCwQABoMNjQ2Mjg5NjUwMzUzIgyh4kN94hroTG5e9%2BAqqwSsxgmA6%2BIJTr6C829EDV8CiLfjzjIsbxeDx2DY9Ht2YQ4wfY42AGJQLWaonCdbURrTWSzGu2HJyC6TbDosdAZx5z4LskM7TyohVUZ3Kv%2FGOv0M1VHs9h4dgTYgFK7LAvP56r7vOVK6mQQG8kn3kOLXylyNoQScUdVNbSm1tOL63Ep3M9c1nMacJsK0K9Ji4gZaKt1ss7NNerI8Ljv8k%2F09uNS%2B5Szg3L3jrKNjeDdIPAgqeDr8Sz%2BbqMuybCWVT44AK7qtjw3LZgbNmpEWuI3zdg3ImC8QNnX3W%2F0Ee6mS8BsZvfhy1qKJuo%2Bu%2BfqYRD2KB0M%2BwtSkeQ6GqVG2I6dRYuRTkZEddYU58qDU%2BEoZ8sMN%2BlMWozaDwEX0HF5GNb80nEmgn%2BEbTMXRjdO7hbdgtoKpb9yN3YLBG5IkYJ8%2BWup9o5F8vXAZJYpvpP7xLW2ID29xpvPEi%2FsBAIJohhJ95KBkSPXxM8qb4y0m7LhzHQLq9V9dd%2FgPPm48S2oax%2B6gScvU%2F98oj6rsIce5e2gvzsnM0VD8J2yaPXRJCA1e358Hr%2FlUbEZEuYzoMHeiCEaT%2F3BcWFJ%2BhVfOHkZ%2BvKUPBjSZ6xOXH1WZj6F4UXr1agxU9fCILbwwcpKC%2B2BS8GwibOuIM3xChmf73TL7j6VbKcDaYMJGRucQm5v8Xy2JpTTQc%2Fmia%2FqTwkNeMQyvLEmRsnnIHAUxvpwOnZ23V%2FI7pA6pI6Q5zutwtfsw0%2FylvgY6xQIRS0qTKuWyMNGi%2F2Fnu%2BIFo6v589d9p6%2FzpRZP%2FmqmhFpI9S%2FCU3NZJ39YJ9wWqjRDBCF9wGXZ06hwy3htTKih0ssydgwZ30iN1Svwzlh868zCZYPGikv%2BiYYUPNUmhk6EpjmnCMe0%2BSq%2BQO7iqrmfnzPaQ7ykPOBLdvkvKH%2FWIs%2FniDOaqRKG4QDqivOpD6CmLHbk%2FLyubYBlTRy4yme7IKWExBfiiLOfRAlcrtRraSrHH26J25B2wirtYoXMFexiJDOZbWmSZ0gMVN8WnIm91GB77aELHgKrlVXR80jOiAylEO42xBytvtVeKuXVL27%2FU6geR2DXrHFjT9OJHFF%2F25%2Ff8trmRi7ASruF1piYWTvg%2FI97c%2BQGGiLFNbhUyHIs8iuXSy3guPXUAol3vO8mkpGmf4TyYugm7HiMC8XxwyC2Y8F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZM6O5OKY2N5YJV6O%2F20250306%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250306T105705Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a7f782bf9c4c3a875df306519089150ea34a98ede2ac208671ef00d613250ab1"
                  })
                }}>HTML</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TabUI = () => {
  const [activeTab, setActiveTab] = useState("ask");
  const [popup, showPopup] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<string>("")
  const [popupData, setPopupData] = useState<unknown>(null)
  const callbackForData = (type: string, data: unknown) => {
    showPopup(true)
    setPopupType(type)
    setPopupData(data)
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 border-b-2 ${activeTab === "ask" ? "border-blue-500" : "border-transparent"}`} 
          onClick={() => setActiveTab("ask")}
        >
          Ask Question
        </button>
        <button 
          className={`px-4 py-2 border-b-2 ${activeTab === "solutions" ? "border-blue-500" : "border-transparent"}`} 
          onClick={() => setActiveTab("solutions")}
        >
          See Past Solutions
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "ask" && <QuestionTab />}
        {activeTab === "solutions" && <PastSolutionsTab
          callbackForData={callbackForData}
        />
        }
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
    </div>
  );
};

export default TabUI;
