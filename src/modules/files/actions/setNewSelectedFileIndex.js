function setNewSelectedFileIndex ({state}) {
  const selectedFileIndex = state.get('app.currentBin.selectedFileIndex')

  state.set('app.currentBin.selectedFileIndex', selectedFileIndex - 1)
}

export default setNewSelectedFileIndex
