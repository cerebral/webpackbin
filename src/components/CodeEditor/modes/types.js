import CodeMirror from 'codemirror'

export default {
  jsx () {
    return Promise.all([
      import('./linters/js'),
      import('eslint-browser'),
      import('codemirror/mode/jsx/jsx.js')
    ])
      .then(function (modules) {
        const loader = modules[0]
        const linter = modules[1]

        return loader(CodeMirror, linter)
      })
  },
  css () {
    return Promise.all([
      import('./linters/css'),
      import('codemirror/mode/css/css.js'),
      import('codemirror/addon/lint/css-lint.js')
    ])
      .then(function (modules) {
        window.CSSLint = modules[0].CSSLint

        return null
      })
  },
  'text/typescript' () {
    return import('codemirror/mode/javascript/javascript.js')
      .then(function () {
        return false
      })
  },
  'text/x-coffeescript' () {
    return Promise.all([
      import('codemirror/mode/coffeescript/coffeescript.js'),
      import('./linters/coffee'),
      import('coffeelint')
      // import('./linters/coffee/linter')
    ])
      .then(function (modules) {
        //window.CoffeeScript = require('./coffee-script');
        const loader = modules[1];
        const linter = modules[2]

        return loader(CodeMirror, linter)
      })
  },
  'text/x-less' () {
    return import('codemirror/mode/css/css.js')
      .then(function () {
        return false
      })
  },
  'text/x-sass' () {
    return import('codemirror/mode/sass/sass.js')
      .then(function () {
        return false
      })
  },
  htmlmixed () {
    return Promise.all([
      import('./linters/html'),
      import('htmlhint'),
      import('codemirror/mode/htmlmixed/htmlmixed.js'),
      import('codemirror/addon/edit/matchtags.js'),
      import('codemirror/addon/edit/closetag.js')
    ])
      .then(function (modules) {
        const loader = modules[0]
        const linter = modules[1].HTMLHint

        return loader(CodeMirror, linter)
      })
  },
  'application/json' () {
    return Promise.all([
      import('./linters/json'),
      import('./linters/json/linter'),
      import('codemirror/mode/javascript/javascript.js')
    ])
      .then(function (modules) {
        const loader = modules[0]
        const linter = modules[1]

        return loader(CodeMirror, linter)
      })
  },
  handlebars () {
    return import('codemirror/mode/handlebars/handlebars.js')
      .then(function () {
        return false
      })
  }
}
