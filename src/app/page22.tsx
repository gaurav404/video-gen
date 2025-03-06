"use client"
import { useEffect } from "react";
import { setupAxiosInstance } from "@/utils/apiUtil";
import { API_BASE_URL } from "@/constants/apiConstants";
import TabUI from "@/components/TabUI";

export default function Home() {
  useEffect(() => {
    setupAxiosInstance(API_BASE_URL)
  }, [])
  return (
    <div className="relative">
      <div className="h-screen flex bg-primary">
        <TabUI />
      </div>
    </div>
  );
}
