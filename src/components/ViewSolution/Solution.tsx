import { POPUP_TYPES } from "@/constants";
import { useDoubtContext } from "../Contexts/DoubtContext";
import HoverCmp from "../HoverCmp";
import HtmlIframeRenderer from "../HtmlIframeRenderer";
import { ContentData, ContentRes } from "@/types";

const Solution = ({callbackForData, contentData}: {callbackForData: (type: string, data: unknown) => void, contentData: ContentRes}) => {
  const {selectedDoubt} = useDoubtContext()
  const {text, image} = selectedDoubt || {}
  const {content_data} = contentData || {}
  const getText = (url: string) => {
    if (url.includes("_high")) {
      return "High Proficient"
    } else if (url.includes("_low")) {
      return "Low Proficient"
    }
  }
  const getUIComponent = (content:ContentData) => {
    if (content.type === 2){
      return <div className="py-2">
        <span
          className="text-black underline"
        >
          Video Solution
        </span>
        { getText(content.content_url) && <span className="text-blue-700">({ getText(content.content_url)})</span>}
        <HoverCmp icon={"PLAY"} onClick={() => {
            callbackForData(POPUP_TYPES.VIDEO, {
              url: content.content_url,
              subtitles: [
                { src: "", label: "English", lang: "en" },
              ]
            })
        }}>
          <div className="w-50 h-40 rounded-md mt-4 relative">
            <img className={`w-full h-full object-cover rounded-2xl border-1`} src="https://res.cloudinary.com/dpzpn3dkw/image/upload/v1726031695/DoubtWebFteu/original_ttgzwj.webp"/>          
          </div>
        </HoverCmp>
      </div>
    } else if (content.type === 3){
      return (
        <div className="py-2">
          <span
            className="text-black underline"
          >
            Visualize Simulation
          </span>
          <div>
          Experience the simulation firsthand—adjust parameters, launch, and observe dynamic interactions in real-time. Explore different conditions and uncover insights through interactive experimentation!
          </div>
          <HoverCmp icon={"OPEN"} onClick={() => {
              window.open(content.content_url, '_blank');
          }}>
            <div className="w-50 h-40 rounded-md mt-4 relative">
              <HtmlIframeRenderer
                  url={content.content_url}
              />
            </div>
          </HoverCmp>
        </div>
      )
    }
  }
  return (
    <div className="p-4">
      {text && <>Question Text: <div className="py-2">{text}</div></>}
      {/* {image && <div className="w-50 h-40 rounded-md mt-4 relative">
       Question Image:<img className={`w-full h-full object-cover rounded-2xl border-1`} src={image}/>          
        </div>} */}
      {content_data?.map( content => {
        return getUIComponent(content)
      })}
    </div>
  );
};

export default Solution;
