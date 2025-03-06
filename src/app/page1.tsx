"use client"

// import HtmlRenderer from "@/components/HTMLRenderer";
// import { first_html } from "@/htmlTexts";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ChatSection from "@/components/ChatSection";
import { setupAxiosInstance } from "@/utils/apiUtil";
import { API_BASE_URL } from "@/constants/apiConstants";
import MessageSection from "@/components/MessageSection";

const dataSideBar = {
  items : [
    { title : "teerew"},
    { title : "hello"}
  ]
}
export default function Home() {
  const [open, setOpen] = useState<boolean>(false)
  const {items} = dataSideBar;
  const handleSidebarClick = () => {
    setOpen(op => !op)
  }
  useEffect(() => {
    setupAxiosInstance(API_BASE_URL)
  }, [])
  return (
    <div className="relative">
      <div className="h-screen flex">
        <div className={classNames(" w-50 bg-gray-200 border-[0.5px]", {
          "max-w-[6rem]": !open,
        })}>
          <div onClick={handleSidebarClick} className={ classNames("p-4 bg-gray-200", {
            "border-b-1": open
          })}>
            Cl
          </div>
          {open && <div onClick={handleSidebarClick}>{items.map((item: {title: string}) => (
            <p key={item.title} className="">
              {item.title}
            </p>
          ))}</div>}
        </div>
        <div className="flex-1">
            {/* <HtmlRenderer htmlContent={first_html} /> */}
            <div className="bg-gray-100 h-screen flex flex-col">
              <div className="flex-1 overflow-auto p-4 space-y-4 flex flex-col justify-end">
                <MessageSection/>
              </div>
              
              {/* Input field */}
              <ChatSection />
          </div>
        </div>
      </div>
      {/* {popup && <div className="absolute inset-10 border border-sky-100 bg-primary p-5">
        <div className="absolute right-0 p-2" onClick={() => showPopup(false)}>
          <CloseIcon/>
        </div>
        {<HtmlRenderer htmlContent={first_html} />}
      </div> } */}
    </div>
  );
}
