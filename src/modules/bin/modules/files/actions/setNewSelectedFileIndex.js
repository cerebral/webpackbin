function setNewSelectedFileIndex ({state}) {
  const selectedFileIndex = state.get('bin.files.selectedFileIndex')

  state.set('bin.files.selectedFileIndex', selectedFileIndex - 1)
}

export default setNewSelectedFileIndex
