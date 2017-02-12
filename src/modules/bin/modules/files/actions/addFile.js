function addFile ({state}) {
  const isEntry = state.get('bin.currentBin.newFileIsEntry')
  const newFile = {
    name: state.get('bin.currentBin.newFileName'),
    isEntry,
    content: '',
    lastCursorPosition: {
      line: 0,
      ch: 0
    }
  }

  if (isEntry) {
    const indexContent = state.get('bin.currentBin.files.0.content')

    state.set('bin.currentBin.files.0.content', indexContent.replace('</body>', `
    <script src="${newFile.name}"></script>
  </body>
    `))
  }

  state.push('bin.currentBin.files', newFile)
}

export default addFile
