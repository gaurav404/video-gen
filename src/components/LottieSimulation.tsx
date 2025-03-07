import { useEffect, useRef, useState } from "react";
import LottieShow from "./LottiePlayerv2/LottieShow"

const LottieSimulation = ({urls}: {urls: string[]}) => {
    const [url, setUrl] = useState<string>("")
    const intervalRef = useRef<NodeJS.Timeout>(null)
    useEffect(() => {
        let index = 0;
        setUrl(urls[index])
        index = 1
        intervalRef.current = setInterval(() => {
            console.log("W3r", index)
            if(index === urls.length){
                if (intervalRef.current) clearInterval(intervalRef.current)
            } else {
                setUrl(urls[index])
                index++;   
            }
        }, 2000)
    },[])
    return (
        <div className="h-full w-full flex-1 flex items-center justify-center">
            {url && <LottieShow url={url}/>}
        </div>
    )
}

export default LottieSimulation;