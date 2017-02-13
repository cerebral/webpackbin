import path from 'path'
import types from './types'
const loadedModes = []

export default {
  get (file) {
    if (!file) {
      return 'jsx'
    }

    const ext = path.extname(file.name)

    switch (ext) {
      case '.js':
        return 'jsx'
      case '.css':
        return 'css'
      case '.ts':
        return 'text/typescript'
      case '.tsx':
        return 'text/typescript'
      case '.coffee':
        return 'text/x-coffeescript'
      case '.less':
        return 'text/x-less'
      case '.scss':
        return 'text/x-sass'
      case '.html':
        return 'htmlmixed'
      case '.vue':
        return 'htmlmixed'
      case '.json':
        return 'application/json'
      case '.handlebars':
        return {name: 'handlebars', base: 'text/html'}
      default:
        return false
    }
  },
  preLoadMode (mode) {
    return types[mode]()
  },
  isLoaded (file, lint) {
    const mode = this.get(file)

    return loadedModes.reduce((isLoaded, loadedMode) => {
      if (isLoaded) {
        return isLoaded
      }

      return loadedMode.mode === mode && loadedMode.lint === lint
    }, false)
  },
  set (file, lint) {
    const mode = this.get(file)

    if (!mode) {
      return
    }

    if (loadedModes.indexOf(mode) === -1) {
      return types[mode](lint).then(function (linter) {
        loadedModes.push({
          mode,
          lint
        })

        return linter
      })
    }

    return types[mode]()
  }
}
