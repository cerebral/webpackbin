import CodeMirror from 'codemirror'

export default {
  jsx (lint) {
    if (lint) {
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
    }

    return Promise.all([
      import('codemirror/mode/jsx/jsx.js')
    ])
      .then(function () {
        return null
      })
  },
  css (lint) {
    if (lint) {
      return Promise.all([
        import('./linters/css'),
        import('codemirror/mode/css/css.js'),
        import('codemirror/addon/lint/css-lint.js')
      ])
        .then(function (modules) {
          window.CSSLint = modules[0].CSSLint

          return null
        })
    }

    return Promise.all([
      import('codemirror/mode/css/css.js')
    ])
      .then(function () {
        return null
      })
  },
  typescript () {
    return import('codemirror/mode/javascript/javascript.js')
      .then(function () {
        return false
      })
  },
  coffeescript (lint) {
    if (lint) {
      return import('./linters/coffee/coffeescript')
        .then((module) => {
          window.CoffeeScript = module

          return Promise.all([
            import('codemirror/mode/coffeescript/coffeescript.js'),
            import('./linters/coffee'),
            import('coffeelint')
          ])
        })
        .then(function (modules) {
          const loader = modules[1];
          const linter = modules[2]

          return loader(CodeMirror, linter)
        })
    }

    return Promise.all([
      import('codemirror/mode/coffeescript/coffeescript.js')
    ])
      .then(function (modules) {
        return null
      })
  },
  less () {
    return import('codemirror/mode/css/css.js')
      .then(function () {
        return false
      })
  },
  sass () {
    return import('codemirror/mode/sass/sass.js')
      .then(function () {
        return false
      })
  },
  html (lint) {
    if (lint) {
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
    }

    return Promise.all([
      import('codemirror/mode/htmlmixed/htmlmixed.js'),
      import('codemirror/addon/edit/matchtags.js'),
      import('codemirror/addon/edit/closetag.js')
    ])
      .then(function () {
        return null
      })
  },
  json (lint) {
    if (lint) {
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
    }

    return Promise.all([
      import('codemirror/mode/javascript/javascript.js')
    ])
      .then(function () {
        return null
      })
  },
  handlebars () {
    return import('codemirror/mode/handlebars/handlebars.js')
      .then(function () {
        return false
      })
  },
  pug () {
    return import('codemirror/mode/pug/pug.js')
      .then(function () {
        return false
      })
  }
}
