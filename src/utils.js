export function transformCode (code, event) {
  const lines = code.split('\n')

  const replaceText = (
    lines[event.from.line].substr(0, event.from.ch) +
    event.text.join('\n') +
    lines[event.to.line].substr(event.to.ch, lines[event.to.line].length)
  )

  lines.splice(event.from.line, event.to.line - event.from.line + 1, replaceText)

  return lines.join('\n')
}
