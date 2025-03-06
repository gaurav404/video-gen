export function convert(content: string): string {
  // Step 2: Protect existing LaTeX expressions
  content = content?.replace(/\n/g, "\n\n") || ""
  content = content.replace(/\\\\/g, "\\")
  content = content.replace(/\\text{([^}]*)}/g, (match, innerText) => {
    const updatedText = innerText.replace(/·/g, ".")
    return `\\text{${updatedText}}`
  })
  const latexExpressions: string[] = []
  content = content.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\))/g, (match) => {
    latexExpressions.push(match)
    return `<<LATEX_${latexExpressions.length - 1}>>`
  })

  // Step 3: Escape dollar signs that are likely currency indicators
  content = content.replace(/\$(?=\d)/g, "\\$")

  // Step 4: Restore LaTeX expressions
  content = content.replace(/<<LATEX_(\d+)>>/g, (_, index) => latexExpressions[parseInt(index)])

  // Step 6: Apply additional escaping functions
  content = escapeBrackets(content)
  content = escapeMhchem(content)

  return content
}

export function escapeBrackets(text: string): string {
  const pattern = /(```[\S\s]*?```|`.*?`)|\\\[([\S\s]*?[^\\])\\]|\\\((.*?)\\\)/g
  return text.replace(
    pattern,
    (
      match: string,
      codeBlock: string | undefined,
      squareBracket: string | undefined,
      roundBracket: string | undefined,
    ): string => {
      if (codeBlock != null) {
        return codeBlock
      } else if (squareBracket != null) {
        return `$$${squareBracket}$$`
      } else if (roundBracket != null) {
        return `$${roundBracket}$`
      }
      return match
    },
  )
}

export function escapeMhchem(text: string) {
  return text.replace(/\$\ce\{/g, "$\\\\ce{").replace(/\$\pu\{/g, "$\\\\pu{")
}
