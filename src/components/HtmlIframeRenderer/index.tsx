import React from "react";
// import DOMPurify from "dompurify";

const HtmlIframeRenderer: React.FC<{ url: string }> = ({ url }) => {
  return <iframe className="w-full h-full rounded-2xl border-1" src={url} />
};

export default HtmlIframeRenderer;