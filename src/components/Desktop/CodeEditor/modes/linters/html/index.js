const defaultRules = {
  'tagname-lowercase': true,
  'attr-lowercase': true,
  'attr-value-double-quotes': true,
  'doctype-first': false,
  'tag-pair': true,
  'spec-char-escape': true,
  'id-unique': true,
  'src-not-empty': true,
  'attr-no-duplication': true
}

module.exports = function (CodeMirror, HTMLHint) {
  return function (text, options) {
    const messages = HTMLHint.verify(text, options && options.rules || defaultRules)

    return messages.map(function (message) {
      const startLine = message.line - 1
      const endLine = message.line - 1
      const startCol = message.col - 1
      const endCol = message.col

      return {
        from: CodeMirror.Pos(startLine, startCol),
        to: CodeMirror.Pos(endLine, endCol),
        message: message.message,
        severity: message.type
      }
    })
  }
}
