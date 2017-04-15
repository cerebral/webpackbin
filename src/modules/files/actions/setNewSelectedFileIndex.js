import filesShown from 'computed/filesShown'

function setNewSelectedFileIndex ({state, resolve}) {
  const selectedFileIndex = state.get('app.currentBin.selectedFileIndex')
  const currentlyShownFiles = resolve.value(filesShown)
  const closestIndex = currentlyShownFiles.reduce((currentIndex, file, index) => {
    if (currentIndex !== -1) {
      return currentIndex
    }

    if (
      currentlyShownFiles[index + 1] &&
      currentlyShownFiles[index + 1].index === selectedFileIndex
    ) {
      return file.index
    }

    if (
      file.index === selectedFileIndex &&
      currentlyShownFiles[index + 1]
    ) {
      return currentlyShownFiles[index + 1].index
    }

    return currentIndex
  }, -1)

  state.set('app.currentBin.selectedFileIndex', closestIndex)
}

export default setNewSelectedFileIndex
