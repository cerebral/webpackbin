module.exports = function (CodeMirror, coffeelint) {
  function validator (text, options) {
    const errors = coffeelint.lint(text)

    return errors.map(function (error) {
      return {
        message: error.message,
        severity: error.level,
        from: CodeMirror.Pos(error.lineNumber - 1),
        to: CodeMirror.Pos(error.lineNumber - 1)
      }
    })
  }

  CodeMirror.registerHelper('lint', 'coffeescript', validator)
}
