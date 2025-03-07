"use client";
import { DoubtContextProvider } from "@/components/Contexts/DoubtContext";
import WholePage from "@/components/Page";

export default function Home() {
  return (
    <DoubtContextProvider>
      <WholePage/>    
    </DoubtContextProvider>
  );
}
