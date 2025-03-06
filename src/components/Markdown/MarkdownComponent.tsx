import React from "react"
import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm" // for markdown like tables
import remarkMath from "remark-math"
import styles from "./MarkdownComponent.module.css"

interface MarkdownComponentProps {
  markdown: string
  onLoad: () => void
  isTyping?: boolean
  handleImage?: (src: string) => void
}


const MarkdownComponent: React.FC<MarkdownComponentProps> = ({ markdown }) => {
  if (!markdown) {
    return <></>
  }
  return (
      <Markdown
        className={styles.markdownContent as string}
        components={{
          h3(props) {
            const { ...rest } = props
            return <h3 className="font-bold text-lg" {...rest} />
          },
          li(props) {
            const { ...rest } = props
            return <li className="ml-2" {...rest} />
          },
          hr(props) {
            const { ...rest } = props
            return <hr className="border-inactive border-gray-500 border-1" {...rest} />
          },
          img() {
            // if img required add img tag in else statement
            // const { ...rest } = props
            // return isTyping ? (
            //   <></>
            // ) : (
            //   <img className="w-full" {...rest} onClick={() => handleImage && handleImage(rest.src)} />
            // )
            return <></>
          },
          pre(props) {
            const { ...rest } = props
            return <pre className="whitespace-pre-wrap" {...rest} />
          },
          table(props) {
            const { ...rest } = props
            return <table className="table-auto w-full" {...rest} />
          },
        }}
        remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
        rehypePlugins={[rehypeRaw, [rehypeKatex, { output: "mathml" }]]}
      >
        {markdown}
      </Markdown>
    
  )
}
export default MarkdownComponent
