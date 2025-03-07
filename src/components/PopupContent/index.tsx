import { POPUP_TYPES } from "@/constants"
import VideoPlayer from "../VideoPlayer"
import HtmlIframeRenderer from "../HtmlIframeRenderer";

const PopupContent = ({type, data}: { type: string, data: unknown}) => {
    
    return <div className="h-full w-full bg-gray-400">
        { type === POPUP_TYPES.VIDEO && <VideoPlayer
            src={(data as {url: string}).url}
            subtitles={(data as {subtitles: []}).subtitles}
        />}
        { type === POPUP_TYPES.HTML && <HtmlIframeRenderer
            url={(data as {url: string}).url}
        />}
    </div>
}

export default PopupContent;