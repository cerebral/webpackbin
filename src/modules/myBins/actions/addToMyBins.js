function addToMyBins ({state, firebase, path}) {
  const userUid = state.get('app.user.uid')
  const myBin = {
    name: state.get('myBins.newMyBinTitle'),
    binKey: state.get('app.currentBinKey'),
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
