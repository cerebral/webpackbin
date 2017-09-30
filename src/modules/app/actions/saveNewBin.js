function saveNewBin({ state, firebase, path }) {
  const currentBin = state.get('app.currentBin');

  return firebase
    .push('bins', currentBin)
    .then(function({ key }) {
      return path.success({
        binKey: key,
      });
    })
    .catch(path.error);
}

export default saveNewBin;
