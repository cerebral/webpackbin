import defaultIndexHtml from './defaultIndexHtml'

export function transformCode (code, event) {
  const lines = code.split('\n')

  const replaceText = (
    lines[event.from.line].substr(0, event.from.ch) +
    event.text.join('\n') +
    lines[event.to.line].substr(event.to.ch, lines[event.to.line].length)
  )

  lines.splice(event.from.line, event.to.line - event.from.line + 1, replaceText)

  return lines.join('\n')
}

export function createNewBin (owner) {
  return {
    owner: owner || null,
    lastSavedDatetime: null,
    showConfiguration: false,
    selectedLogPath: [],
    currentLoader: 'babel',
    packageQuery: '',
    showLog: false,
    showFullLog: false,
    changedFiles: {},
    showNewFileInput: false,
    selectedFileIndex: 0,
    newFileName: '',
    newFileIsEntry: false,
    title: '',
    packages: {},
    loaders: {},
    files: [{
      name: 'index.html',
      content: defaultIndexHtml,
      lastCursorPosition: {
        line: 0,
        ch: 0
      }
    }]
  }
}

export function createAnonymousUsername () {
  return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65) + '-' + String(Date.now()).substr(9, 4)
}

export function encodeKey (key) {
  return encodeURIComponent(key).replace(/\./g, '%2E')
}

export function decodeKey (key) {
  return decodeURIComponent(key).replace(/%2E/g, '.')
}
