module.exports = function (CodeMirror, sass) {
  function validator (text, options) {
    const errors = sass.lintText({
      text: text,
      name: 'file.scss',
      format: 'scss'
    }, {}).messages

    return errors.map(function (error) {
      return {
        message: error.message,
        severity: error.level,
        from: CodeMirror.Pos(error.line - 1),
        to: CodeMirror.Pos(error.line - 1)
      }
    })
  }

  CodeMirror.registerHelper('lint', 'sass', validator)
}
