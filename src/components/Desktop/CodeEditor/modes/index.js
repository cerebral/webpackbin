import path from 'path';
import types from './types';
const loadedModes = [];

const JSX = { type: 'jsx', mode: 'jsx' };
const CSS = { type: 'css', mode: 'css' };
const TYPESCRIPT = { type: 'typescript', mode: 'text/typescript' };
const COFFEE = { type: 'coffeescript', mode: 'text/x-coffeescript' };
const LESS = { type: 'less', mode: 'text/x-less' };
const SASS = { type: 'sass', mode: 'text/x-sass' };
const HTML = { type: 'html', mode: 'htmlmixed' };
const _JSON = { type: 'json', mode: 'application/json' };
const HANDLEBARS = {
  type: 'handlebars',
  mode: { name: 'handlebars', base: 'text/html' },
};
const PUG = { type: 'pug', mode: { name: 'pug', alignCDATA: true } };

export default {
  get(file) {
    if (!file) {
      return JSX;
    }

    const ext = path.extname(file.name);

    switch (ext) {
      case '.js':
      case '.jsx':
        return JSX;
      case '.css':
        return CSS;
      case '.ts':
        return TYPESCRIPT;
      case '.tsx':
        return TYPESCRIPT;
      case '.coffee':
        return COFFEE;
      case '.less':
        return LESS;
      case '.scss':
        return SASS;
      case '.html':
        return HTML;
      case '.vue':
        return HTML;
      case '.json':
        return _JSON;
      case '.handlebars':
        return HANDLEBARS;
      case '.pug':
        return PUG;
      default:
        return false;
    }
  },
  preLoadMode(fileName, lint) {
    const mode = this.get({ name: fileName });

    return types[mode.type](lint).then(function(linter) {
      loadedModes.push({
        mode: mode.mode,
        lint,
      });

      return linter;
    });
  },
  isLoaded(file, lint) {
    const mode = this.get(file);

    return loadedModes.reduce((isLoaded, loadedMode) => {
      if (isLoaded) {
        return isLoaded;
      }

      return loadedMode.mode === mode.mode && loadedMode.lint === lint;
    }, false);
  },
  set(file, lint) {
    const mode = this.get(file);

    if (!mode) {
      return;
    }

    if (this.isLoaded(mode)) {
      return types[mode.type]();
    }

    return types[mode.type](lint).then(function(linter) {
      loadedModes.push({
        mode: mode.mode,
        lint,
      });

      return linter;
    });
  },
};
