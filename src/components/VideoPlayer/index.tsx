import React from "react";
interface VideoPlayerProps {
  src: string;
  poster?: string;
  subtitles?: { src: string; label?: string; lang?: string }[];
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, subtitles }) => {
  return (
    <div className="h-full w-full flex items-center">
      <video controls className="w-full max-h-full" poster={poster} autoPlay preload="metadata">
        <source src={src}/>
        {subtitles &&
          subtitles.map((sub, index) => (
            <track
              key={index}
              src={sub.src}
              kind="subtitles"
              srcLang={sub.lang || "en"}
              label={sub.label || "English"}
              default // Set first subtitle track as default
            />
          ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;