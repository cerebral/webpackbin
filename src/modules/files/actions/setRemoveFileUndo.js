function setRemoveFileUndo ({props, state}) {
  state.set('app.undo', {
    method: 'splice',
    path: 'app.currentBin.files',
    args: [props.index, 0, state.get(`app.currentBin.files.${props.index}`)]
  })
}

export default setRemoveFileUndo
