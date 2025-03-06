/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPresignedUrl, getUploadedUrl } from "@/utils/apiUtil";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const ChatSection = () => {
//   const [showPopup, setShowPopup] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[]
    if (selectedFiles.length > 0) {
      const firstSelectedFile = selectedFiles[0]
      uploadFileResponsesToUrl(firstSelectedFile.type, firstSelectedFile)
    }
  }

  const uploadFileResponsesToUrl = async (fileType: string, selectedFile: File) => {
    try {
        const { presigned_url, file_id } = await getPresignedUrl(fileType, selectedFile.size)
        await axios.put(presigned_url, selectedFile, {
            headers: {
                "Content-Length": selectedFile.size,
            },
        })
        const { url } = await getUploadedUrl(file_id)
        setImageUrl(url)
    } catch (err: unknown) {
        console.log(err)
    }
}
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click()
        }
    }
  return (
    <>
    <div className="bg-white p-4 border-t flex">
    <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        capture="environment"
        onChange={handleFileChange}
    ></input>
      <div className="flex-1 flex border rounded-lg outline-none">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2"
        />
        <div className="flex gap-1 items-center pr-4">
          <AttachFileIcon
            onClick={handleUploadClick}
          />
        </div>
      </div>
      {imageUrl && <Image src={imageUrl} alt="upload-image" />}
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
    </>
  );
};
export default ChatSection;
