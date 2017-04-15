function showFile ({props, state}) {
  const file = state.get(`app.currentBin.files.${props.index}`)

  if (file.show === false) {
    state.set(`app.currentBin.files.${props.index}.show`, Date.now())
  }

  state.set(`app.currentBin.selectedFileIndex`, props.index)
}

export default showFile
