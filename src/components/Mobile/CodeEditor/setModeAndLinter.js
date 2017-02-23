import CodeMirror from 'codemirror'

const loadedModes = ['js']
const modes = {
  jsx () {
    return Promise.all([
      import('codemirror/mode/jsx/jsx.js'),
      import('./linters/js'),
      import('./linters/js/linter')
    ])
      .then(function (modules) {
        const loader = modules[1]
        const linter = modules[2]

        return loader(CodeMirror, linter)
      })
  },
  css () {
    return Promise.all([
      import('./linters/css.js'),
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
  }
}

function setModeAndLinter (mode, onLoad, onLoaded) {
  if (!modes[mode]) {
    return
  }

  if (loadedModes.indexOf(mode) === -1) {
    return modes[mode]()
  } else {
    onLoad()
    return modes[mode](codemirror).then(function () {
      loadedModes.push(mode)
      onLoaded()
    })
  }
}

export default setModeAndLinter
