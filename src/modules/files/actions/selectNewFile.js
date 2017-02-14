function selectNewFile ({state}) {
  const filesCount = state.get('app.currentBin.files').length

  state.set('app.currentBin.selectedFileIndex', filesCount - 1)
}

export default selectNewFile
