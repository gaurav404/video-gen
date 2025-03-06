import React, { useCallback, useRef, useState } from "react"
import { ReactTyped } from "react-typed"
import classNames from "classnames"
import MarkdownComponent from "../Markdown/MarkdownComponent"
import { convert } from "./util"
import "./latex.css"
import styles from "../Markdown/MarkdownComponent.module.css"
import { mergeClasses } from "@/utils/cssUtil"

interface MarkdownLatexProps {
  markdown: string
  showTyping: boolean
  wrapperClass?: string
  onTypingBegin?: () => void
  onTypingEnd?: () => void
  typingSpeed?: number
  handleImage?: (src: string) => void
  dataTestId: string
}
function LatexMarkdown({
  markdown,
  dataTestId,
  showTyping,
  onTypingBegin = () => {},
  onTypingEnd = () => {},
  typingSpeed = 0,
  wrapperClass = "",
  handleImage,
}: MarkdownLatexProps) {
  const [html, setHTML] = React.useState<string>("")
  const [showtyping, setShowtype] = useState<boolean>(() => !!showTyping)
  const markdownRef = useRef<HTMLDivElement>(null)
  const onLoad = useCallback(() => {
    if (markdownRef.current !== null && showtyping) {
      setHTML(markdownRef.current.innerHTML)
    }
  }, [showtyping])

  const textMarkdown = markdown ? convert(markdown) : ""
  return (
    <div className={mergeClasses(styles.markdownContainer, wrapperClass)}>
      <div
        className={classNames(styles.markdownWrapper, {
          hidden: showtyping,
          block: !showtyping,
        })}
        ref={markdownRef}
        data-testid={dataTestId}
      >
        {textMarkdown && <MarkdownComponent markdown={textMarkdown} onLoad={onLoad} handleImage={handleImage} isTyping={showtyping} />}
      </div>
      {html && (
        <div className={styles.markdownWrapper}>
          <ReactTyped
            startWhenVisible
            onBegin={onTypingBegin}
            onComplete={() => {
              setShowtype(false)
              onTypingEnd()
              setHTML("")
            }}
            strings={[html]}
            contentType={"html"}
            showCursor={false}
            typeSpeed={typingSpeed}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(LatexMarkdown)
