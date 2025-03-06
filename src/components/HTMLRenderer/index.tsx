import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";

const HtmlRenderer: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  const [html, setHTML] = useState<string>("");

  useEffect(() => {
    
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // Get only the content inside <body>
        setHTML(doc.body.innerHTML);

        // Execute scripts manually
        setTimeout(() => {
          const scripts = doc.querySelectorAll("script");
          scripts.forEach((oldScript) => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
              newScript.src = oldScript.src;
              newScript.async = true;
            } else {
              newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
          });
        },2000)
  }, [htmlContent]);
  return <div dangerouslySetInnerHTML={{ __html: html }} className="pt-10"/>;
};

export default HtmlRenderer;