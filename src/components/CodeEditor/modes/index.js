import path from 'path'
import types from './types'
const loadedModes = ['js']

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
  isLoaded (file) {
    return loadedModes.indexOf(this.get(file)) !== -1
  },
  set (file) {
    const mode = this.get(file)

    if (!mode) {
      return
    }

    if (loadedModes.indexOf(mode) === -1) {
      return types[mode]()
    }

    return types[mode]().then(function (linter) {
      loadedModes.push(mode)

      return linter
    })
  }
}
