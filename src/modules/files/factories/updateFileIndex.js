export default function updateFileIndexFactory(direction) {
  return ({state, props, path}) => {
    const index = state.get('app.currentBin.selectedFileIndex')
    const newIndex = eval(`${index} ${direction} 1`)

    if (state.get('app.currentBin.files')[newIndex]) {
      return path.updated({index: newIndex})
    } else {
      return path.noop()
    }
  }
}
