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




      if (mode === ) {
        const setLessModeAndLinter = function () {
          loadedModes.push(mode);

          this.codemirror.setOption('lint', false);
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setLessModeAndLinter();
        } else {
          this.props.signals.bin.linterRequested({noLint: true});
          return require.ensure([], () => {
            setLessModeAndLinter();
            this.props.signals.bin.linterLoaded({noLint: true});
          });
        }

      }

      if (mode === 'text/x-sass') {

        const setSassModeAndLinter = function () {
          loadedModes.push(mode);
          require('codemirror/mode/sass/sass.js');
          this.codemirror.setOption('lint', false);
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setSassModeAndLinter();
        } else {
          this.props.signals.bin.linterRequested({noLint: true});
          return require.ensure([], () => {
            setSassModeAndLinter();
            this.props.signals.bin.linterLoaded({noLint: true});
          });
        }

      }

      if (mode === 'htmlmixed') {

        const setHtmlModeAndLinter = function () {
          loadedModes.push(mode);
          require('codemirror/mode/htmlmixed/htmlmixed.js');
          require('codemirror/addon/edit/matchtags.js');
          require('codemirror/addon/edit/closetag.js');
          const htmlhint = require('htmlhint');
          const linter = require('./html-lint.js');
          this.codemirror.setOption('lint', {
            getAnnotations: linter(CodeMirror, htmlhint.HTMLHint),
            onUpdateLinting: this.onUpdateLinting
          });
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setHtmlModeAndLinter();
        } else {
          this.props.signals.bin.linterRequested();
          return require.ensure([], () => {
            setHtmlModeAndLinter();
            this.props.signals.bin.linterLoaded();
          });
        }

      }

      if (mode === 'application/json') {

        const setJsonModeAndLinter = function () {
          loadedModes.push(mode);
          require('codemirror/mode/javascript/javascript.js');
          const jsonLint = require('./linters/json.js');
          const linter = require('./json-lint.js');
          this.codemirror.setOption('lint', {
            getAnnotations: linter(CodeMirror, jsonLint),
            onUpdateLinting: this.onUpdateLinting
          });
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setJsonModeAndLinter();
        } else {
          this.props.signals.bin.linterRequested();
          return require.ensure([], () => {
            setJsonModeAndLinter();
            this.props.signals.bin.linterLoaded();
          });
        }

      }

      if (mode.name === 'jade') {

        const setJadeMode = function () {
          loadedModes.push(mode);
          require('codemirror/mode/jade/jade.js');
          this.codemirror.setOption('lint', false);
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setJadeMode();
        } else {
          this.props.signals.bin.linterRequested({noLint: true});
          return require.ensure([], () => {
            setJadeMode();
            this.props.signals.bin.linterLoaded({noLint: true});
          });
        }

      }

      if (mode.name === 'handlebars') {

        const setHandlebarsMode = function () {
          loadedModes.push(mode);
          require('codemirror/mode/handlebars/handlebars.js');
          this.codemirror.setOption('lint', false);
          this.codemirror.setOption('mode', mode);
          this.setEditorValue(this.codemirror.getValue());
        }.bind(this);

        if (loadedModes.indexOf(mode) >= 0) {
          return setHandlebarsMode();
        } else {
          this.props.signals.bin.linterRequested({noLint: true});
          return require.ensure([], () => {
            setHandlebarsMode();
            this.props.signals.bin.linterLoaded({noLint: true});
          });
        }

      }

      this.codemirror.setOption('lint', false);
      this.codemirror.setOption('mode', mode);

}

export default setModeAndLinter
