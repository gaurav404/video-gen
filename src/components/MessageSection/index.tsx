import React from "react";
import VideoPlayer from "../VideoPlayer";
import LatexMarkdown from "../LatexMarkdownTyping";
const latexText = "Photosynthesis is a process used by plants, algae, and some bacteria to convert light energy into chemical energy stored in the form of glucose, a type of carbohydrate. During this process, these organisms take in carbon dioxide (\\(\\mathrm{CO}_{2}\\)) and water (\\(\\mathrm{H}_{2}\\mathrm{O}\\)), and using light energy, they produce glucose (\\(\\mathrm{C}_{6}\\mathrm{H}_{12}\\mathrm{O}_{6}\\)) and release oxygen (\\(\\mathrm{O}_{2}\\)) as a byproduct.\n\nThe overall equation for photosynthesis can be represented as:\n\n\\[ \n6 \\mathrm{CO}_{2} + 12 \\mathrm{H}_{2} \\mathrm{O} \\xrightarrow{\\text{Light}} \\mathrm{C}_{6} \\mathrm{H}_{12} \\mathrm{O}_{6} + 6 \\mathrm{H}_{2} \\mathrm{O} + 6 \\mathrm{O}_{2} \n\\]\n\nThis equation shows that six molecules of carbon dioxide and twelve molecules of water, in the presence of light, produce one molecule of glucose, six molecules of water, and six molecules of oxygen.";
const MessageSection = () => {
  const onTypingBegin = () => {};
  const onTypingEnd = () => {};
  return (
    <div className="w-full">
      {/* Chat message from AI */}
      <div className="flex items-start space-x-3">
        <div className="bg-gray-300 p-3 rounded-lg text-gray-900 mt-4">
          Hello! How can I assist you today?
        </div>
      </div>

      {/* Chat message from user */}
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg mt-4">
          Hi! I need help with TailwindCSS.
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg mt-4">
          <VideoPlayer
            src={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            subtitles={[
              { src: "https://res.cloudinary.com/dpzpn3dkw/raw/upload/w_400,f_auto,q_auto/v1741272738/bw9kkp0fuomq0r1yz7qx.vtt", label: "English", lang: "en" },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gray-300 text-white p-3 rounded-lg max-w-lg mt-4">
          <LatexMarkdown
            dataTestId="markdown-component"
            markdown={latexText}
            showTyping={true}
            onTypingBegin={() => {}}
            handleImage={onTypingBegin}
            onTypingEnd={onTypingEnd}
            typingSpeed={2}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
