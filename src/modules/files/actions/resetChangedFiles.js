function resetChangedFiles({ state }) {
  state.set('app.currentBin.changedFiles', {});
}

export default resetChangedFiles;
