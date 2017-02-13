function addToMyBins ({state, firebase, path}) {
  const userUid = state.get('app.user.uid')
  const myBin = {
    name: state.get('app.myBinsTitle'),
    binKey: state.get('bin.currentBinKey'),
    datetime: Date.now()
  }

  return firebase.push(`myBins.${userUid}`, myBin)
    .then(({key}) => {
      return path.success({
        key,
        myBin
      })
    })
    .catch(path.error)
}

export default addToMyBins
