function addFile ({state}) {
  const isEntry = state.get('bin.files.newFileIsEntry')
  const newFile = {
    name: state.get('bin.files.newFileName'),
    isEntry,
    content: '',
    lastCursorPosition: {
      line: 0,
      ch: 0
    }
  }

  if (isEntry) {
    const indexContent = state.get('bin.files.list.0.content')

    state.set('bin.files.list.0.content', indexContent.replace('</body>', `
    <script src="${newFile.name}"></script>
  </body>
    `))
  }

  state.push('bin.files.list', newFile)
}

export default addFile
