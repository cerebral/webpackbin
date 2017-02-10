import defaultIndexHtml from '../defaultIndexHtml'

function resetCurrentBin ({state}) {
  state.set('bin.currentBin', {
    key: null,
    owner: null,
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
  })
}

export default resetCurrentBin
