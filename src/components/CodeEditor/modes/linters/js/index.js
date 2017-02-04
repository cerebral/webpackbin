import config from './config.json'

module.exports = function (CodeMirror, eslint) {
  function getPos (error, from) {
    let line = error.line - 1
    let ch = from ? error.column : error.column + 1

    if (error.node && error.node.loc) {
      line = from ? error.node.loc.start.line - 1 : error.node.loc.end.line - 1
      ch = from ? error.node.loc.start.column : error.node.loc.end.column
    }

    return CodeMirror.Pos(line, ch)
  }

  function getSeverity (error) {
    switch (error.severity) {
      case 1:
        return 'warning'
      case 2:
        return 'error'
      default:
        return 'error'
    }
  }

  function validator (text, options) {
    const errors = eslint.verify(text, config)

    return errors.map(function (error) {
      return {
        message: error.message,
        severity: getSeverity(error),
        from: getPos(error, true),
        to: getPos(error, false)
      }
    })
  }

  CodeMirror.registerHelper('lint', 'javascript', validator)
}
